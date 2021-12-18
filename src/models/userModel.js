import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const cardSchema = mongoose.Schema({
    cartNumber: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    cvc: { type: Number },
    default: { type: Boolean, default: false}
}, {
    timestamps: true
})

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    dateNaissance: {
        type: Date,
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
    token: {
        type: String
    },
    role: {
        type: String,
        enum: ['visiteur', 'abonne', 'autres'],
        default: 'visiteur'
    },
    subscription: {
        type: Boolean,
        default: false
    },
    cards: [cardSchema]
}, {
    timestamps: true
})

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        // delete ret._id;
        delete ret._v;
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.post(['find', 'findById'], function(next) {
    console.log(this.date_naissance);
})

const User = mongoose.model('User', userSchema)

export default User
