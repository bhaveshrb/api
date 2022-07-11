import { HTTP_STATUS_CODES } from "../../config/constants.js";
import {AuthService} from "../services/auth.service.js";

const authMiddleware = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(token)
    const tokenPattern = AuthService.getTokenPattern();
    if (!token) {
        return res.status(HTTP_STATUS_CODES.FORBIDDEN).json( { message: "A token is required for authentication" } );
    }
    if(!token.startsWith(`${tokenPattern}`)){
        return res.status(HTTP_STATUS_CODES.UNAUTHORISED).json({ message: 'Format for Authorization: Bearer [token]' } ); 
    }
    try {
        token = AuthService.getTokenFromHeader(token);
        const decoded = AuthService.verifyToken(token);
        req.user = decoded;
    } catch (err) {
        return res.status(HTTP_STATUS_CODES.UNAUTHORISED).json( { message: "Invalid Token" } );
    }
    return next();
};

export default authMiddleware
