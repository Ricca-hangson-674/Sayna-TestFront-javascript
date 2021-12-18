import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

/**
 * @desc    Abonnement de l'utilisateur
 * @route   PUT  /subscription
 * @access  Private
 *
 * @type {express.RequestHandler}
 */
const subscription = asyncHandler(async (req, res) => {
    const {
        idCart,
        cvc
    } = req.body

    if (!idCart && !cvc) {
        res.status(400)
        throw new Error("Une ou plusieurs données obligatoire sont manquantes")
    }

    const user = await User.findById(req.user._id)

    if (user) {

        if (user.cards.find(c => c.cartNumber === idCart)) {
            user.subscription = true

            await user.save()
            
            return res.json({
                error: false,
                message:  "Votre abonnement a bien été mise à jour" 
            })

        }

        res.status(402)
        throw new Error("Echec du payement de l'offre")
    } else {
        res.status(404)
        throw new Error("Votre token n'est pas correct" )
    }

})

/**
 * @desc    Ajout de carte bancaire
 * @route   PUT  /user/cart
 * @access  Private
 *
 * @type {express.RequestHandler}
 */
const updateCard = asyncHandler(async (req, res) => {
    const {
        cartNumber,
        month,
        year,
        defaultParam
	} = req.body

	const errors = validationResult(req)

    if (!errors.isEmpty()) {
	  
	  res.status(402)
	  throw new Error("Informations bancaire incorrectes")
    }

    const user = await User.findById(req.user._id)

    const card = {
        cartNumber,
        month, 
        year,
        default: defaultParam
    }

    /** Token erroné - 401 { "error": true, "message": "Votre token n'est pas correct" } */
    /** Carte fail - 402  { "error": true, "message": "Informations bancaire incorrectes" } */
    /** Carte existe - 409 { "error": true, "message": "La carte existe déjà" } */
    /** Carte erronée/incomplète - 403 { "error": true, "message": "Veuillez compléter  votre proﬁl avec une carte de crédit" } */
    /** Droit d'accès  - 403 { "error": true, "message": "Vos droits d'accès ne permettent pas d'accéder à la ressource" } */
    /** Donnée non-conforme - 409 { "error": true, "message": "Une ou plusieurs données sont erronées" } */

    if (user) {

        if (user.cards.find(c => c.cartNumber === cartNumber)) {
            res.status(409)
            throw new Error("La carte existe déjà")
        }

        if (user.cards.length) {
            res.status(403)
            throw new Error("Veuillez compléter votre proﬁl avec une carte de crédit")
        }

        user.cards = [card]

        await user.save()

        res.json({
            error: false,
			message: "Vos données ont été mises à jour"
        })
    } else {
        res.status(404)
        throw new Error("L'utilisateur n'a pas trouvé")
    }
})

export {
    updateCard,
    subscription
}