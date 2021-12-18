import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { validationResult } from 'express-validator'
import {
    generateToken,
    generateRefreshToken
} from '../utils/generateToken.js'
import RefreshToken from '../models/refreshTokenModel.js'

/**
 * @desc    Login
 * @route   POST /login
 * @access  Public
 *
 * @type {express.RequestHandler}
 */
 const login = asyncHandler(async (req, res) => {

	const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      console.log('Login', errors.array())
	  
	  res.status(412)
	  throw new Error("L'email/password est manquant")
    }

	const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {

		const token = generateToken(user._id)

		/** Store Token */
		user.token = token
		await user.save()

        res.json({
			error: false,
			message: "L'utilisateur a été authentifié succès",
            user: {
                firstname     : user?.firstname,
                lastname      : user?.lastname,
                email         : user?.email,
                sexe          : user?.sexe,
                dateNaissance : user?.dateNaissance,
                createdAt     : user?.createdAt,
                updateAt      : user?.updateAt,
            },
            access_token: token,
            refreshToken: await generateRefreshToken(user._id)
        })
    } else {
        res.status(412)
        throw new Error("Votre email/password est erroné")
    }
})

/**
 * @desc    Register
 * @route   POST /register
 * @access  Public
 *
 * @type {express.RequestHandler}
 */
const register = asyncHandler(async (req, res) => {
	const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });

	  // console.log('express-validator')
	  
	  res.status(409)
	  throw new Error("Une ou plusieurs données sont erronées")
    }

	const { 
		firstname, 
		lastname, 
		date_naissance,
		sexe,
		email, 
		password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(409)
        throw new Error("Un compte utilisant cette adresse mail est déjà enregistré")
    }

	const body = { 
		firstname, 
		lastname, 
		dateNaissance: date_naissance,
		sexe,
		email, 
		password }

	if (Object.values(body).length) {
		if (Object.values(body).some(b => b === undefined)) {
			res.status(400)
			throw new Error("L'une ou plusieurs des donnees obligatoire sont manquantes")
		}
	}

    const user = await User.create(body)

    if (user) {
        res.status(201).json({
			error: false,
			message: "L'utilisateur a bien été créé avec succès",
			user: {
                firstname     : user?.firstname,
                lastname      : user?.lastname,
                email         : user?.email,
                sexe          : user?.sexe,
                role          : user?.role,
                dateNaissance : user?.dateNaissance,
                createdAt     : user?.createdAt,
                updateAt      : user?.updateAt,
                subscription  : user?.subscription
            }
        })
    } else {
        res.status(400)
        throw new Error("L'une ou plusieurs des donnees obligatoire sont manquantes")
    }

	// L'un des donnees obligatoires ne sont pas conformes
})

/**
 * @desc    Logout an user
 * @route   DELETE /user/off
 * @access  Protected
 *
 * @type {express.RequestHandler}
 */
const logout = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	const refreshToken = await RefreshToken.findOne({user: req.user._id}).sort({created: '-1'})

	// console.log('RefreshToken', refreshToken)
	// console.log('User', user, req.user)

	if (user) {
		/** Delete Token */
		user.token = null
		await user.save()
	
        res.json({ 
			error: false,
			message: "L'utilisateur a été deconnecte success"
		})
    } else {
        res.status(404)
        throw new Error("L'utilisateur n'a pas été trouvé")
    }
})

/**
 * @desc    Update an user
 * @route   PUT /user
 * @access  Protected
 *
 * @type {express.RequestHandler}
 */
const updateUser = asyncHandler(async (req, res) => {
	const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });

	  // console.log('express-validator')
	  
	  res.status(409)
	  throw new Error("Une ou plusieurs données sont erronées")
    }

	const {
		firstname,
		lastname,
		sexe,
		date_naissance
	} = req.body

	const body = {
		firstname,
		lastname,
		sexe,
		dateNaissance: date_naissance
	}

	//console.log("body", body, Object.values(body), Object.values(body).length)

	if (Object.values(body).length) {
		if (Object.values(body).every(b => b === undefined)) {
			res.status(401)
			throw new Error("Aucun données n'a été envoyée")
		}
	}

	const user = await User.findById(req.user._id)

    if (user) {
        user.firstname 		= firstname      || user.firstname
        user.lastname 		= lastname       || user.lastname
        user.sexe           = sexe           || user.sexe
        user.dateNaissance  = date_naissance || user.dateNaissance

        const updatedUser = await user.save()

        res.json({
            error: false,
			message: "Vos données ont été mises à jour" 
        })
    } else {
        res.status(404)
        throw new Error("L'utilisateur n'a pas trouvé")
    }
})

/**
 * @desc    Delete an user
 * @route   DELETE /user
 * @access  Protected
 *
 * @type {express.RequestHandler}
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        await user.delete()

        res.json({
            error: false,
			message:  "Votre compte et le compte de vos enfants ont été supprimés avec succès"
        })
    } else {
        res.status(404)
        throw new Error("L'utilisateur n'a pas trouvé")
    }
})

export {
	login,
	register,
	deleteUser,
	updateUser,
	logout
}