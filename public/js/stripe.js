/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51Mgm9BGoUtXFVrNEBKmR8KbOuh3yYWObjMcKV1PGzmDfDWRarZvj42NHVhkywBnore1721TzFR7INZ4V9hFv5kGA00ZyPoulJN'
  );
  try {
    // 1)get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // 2)create checkout from + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
