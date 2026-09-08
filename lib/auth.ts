import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET! 
export async function generatetoken(userid  : string) {
    const token = await jwt.sign({ userId: userid }, JWT_SECRET, { expiresIn : "1d"})
    return token;
}

export async function verifytoken(token : string) {
    try {
        return jwt.verify(token, JWT_SECRET)
    }
    catch {
        return null
    }
}