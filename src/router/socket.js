const { SEND_MESSAGE, JOIN, OUT_ROOM, TYPING, RECEIVED, ISREAD, USER_ONLINE } = require('../common/event');
const socketController = require('../controller/socket')

const socketRoute = (io, socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on('disconnect', () => console.log(`Disconnected: ${socket.id}`));
    socket.on(JOIN, data => socketController.join(io, socket, data));
    socket.on(OUT_ROOM, data => socketController.outRoom(io, socket, data));
    socket.on(SEND_MESSAGE, data => socketController.sendMessage(io, socket, data));
    socket.on(TYPING, data => socketController.typing(io, socket, data));
    socket.on(RECEIVED, data => socketController.receivedMessage(io, socket, data));
    socket.on(ISREAD, data => socketController.isRead(io, socket, data));
    socket.on(USER_ONLINE, () => socket.emit(USER_ONLINE, Array.from(io.sockets.adapter.rooms.keys())))
}
module.exports = socketRoute