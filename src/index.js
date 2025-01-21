import dotenv from "dotenv"

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

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
        console.log(`Server is running on https://localhost:${process.env.PORT}`) ;
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