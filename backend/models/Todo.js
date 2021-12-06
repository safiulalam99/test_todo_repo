const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    text:{
        type: String,
        required:true
    } ,
    complete:
    {
        type:Boolean,
        default: false
    },
    timestamp:{
        type:String,
        defauly: Date.now()
    }
})
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;