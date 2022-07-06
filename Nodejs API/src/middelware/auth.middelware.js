const jwt = require('jsonwebtoken')
const env = require("../../configs/env.config") 
const { authFailureResponse } = require("../helpers/api-response/response.function") 
const { searchrole } = require("../api/user/v1/user.service")

const SECTER_ACCESS_TOKEN = env.jwt.SECTER_ACCESS_TOKEN

const virifyaccesstoken = async(req, res, next)=>{
    let token
    try {
        if(!req.headers['authorization']) return authFailureResponse(res, "Auth token require")
        const authheader = req.headers['authorization']
        const bearertoken = authheader.split(' ')
        token = bearertoken[1]
        if(!token) return authFailureResponse(res, "Auth token require")
        
        let isverified = jwt.verify(token, SECTER_ACCESS_TOKEN)
        req.body.check = isverified

        let data = {
            role_id : isverified.roleid
        }

        let isaccess = await searchrole(data)
        if(isaccess.length<1 || isaccess[0].name != "superAdmin" && isaccess[0].name != "admin") return authFailureResponse(res, "Unauthorized")
        
        res.set('Access-Control-Expose-Headers', 'x-token');
        res.set('x-token', token);
        next()
    } catch (error) {
        console.log(error)
        return authFailureResponse(res, "please try to login again")
    }
}

module.exports = {
    virifyaccesstoken
}
