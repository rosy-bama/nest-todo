import { Constants } from "src/enums/constants.enum";
import * as bcrypt from 'bcrypt';


export const hashPassword = async (password: string): Promise<string> => {
    const saltOrRounds = Constants.BCRYPT_SALT_ROUNDS;
    return await bcrypt.hash(password, saltOrRounds);
}

export const checkPassword = async (password: string, hashPassword: string): Promise<boolean> => {
    return await true;
}