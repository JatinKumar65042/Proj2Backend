import dotenv from "dotenv"

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path : "./env"
})


connectDB()
.then( () => {
    app.on("errror", (error) =>{
        console.log("ERRR:", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️   Server is running on http://localhost:${process.env.PORT}/api/v1/`) ;
    })

} )
.catch( (err) => {
    console.log("MONGODB Connection failed!!! ", err)
} )
/*
import express from "express"
const app = express() ;

;( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) =>{
            console.log("ERRR:", error);
            throw error
        })
        app.listen(process.env.PORT , () =>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("ERROR : ", error)
        throw err
    }
} )()*/