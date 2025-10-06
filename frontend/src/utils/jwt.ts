import jwt from 'jsonwebtoken';

export const generateToken = (user: { id: string; username: string }) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'defaultsecret'
    )
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    } 
    catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }       
}