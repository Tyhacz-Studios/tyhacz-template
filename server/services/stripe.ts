import Stripe from 'stripe';
import config from '../config'

const { STRIPE_SECRET_KEY } = config()
export const stripe = new Stripe(STRIPE_SECRET_KEY)
