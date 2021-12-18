import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors   from 'colors'
import faker from 'faker'
import bcrypt from 'bcryptjs'

import connectDB from './src/config/db.js'

import User from './src/models/userModel.js'
import Song from './src/models/songModel.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Song.deleteMany()

        /** Users */
        let users = []
        for (let i = 0; i < 5; i++) {

            const cards = [
                {
                    cardNumber : faker.finance.creditCardNumber(),
                    // month      : faker.date.month(),
                    // year       : faker.date.future(),
                    month      : 10,
                    year       : 2023,
                    cvc        : faker.finance.creditCardCVV(),
                    default    : false
                }
            ]

            users = [...users, {
                firstname       : faker.name.firstName(),
                lastname        : faker.name.lastName(),
                sexe			: faker.name.gender(),
                date_naissance  : faker.date.past(),
                email           : faker.internet.email(),
        		password 		: bcrypt.hashSync('password', 10),
                cards
            }]
        }
        console.log('Users'.green)
        const createUsers = await User.insertMany(users)

        /** Songs */
        let songs = []
        for (let i = 0; i < 10; i++) {

            songs = [...songs, {
                name       : faker.name.title(),
                url        : faker.internet.url(),
                cover      : faker.name.firstName(),
                time       : `${faker.datatype.number(5)}:${faker.datatype.number(50)}`,
                type       : faker.music.genre()
            }]
        }
        console.log('Songs'.green)
        const createSongs = await Song.insertMany(songs)

    	console.log('Data Imported!'.green.inverse)
        process.exit()
    }catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Song.deleteMany()

        console.log('Data Imported!'.green.inverse)
        process.exit()
    }catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}