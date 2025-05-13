const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title : String,
    description : String,
    user : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
})



module.exports = mongoose.model('Notes' , NotesSchema);