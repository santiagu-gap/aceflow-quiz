'use client';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import Navbar from '../app/components/Navbar';
import CoolBlur from '@/components/cool-blur';
import axios from 'axios';
import { Session } from 'next-auth';

const ProPage = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  let email: string = '';

  if (session && session.user && session.user.email) {
    email = session.user.email;
    // console.log(email);
  }

  const handleSubmit = async (
    e: React.FormEvent,
    url: string,
    email: string
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { email });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //-------------------------------------
  return (
    <div>
      <Navbar />
      <CoolBlur />

      <div className="mx-6 mt-4 grid items-center justify-center gap-8 ">
        <div className="space-y-2 text-center">
          <div className="flex flex-col items-center justify-center text-4xl font-bold md:flex-row md:text-6xl">
            <span>Meet</span>
            <span className="ml-4 text-primary">Aceflow Pro</span>
          </div>

          <div className="mb-6 pt-3 text-2xl font-semibold md:text-4xl">
            Go unlimited, learn like magic ✨
          </div>
        </div>

        <div className="mt-4 md:mt-10">
          <div className="mb-6 text-2xl font-semibold md:text-4xl">
            <span>Unlock your new future with </span>
            <span className="text-primary">Aceflow Pro </span>
          </div>

          <ul className="ml-4 grid gap-2 text-lg md:text-2xl">
            <li className="flex flex-row items-center gap-4">
              <FaCheck className="h-8 w-8 text-green-500 md:h-9 md:w-9" />
              <div>
                <span className="font-semibold">Unlimited </span>
                practice questions to master key concepts
              </div>
            </li>

            <li className="flex flex-row items-center gap-4">
              <FaCheck className="h-8 w-8 text-green-500 md:h-9 md:w-9" />
              <div>
                <span className="font-semibold">Infinite </span>
                messages to learn from your custom AI tutor
              </div>
            </li>

            <li className="flex flex-row items-center gap-4">
              <FaCheck className="h-8 w-8 text-green-500 md:h-9 md:w-9" />
              <div>
                <span className="font-semibold">Coming soon: </span>
                track your progress with performance data
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center">
          <div className=" mx-6 grid w-[90%] gap-6 rounded-3xl px-2 py-10 text-center outline outline-4 outline-primary md:mx-0 md:gap-8">
            <h1 className="text-xl md:text-3xl">INVEST IN YOUR FUTURE</h1>
            <div className="grid gap-3">
              <div className="justify-items flex flex-col items-center text-3xl font-medium md:text-5xl">
                <div>
                  <span className="font-bold">Only </span>
                  $11.99/mo
                </div>
                <button
                  onClick={e =>
                    handleSubmit(
                      e,
                      '/api/checkout_sessions',
                      email
                    )
                  }
                  className="mt-4 w-[70%] rounded-xl bg-primary px-1 py-3 text-xl font-bold text-white hover:bg-primary/90 md:w-[55%] md:py-6 md:text-4xl"
                >
                  Go Unlimited
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-6 mt-12 flex flex-col md:relative">
        <button
          className=" md:absolute md:bottom-0 md:left-0 md:mb-0 md:text-lg"
          onClick={() => {
            router.push(`/`);
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ProPage;
