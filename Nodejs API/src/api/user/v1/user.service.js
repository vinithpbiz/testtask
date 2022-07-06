const {userModel, roleModel} = require("../../../../database/models/models.model");
const mongoose = require('mongoose')

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

const readallRole = async (data)=>{
    try {
        let issave = await roleModel.find()
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
        let agg =  [
            {
                "$lookup": {
                    "from": "roles",
                    "localField": "role_id",
                    "foreignField": "role_id",
                    "as": "resultingTagsArray"
                }
            },
            {"$group":{
                _id: "$resultingTagsArray.name",
                total: {$sum: 1}
            }},
            {"$project":{
                _id : 0,
                role : { $first: "$_id" },
                total: 1
            }}
          ];
        let isfind = await userModel.aggregate(agg)
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
    countuser,
    readallRole
}