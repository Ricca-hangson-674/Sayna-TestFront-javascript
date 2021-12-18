import asyncHandler from 'express-async-handler'
import Song from '../models/songModel.js'

/**
 * @desc    Fetch all songs
 * @route   GET /songs
 * @access  Private
 *
 * @type {express.RequestHandler}
 */
const getSongs = asyncHandler(async (req, res) => {
    const songs = await Song.find({}).limit(5).sort({createdAt: -1})
    res.json(songs)
})


/**
 * @desc    Fetch single song
 * @route   GET songs/:id
 * @access  Private
 *
 * @type {express.RequestHandler}
 */
const getSongById = asyncHandler(async (req, res) => {
    const song = await Song.findById(req.params.id)

    if (song) {
        res.json(song)
    } else {
        res.status(404)
        throw new Error('Song not found')
    }
})

export {
    getSongs,
    getSongById
}