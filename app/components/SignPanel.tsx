import React, { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import SmileFace from "./SmileFace";
import { BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";

export default function SignPanel() {
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    setIsSignUp(false);
  }, []);

  return (
    <div className="item-center flex w-[90vw] flex-col gap-5 rounded-[30px] bg-primary p-5 md:p-10 text-white shadow-[5px_5px_20px_0_rgba(0,0,0,0.1)] shadow-black/10 md:w-[600px]">
      <SmileFace />
      <h1 className="mb-4 text-center font-archivo text-[4em] font-black uppercase leading-[0.9em] tracking-[-0.04em]">
        Koffee <br /> {isSignUp ? "Sign Up" : "Sign In"}
      </h1>

      {isSignUp ? <SignupForm /> : <SigninForm />}

      <div className="flex justify-between gap-4">
        <button
          onClick={() => signIn("github")}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border-[1px] border-white px-5 py-2 transition-colors duration-300 hover:bg-white/10"
        >
          <BsGithub size={30} /> Github
        </button>
        <button
          onClick={() => signIn("google")}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border-[1px] border-white px-5 py-2 transition-colors duration-300 hover:bg-white/10"
        >
          <BsGoogle size={30} /> Google
        </button>
      </div>
      <div className="text-center">
        {isSignUp ? (
          <>
            I have an account{" "}
            <span onClick={() => setIsSignUp(false)} className="cursor-pointer font-bold underline">
              Sign in
            </span>
          </>
        ) : (
          <>
            No account?{" "}
            <span onClick={() => setIsSignUp(true)} className="cursor-pointer font-bold underline">
              Sign up
            </span>
          </>
        )}
      </div>
    </div>
  );
}
