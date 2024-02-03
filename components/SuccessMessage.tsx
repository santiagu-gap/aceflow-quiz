'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';

const SuccessMessage = ({ session }: { session: Session | null }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const email = queryParams.get('email');
      if (email) {
        // console.log('Email:', email);
        getStripeInfo(email);
        //addEmailToPremium(email);
      }
    }

    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 2000);
  }, []);

  const addEmailToPremium = async (userEmail: string) => {
    try {
      const response = await axios.post('/api/premium', { email: userEmail });
      console.log('User updated to premium:', response.data);
    } catch (error) {
      console.error('Error updating user to premium:', error);
    }
  };

  const getStripeInfo = async (userEmail: string) => {
    try {
      const response = await axios.post('/api/validate_subscription', { email: userEmail });
      console.log('User information:', response.data);
    } catch (error) {
      console.error('Error fetching information:', error);
    }
  };

  const handleBackClick = () => {
    // router.push('/');
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Payment Success</h1>
        <p>Your payment has been processed successfully.</p>
        <p>You will be redirected shortly.</p>
        <button onClick={handleBackClick}>Go back to home</button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .content {
          text-align: center;
        }

        button {
          margin-left: 10px;
          margin-top: 5px;
          padding: 10px 20px;
          background-color: #e11d48;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          text-decoration: none;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default SuccessMessage;
