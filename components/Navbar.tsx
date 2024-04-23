'use client'
import React from "react";
import { SignInButton } from '@farcaster/auth-kit';

const Login = ({ onLogin }) => {
  const handleLogin = (response) => {
    const { fid, username, custody } = response; 
    console.log(`Hello, ${username}! Your fid is ${fid}, ${custody}`);
    onLogin(fid); 
  };

  return (
    <div>
      <SignInButton
        onSuccess={handleLogin} 
      />
    </div>
  );
};

const Navbar = () => {
  const handleLogin = (fid, custody) => {
    const userData = { fid, custody };
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log("Logged in with fid and custody:", fid, custody);
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">ONCHAIN Loteria</a>
      </div>
      <div className="flex-none">
      <Login onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Navbar;
