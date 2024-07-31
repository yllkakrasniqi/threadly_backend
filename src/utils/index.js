import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/auth.js'

//process.env.JWT_SECRET

export const verifyJwt = async (jwtToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(jwtToken, JWT_SECRET, (err, decoded) => {
            if(err){
                reject(err);
            }
            resolve(decoded)
        })
    })
}