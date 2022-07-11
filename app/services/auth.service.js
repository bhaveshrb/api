import  jwt  from "jsonwebtoken";
const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const tokenPattern = 'Bearer'
export class AuthService{
    constructor(){
        this.tokenPattern = 'Bearer'
    }
static issueToken = (payload)=>{
    return jwt.sign(payload,secret,{expiresIn:'365d'});
}
static verifyToken = (token,cb) =>{
    let decode = jwt.verify(token,secret,{},cb);
    //decode = AuthService.setRole(decode);
    return decode;
}
static getTokenFromHeader = (token)=>{
    return token.slice(AuthService.getTokenPattern().length)
}
static getTokenPattern=()=>{
    return tokenPattern;
}

}