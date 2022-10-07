const express = require('express')
const app = express.Router()
const mongoose = require('mongoose')

require('../../model/register')

const Register = mongoose.model("Register")


app.post("/login", async (req, res) => {

    //parameter    name,email,phone,pic,password

    let phone = req.body.phone
    let password = req.body.password
    
    let otp = Math.random().toString().substr(2, 6)

    if( phone === '' || phone === undefined){
        res.json({
            "status" : false,
            "message" : 'Insert Phone no'
        })
        return
    }
    
    if( password === '' || password === undefined){
        res.json({
            "status" : false,
            "message" : 'Insert Phone no'
        })
        return
    }

    Register.findOne({phone:phone})
    .then(async (respo)=>{
        if(respo){
            await Login.updateOne({phone:phone},{otp:otp})
            .then((resss)=>{
                res.json({
                    "status" : true,
                    "message" : 'Otp',
                    "otp" : otp
                })
            })
            .catch((err)=>{
                res.json({
                    "status" : false,
                    "message" : "something went wrong"
                })
            })
            return
        }
    })
})

app.post("/register", async (req, res) => {

    //parameter    name,email,phone,pic,password

    let phone = req.body.phone
    let name = req.body.name
    let email = req.body.email
    let pic = req.body.pic
    let password = req.body.password
    
    let otp = Math.random().toString().substr(2, 6)

    if( phone === '' || phone === undefined){
        res.json({
            "status" : false,
            "message" : 'Insert Phone no'
        })
        return
    }
    
    
    if( name === '' || name === undefined){
        res.json({
            "status" : false,
            "message" : 'Insert Phone no'
        })
        return
    }
    
    
    if( email === '' || email === undefined){
        res.json({
            "status" : false,
            "message" : 'Insert Phone no'
        })
        return
    }
    
    
    if( password === '' || password === undefined){
        res.json({
            "status" : false,
            "message" : 'Insert Phone no'
        })
        return
    }
        const one =  new Register({
            phone : phone,
            otp : otp,
            email : email,
            pic : pic ,
            password : password,
            name : name
        })
        await one.save()
        .then((re)=>{
            res.json({
                "status" : true,
                "message" : "Success",
                "otp" : otp
            })
        })
        .catch((err)=>{
            res.json({
                "status" : false,
                "message" : "something went wrong"
            })
        })
})

app.post("/otp", async (req, res) => {

    //parameter    name,email,phone,pic,password

    let phone = req.body.phone
    
    let otp = req.body.otp

    if( phone === '' || phone === undefined){
        res.json({
            "status" : false,
            "message" : 'Insert Phone no'
        })
        return
    }

if( otp === '' || otp=== undefined){
        res.json({
            "status" : false,
            "message" : 'Insert otp'
        })
        return
    }
    
    Register.findOne({phone:phone})
    .then(async (respo)=>{
        if(respo.otp === otp){
            await Register.updateOne({phone:phone},{isVerified:true})
            .then((r)=>{
                res.json({
                    "status" : true,
                    "message" : 'Otp Verified Success',
                    'id' : respo._id
                })
            })
        }
        else{
            res.json({
                "status" : false,
                "message" : 'Otp Verified Failed'
            })
        }
    })
})


module.exports = app
