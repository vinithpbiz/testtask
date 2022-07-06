const jwt = require('jsonwebtoken')
const env = require("../../configs/env.config") 

const signaccesstoken = (data)=>{
    return new Promise((resolve) =>{
        let result = {}
        result.jwtaccesstoken = jwt.sign({"userid" : data.userid, "roleid": data.roleid},env.jwt.SECTER_ACCESS_TOKEN,{expiresIn: '20m'})
        resolve(result)
    })
}

module.exports = {
    signaccesstoken
}
