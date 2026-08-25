import {Schema, models, model} from 'mongoose'

const userschema  = new Schema(
    {
        username : {
            type : String,
            required : [true, "Username is req"],
            trim : true
        },
        password : {
            type : String,
            required : [true, "password is required"],
            minlength  : [6, "minimum length should be 3"]
        }
    },{
        timestamps : true
    }
)

const User = models.User || model("User",userschema)

export default User