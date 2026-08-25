import mongoose, {model, models, Schema} from 'mongoose'

const todoschema = new Schema ({
  title : {
    required : [true, "Title is required"],
    type  : String,
    trim : true,
    minlength : [3, "Minimum length for title is 3 char"]
  },
  desc : {
    required : [true, "desc is required"],
    type  : String,
    trim : true,
    minlength : [3, "Minimum length for desc is 3 char"]
  },
  completed : {
    type : Boolean,
    default : false,
  },
},
{
  timestamps  : true,
}
);

const Todo = models.Todo || model("Todo",todoschema)

export default Todo