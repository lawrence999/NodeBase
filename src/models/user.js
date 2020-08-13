import mongoose from 'mongoose';
import _ from 'lodash';

var UserSchema = mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    Salt: {
        type: String,
        required: true,
        minlength: 6
    }
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    return _.pick(userObject, ['_id', 'Email', 'UserName']);
}
const User = mongoose.model("User", UserSchema);
module.exports = { User };
