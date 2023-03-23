import { Router, Request,Response } from 'express'
import User ,{userInput,userOutput}from "../db/models/users"
import primaryProfileType from "../configData/primaryProfileType.json"
import Jwt from "jsonwebtoken"

const authRouter = Router()

//create a user or signup
authRouter.post('/signup',async (req:Request,res:Response) => {
    try{
    const reqData = req.body
    //adding validation
    if (!reqData.user_name || reqData.user_name.length === 0 ){
        return res.status(400).send({
            message: "Please enter a user name"
        })  
    }
    if (!reqData.password || reqData.password.length === 0 ){
        return res.status(400).send({
            message: "Please enter a password"
        })  
    }
    if (!reqData.primary_profile ){
        return res.status(400).send({
            message: "Please select an primary profile"
        })  
    }
    if (!reqData.email || reqData.email.length === 0 ){
        return res.status(400).send({
            message: "Please enter a email"
        })  
    }
    if (!reqData.phone ){
        return res.status(400).send({
            message: "Please select an Phone number"
        })  
    }
    // validate primary profile
    const primaryProfileArray: number[] = [...new Set(primaryProfileType.map((item: any) => item.id))]
    if(primaryProfileArray.includes(reqData.primary_profile) === false){
        return res.status(404).send({
            message: "Please select an validate primary profile"
        })  
    }

    // check user already exist or not
    const checkUser = await User.count({where : {email: reqData.email}})
    if (checkUser > 0){
        return res.status(400).send({
            message: "User already exist"
        })
    }
    const createUser = {
        user_name : reqData.user_name,
        password : reqData.password,
        primary_profile: reqData.primary_profile,
        email: reqData.email,
        phone: reqData.phone

    }
    //creating new user
    const newUser:userInput = await User.create(createUser)
    return res.status(201).send({message : "successfully created a user"})
    }   
    catch(error: any){
        return res.status(500).send({message :`error in creating a new user : ${error}`})
    }
})

// login
authRouter.post('/login',async (req:Request,res:Response) => {
    try{
    const reqData = req.body
    //adding validation
    if (!reqData.email || reqData.email.length === 0 ){
        return res.status(400).send({
            message: "Please enter a user name"
        })  
    }
    if (!reqData.password || reqData.password.length === 0 ){
        return res.status(400).send({
            message: "Please enter a password"
        })  
    }
    
    // check user already exist or not
    const checkUser = await User.findOne({where : {email: reqData.email}})
    if (!checkUser){
        return res.status(400).send({
            message: "User does not exist"
        })
    }
    if (!(checkUser.password === reqData.password)){
        return res.status(400).send({
            message: "Password is incorrect"
        })
    }
    const token = await Jwt.sign({id: checkUser.id},process.env.TOKEN_SECRET || "",{expiresIn: "1h"})
    return res.status(201).send({token: token})

    }   
    catch(error: any){
        return res.status(500).send({message :`error in creating a new user : ${error}`})
    }
})

export default authRouter