import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: new URL('../.env', import.meta.url) });

// Function to hash a password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    return await bcrypt.hash(password, salt);
}

// Function to compare a password with a hash
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}