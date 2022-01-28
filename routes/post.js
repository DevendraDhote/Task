const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId, ref : 'user'
    },
    status : String,
    // cretedAt : moment().format('MMMM Do YYYY, h:mm:ss a')
});

module.exports = mongoose.model('post', PostSchema);