import React from 'react';
import FormRegister from '../components/register/FormRegister';

export default function Register() {
  return (
    <div className="bg-base-100">
      <div className="container mx-auto h-screen flex justify-center">
        <div className="w-6/12 self-end hidden lg:block">
          <img src="/img-register.png" alt="LoginImage" className="w-full" />
        </div>
        <div className="text-center w-6/12 grow self-center">
          <h2 className="text-5xl poppins-bold text-primary">Register</h2>
          <h2 className="text-5xl poppins-bold text-primary mt-2">
            Dicoding Forum
          </h2>
          <FormRegister />
        </div>
      </div>
    </div>
  );
}
