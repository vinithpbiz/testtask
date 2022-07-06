const {userModel, roleModel} = require("../../../../database/models/models.model");

const addRole = async (data)=>{
    try {
        let rolemodel = new roleModel(data)
        let issave = await rolemodel.save()
        if(issave) return issave
    } catch (error) {
        console.log(error)
    }
}

const readOneRole = async (data)=>{
    try {
        let issave = await roleModel.findOne(data)
        if(issave) return issave
    } catch (error) {
        console.log(error)
    }
}

const addUser = async (data)=>{
    try {
        let usermodel = new userModel(data)
        let issave = await usermodel.save()
        if(issave) return issave
    } catch (error) {
        console.log(error)
    }
}


const readOneUser = async (data)=>{
    try {
        let issave = await userModel.findOne(data)
        if(issave) return issave
    } catch (error) {
        console.log(error)
    }
}

const searchuser = async (data)=>{
    try {
        let isfind = await userModel.find(data)
        if(isfind) return isfind
    } catch (error) {
        console.log(error)
    }
}

const searchrole = async (data)=>{
    try {
        let isfind = await roleModel.find(data)
        if(isfind) return isfind
    } catch (error) {
        console.log(error)
    }
}

const countuser = async (data)=>{
    try {
        let isfind = await userModel.count(data)
        if(isfind) return isfind
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addRole,
    readOneRole,
    addUser,
    readOneUser,
    searchuser,
    searchrole,
    countuser
}