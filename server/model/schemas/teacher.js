import mongoose from 'mongoose';
import validator from 'validator';

const TeacherSchema = new mongoose.Schema({
    fullName: {
        fName: {
            type: String,
            trim: true,
            required: true,
            minlength: 1
        },
        mName: {
            type: String,
            trim: true,
            required: true,
            minlength: 1
        },
        lName: {
            type: String,
            trim: true,
            required: true,
            minlength: 1
        }
    },
    mob: {
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        maxlength: 10,
        validate: {
            validator: validator.isMobilePhone,
            message: `{value} Please enter 10 Digit mobile no.`
        }
    },
    address: {
        houseno: {
            type: Number,
            required: true,
            minlength: 1
        },
        street: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        state: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        country: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        zip: {
            type: Number,
            required: true,
            minlength: 1
        }
    },
    faculty: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    skills: [{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }],

    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

// export default {
//     Teacher
// };


var Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
