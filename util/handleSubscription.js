const stripe = require('stripe')(process.env.STRIPE_SECRET);
const express = require('express');
const app = express();

const endpointSecret = process.env.STRIPE_WEBHOOK;

app.post('/webhook-secret', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const paymentIntentSucceeded = event.data.object;
            const customerEmail = paymentIntentSucceeded.customerEmail;
            addEmailToPremium(customerEmail);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
});