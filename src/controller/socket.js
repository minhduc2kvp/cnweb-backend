const { RECEIVE_MESSAGE, NEW_CONVERSATION, TYPING, ISREAD, RECEIVED } = require('../common/socket');
const Conversation = require('../model/conversation')
const User = require('../model/user')


const join = async (io, socket, { conversationId, userId, members }) => {
    console.log("join", userId, conversationId)
    if (conversationId) {
        // join conversation as set read status for conversation
        var conversationInfo = await Conversation.findOneAndUpdate({
            _id: conversationId,
            "last_message.sender": {
                $ne: userId
            },
            "last_message.is_read": {
                $ne: 2
            }
        }, {
            $set: {
                "last_message.is_read": 2,
                "messages.$[].status": "read"
            }
        })
        socket.join(conversationId);
        members.map(element => {
            io.to(element).emit(ISREAD, {
                userId,
                conversationId
            })
        });

    } else {
        // join by user id as set received all of conversation what have sender of last message not user id 
        userId && socket.join(userId);
        await Conversation.updateMany({
            members: {
                $in: [userId]
            },
            "last_message.sender": {
                $ne: userId
            },
            "last_message.is_read": 0
        }, {
            "$set": {
                "last_message.is_read": 1,
                "messages.$[].status": "received"
            },
        })
    }
}

const isRead = async (io, socket, { conversationId, userId, receiverId }) => {
    await Conversation.findOneAndUpdate({
        _id: conversationId,
        "last_message.sender": {
            $ne: userId
        },
        "last_message.is_read": {
            $ne: 2
        }
    }, {
        "$set": {
            "last_message.is_read": 2,
            "messages.$[].status": "read"
        },
    })
    io.to(receiverId).to(userId).emit(ISREAD, {
        senderId: userId,
        userId,
        conversationId
    })
}



const outRoom = (io, socket, data) => {
    socket.leave(data);
}

const receivedMessage = async (io, socket, { conversationId, userId, receiverId }) => {
    const result = await Conversation.findOneAndUpdate({
        _id: conversationId,
        "last_message.sender": {
            $ne: userId
        },
        "last_message.is_read": 0
    }, {
        "$set": {
            "last_message.is_read": 1,
            "messages.$[].status": "received"
        },
    })
    io.to(receiverId).emit(RECEIVED, {
        userId,
        conversationId
    })
}




const typing = (io, socket, data) => {
    socket.to(data.conversationId).emit(TYPING, data)
}

const sendMessage = async (io, socket, { message = {}, conversationId = "", receiver, sender }) => {
    try {
        let created = Date.now()
        if (conversationId) {
            const newConversation = await Conversation.findByIdAndUpdate(conversationId, {
                $push: {
                    messages: {
                        ...message,
                        status: "sent",
                        sender,
                        created
                    }
                },
                $set: {
                    last_message: {
                        ...message,
                        is_read: 0,
                        sender,
                        created
                    }
                }
            }, { new: true }).populate({
                path: "members",
                select: "avatar username email"
            })

            socket.to(conversationId).emit(RECEIVE_MESSAGE, {
                ...message,
                sender,
                conversationId,
                created
            })
            io.to(receiver).to(sender).emit(NEW_CONVERSATION, newConversation)

        } else {

            const newConversation = new Conversation({
                members: [
                    sender,
                    receiver
                ],
                last_message: {
                    ...message,
                    is_read: 0,
                    sender,
                    created
                },
                messages: [
                    {
                        ...message,
                        sender,
                        created
                    }
                ]
            })
            if (sender === receiver) {
                await Promise.all([User.findByIdAndUpdate(sender, {
                    myConversation: newConversation._id
                }), newConversation.save()])
            }
            else {
                await Promise.all([User.updateMany({
                    $or: [
                        { _id: receiver },
                        { _id: sender }
                    ]
                }, {
                    $push: {
                        conversations: newConversation._id
                    }
                }), newConversation.save()])
            }

            const resNewConversation = await Conversation.findById(newConversation._id).populate({
                path: "members",
                select: "avatar username email"
            })

            io.to(receiver).to(sender).emit(NEW_CONVERSATION, resNewConversation)
        }

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    join,
    sendMessage,
    outRoom,
    typing,
    receivedMessage,
    isRead
}