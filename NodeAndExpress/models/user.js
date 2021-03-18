const mongoes= require('mongoose')

const UserSchema= mongoes.Schema({
name:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true
},
username:{
    type: String,
    required: true
},
password:{
    type: String,
    required: true
}
})

const user = mongoes.model('User', UserSchema)

module.exports = user 