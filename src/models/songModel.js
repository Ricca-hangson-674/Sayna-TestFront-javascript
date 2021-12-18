import mongoose from 'mongoose'

const songSchema = mongoose.Schema({
    name   : { type: String, required: true },
    url    : { type: String, required: true },
    cover  : { type: String, required: true },
    time   : { type: String, required: true },
    type   : { type: String, required: true },
}, {
    timestamps: true
})

songSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        // delete ret._id;
        delete ret._v;
    }
})


const Song = mongoose.model('Song', songSchema)

export default Song