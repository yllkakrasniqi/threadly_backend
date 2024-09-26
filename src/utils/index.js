import jwt from 'jsonwebtoken'
import { config } from '../config.js'

export const verifyJwt = async (jwtToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(jwtToken, config.jwt.secret_key, (err, decoded) => {
            if(err){
                reject(err);
            }
            resolve(decoded)
        })
    })
}