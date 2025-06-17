export interface Response{
    data : object
    status : string
    message : string
    statusCode : string
}

export interface ErrorResponse{
    message : string,
    status : number,
    timestamp : string
}