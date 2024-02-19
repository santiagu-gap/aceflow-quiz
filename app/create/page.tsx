import Navbar from "../components/Navbar";
import { getAuthSession } from "@/lib/auth";
import CoolBlur from "@/components/cool-blur";
import CreateCarousel from "@/components/create-carousel";
import { Plus_Jakarta_Sans } from "next/font/google";
import Stripe from "stripe";
import axios from 'axios';
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});


// const webhook = async (req: any, res: any) => {
//   const sig = req.headers["stripe-signature"];
//   const stripe = new Stripe(process.env.STRIPE_SECRET!, {
//     apiVersion: "2023-10-16",
//   });
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
//   } catch (err: any) {
//     console.log(err);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;
//     const userEmail = session.customer_email;
//     console.log(session);
//     console.log(userEmail);
//     const addEmailToPremium = await axios.post('/api/premium', {
//       "data": {
//         "email": userEmail
//       }
//     });
//   }
//   res.json({ received: true });
// }

const Create = async () => {
  const session = await getAuthSession();

  return (
    <div>
      <Navbar />
      <CoolBlur />

      <div className="text-center">
        <div className="mx-auto w-full px-8 space-y-12 pb-8">
          <CreateCarousel session={session} />
        </div>
      </div>

    </div>
  );
};

export default Create;
