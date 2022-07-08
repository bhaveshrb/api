export const HTTP_STATUS_CODES = {
    OK:200,
    CREATED:201,
    BAD_REQUEST:400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND:404,
    METHOD_NOT_ALLOWS:405,
    INTERNAL_SERVER_ERROR:500,
    RETRY:10001
}

export const ERROR_MESSAGE ={
    INTERNAL_SERVER_ERROR:'Something went wrong! Please try again later',
    UNAUTHORIZED:'Invalid user credentials',
    USEREXISTS:'User already exists'

}