import { model, models, Schema } from "mongoose";

const userschema = new Schema({
    username  : {
        type : String,
        requied : true,
        trim : true,
        unique : true,
        minlength : [3, "Atleast 3 characters"]
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    phone : {
        type : Number,
        minlength : [10, "Atleast 10 digits"],
        trim : true,
    },
    password : {
        type : String,
        minlength : 3,
        required : true
    }
},
{
    timestamps : true
})

const User = models.User || model("User", userschema)

export default User