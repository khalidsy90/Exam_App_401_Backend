// getting-started.js

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGOLINK}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const ChocolateShema=mongoose.Schema({
    email:String,
    title:String,
    imageUrl:String
})

const ChocolateModel=mongoose.model('ChocolateModel',ChocolateShema)

module.exports=ChocolateModel