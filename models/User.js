const mongoose = require('mongoose');
const { Schema } = mongoose
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {

            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        date: {
            type: Date,
            default: Date.now
        }
    }, { freezeTableName: true }
)
const user = mongoose.model('User', UserSchema);
// user.createIndexes()//ab same email to bar nh dal skti
module.exports = user
