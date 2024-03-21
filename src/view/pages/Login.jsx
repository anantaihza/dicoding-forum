import React from 'react';
import FormLogin from '../components/login/FormLogin';

export default function Login() {
  return (
    <div className="bg-base-100">
      <div className="container mx-auto h-screen flex justify-center">
        <div className="w-7/12 self-end hidden lg:block">
          <img
            src="/src/assets/img/img-login.png"
            alt="LoginImage"
            className="xl:w-[97.5%]"
          />
        </div>
        <div className="text-center w-5/12 grow self-center">
          <h2 className="text-5xl poppins-bold text-primary">Login</h2>
          <h2 className="text-5xl poppins-bold text-primary mt-2">
            Dicoding Forum
          </h2>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
