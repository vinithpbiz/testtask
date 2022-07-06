const services = require('./user.service')
const response = require('../../../helpers/api-response/response.function')
const {validateRoleSchema, validateUserSchema, validateLoginSchema} = require('./user.validation')
const bcrypt = require('bcrypt')
const {signaccesstoken} = require('../../../helpers/jwt.helper')
const mongoose = require('mongoose')

const addrole = async (req,res)=>{ 
  try {
      let isvalidated = await validateRoleSchema(req.body)
      if(isvalidated.error) return response.badRequestResponse(res,isvalidated.error)

      let data = {name : req.body.name}
      let isrole = await services.readOneRole(data)
      if(isrole) return response.badRequestResponse(res, "role already exists")

      data = {
        name: req.body.name
      }

      let isreg = await services.addRole(data)
      if(!isreg) return response.internalFailureResponse(res, "unable to register")
  
      return response.successResponse(res, isreg._id)
  } catch (error) {
      console.log(error)
  }  
}

const register = async (req,res)=>{ 
  try {
      let isvalidated = await validateUserSchema(req.body)
      if(isvalidated.error) return response.badRequestResponse(res,isvalidated.error)

      let data = {role_id : req.body.role_id}
      let isrole = await services.readOneRole(data)
      if(!isrole) return response.badRequestResponse(res, "role already exists")

      data = {email : req.body.email}
      let isuser = await services.readOneUser(data)
      if(isuser) return response.badRequestResponse(res, "user already exists")
      req.body.password = await bcrypt.hash(req.body.password,10)

      data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role_id: req.body.role_id,
        email: req.body.email,
        password: req.body.password,
      }

      let isreg = await services.addUser(data)
      if(!isreg) return response.internalFailureResponse(res, null, "unable to register")
  
      return response.successResponse(res, isreg._id)
  } catch (error) {
      console.log(error)
  }  
}

const login = async (req, res)=>{
  try {
      let isvalidated = await validateLoginSchema(req.body)
      if(isvalidated.error) return response.badRequestResponse(res,isvalidated.error)

      let data = {
        email : req.body.email,
        is_active : true,
      }
      let isread = await services.readOneUser(data)
      if(!isread) return response.notFoundResponse(res, "username, password not found")

      if(await bcrypt.compare(req.body.password,isread.password)){
          const {jwtaccesstoken} = await signaccesstoken({
              userid:isread.user_id,
              roleid:isread.role_id
          })
          res.set('Access-Control-Expose-Headers', 'x-token');
          res.set('x-token', jwtaccesstoken);
          return response.successResponse(res, isread._id)
      }
      return response.notFoundResponse(res, "username, password not found")
  } catch (error) {
      console.log(error)
  }
}

const getuser = async (req, res)=>{
  try {
    let data = {}
    if(req.query.role){
      let qdata = {
        name: req.query.role
      }
      let readrole = await services.readOneRole(qdata)
      if(!readrole) return response.notFoundResponse(res, "role not found")
      data = {
        role_id: readrole.role_id
      }
    }
    let isread = await services.searchuser(data)
    if(!isread) return response.notFoundResponse(res, "no user found")
    let userdata = {
      users: isread
    }
    return response.successResponse(res, userdata)
  } catch (error) {
    console.log(error)
  }
}

const searchuser = async (req, res)=>{
  try {
    let rolearr = []
    let readrole = await services.readallRole()
    if(!readrole) return response.notFoundResponse(res, "role not found")
    readrole.map(item =>{
      rolearr.push(item.role_id)
    })
    data = {
      rolearr
    }
    let isread =await services.countuser(data)
    if(!isread) return response.notFoundResponse(res, "user not found")
    let newobj = {}
    isread.map(item =>{
      newobj[item.role] = item.total 
    })
    return response.successResponse(res, newobj)
  } catch (error) {
    console.log(error)
  }
}











module.exports = {
  addrole,
  register,
  login,
  getuser,
  searchuser
  // usersearch,
  // removeuser,
}