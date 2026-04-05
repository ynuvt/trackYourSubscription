import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        trim: true,
        minLength: [3, 'Username must be at least 3 characters long'],
        maxLength: [30, 'Username must be less than 30 characters long']
    },
    email : {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        trim: true,
        lowercase: true,
        match : [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'Password must be at least 6 characters long'],
        maxLength: [128, 'Password must be less than 128 characters long'],
        trim: true,
    }, Options: {Timestamp:true}
})  

const User = mongoose.model('User', userSchema)

export default User