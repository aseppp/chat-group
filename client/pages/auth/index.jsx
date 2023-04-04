import Head from 'next/head';
import React, { useState } from 'react';

const index = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-screen flex items-center justyfy-center bg-slate-50">
        <div className="w-2/5 m-auto drop-shadow-lg md:p-7 bg-white rounded-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Authentication</h1>
          </div>

          <div>
            <form>
              {open ? (
                <div className="flex flex-col gap-3 my-3">
                  <label htmlFor="username" className="font-medium">
                    Username
                  </label>
                  <input
                    type="name"
                    className="p-3 border-2 rounded-md"
                    placeholder="username"
                  />
                </div>
              ) : null}

              <div className="flex flex-col gap-3 my-3">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="p-3 border-2 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-3 my-3">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 border-2 rounded-md"
                />
              </div>

              <div className="my-5">
                <button
                  type="submit"
                  className="w-full md:p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
                >
                  {open ? <p>Sign Up</p> : <p>Sign In</p>}
                </button>
              </div>

              <div className="flex justify-center">
                <p>
                  Don't have account ? {''}
                  <button
                    onClick={() => setOpen(!open)}
                    type="button"
                    className="font-bold"
                  >
                    {open ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
