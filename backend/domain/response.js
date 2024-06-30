class Response {
    constructor(statusCode, httpStatus, message, data){
        this.timestamp = new Date().toLocaleDateString();
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data;
    }
};

export default Response;