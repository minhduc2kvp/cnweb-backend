const createResponse = (code, message, description) => ({
    code,
    message,
    description
})

const statusResponse={
    OK: createResponse(200,"OK","request success"),
    PARAMS_MISS: createResponse(400,'PARAMS_MISS',"missing field or params"),
    UNKNOWN: createResponse(401,'UNKNOWN',"unknown error"),
    NOT_VALIDATED: createResponse(402,'NOT_VALIDATED',"email or password is wrong"),
    USER_EXISTED: createResponse(403,"USER_EXISTED","user is existed in the system"),
    NOT_FOUND: createResponse(404, "NOT_FOUND", "not found or is blocked"),
    NOT_ACCEPT: createResponse(405, 'NOT_ACCEPT', "is blocked or you block" ),
    SUCCEED: createResponse(406, "SUCCEED", "this request has succeed or is spam"),
    ERROR: createResponse(500, "ERROR", "Internal Server Error"),
}
module.exports= statusResponse