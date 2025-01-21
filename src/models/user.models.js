import mongoose , {Schema, model} from "mongoose";

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

export const User = model("User" , userSchema)