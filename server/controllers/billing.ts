import Express from 'express'
import Stytch from '../services/stytch'
import { handleError } from '../errors/handleError'
import { stripe } from '../services/stripe'
import { User } from '../models/User'

export const validateCheckoutPurchase = async (req: Express.Request, res: Express.Response) => {
    try {
        if (!req.query.checkout) {
            return res.status(404).end()
        }

        const checkoutId = req.query.checkout.toString()

        const checkout = await stripe.checkout.sessions.retrieve(checkoutId, {
            expand: ['customer']
        })

        const userExists = await User.exists({
            phone: checkout.customer_details.phone
        })

        const stripeCustomerId =  (
            typeof checkout.customer === 'object'
                ? checkout.customer.id
                : checkout.customer
        )

        if (userExists) {
            await User.updateOne({
                phone: checkout.customer_details.phone
            }, {
                $set: {
                    stripeCustomerId
                }
            })
        } else {
            const { stytchUserId } = await Stytch.createUser({ phone: checkout.customer_details.phone })
            await User.create({
                stripeCustomerId,
                phone: checkout.customer_details.phone,
                name: checkout.customer_details.name,
                stytchUserId
            })
        }

        res.redirect('/login')
    } catch (err) {
        handleError(err, res)
    }
}
