import mongoose , {Schema, model} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required : [true , "username is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type:String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName:{
            trype: String,
            required: [true, "Name is required"],
            trim: true,
            index: true
        },
        avatar:{
            type: String,
            required: true,
        },
        coverImage:{
            type: String,
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken:{
            type: String
        }
    },{
        timestamps: true
    }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = model("User" , userSchema)