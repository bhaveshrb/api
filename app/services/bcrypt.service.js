import bcrypt from 'bcrypt';

export class BcryptService{
    static encrypt = (password) => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    };

    static compare = (pw, hash) => {
       return bcrypt.compareSync(pw, hash)
    };
}
