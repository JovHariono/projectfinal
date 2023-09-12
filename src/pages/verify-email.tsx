import Image from "next/image";
import * as React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

import ImageLoginRegister from "../../public/assets/LoginRegister.png";
import Link from "next/link";

interface IVerifyEmailProps {
}

const VerifyEmail: React.FunctionComponent<IVerifyEmailProps> = (props) => {
    const router = useRouter()

    const login = () => {
        router.push("login")
    }

  return (
    <div className="containerLogin">
      <div className="containerLoginContent">
        <div className="containerContentK">
          <div className="Header1LoginRegister">Welcome !</div>
          <div className="Header2LoginRegister">Email Verified</div>
          <div className="subHeader1LoginRegister"></div>
          <div className="containerFormLogin">
            
          </div>
          <div className="subHeader3LoginRegister">
            <button onClick={login}>
            Click here to login
            </button>
          </div>
        </div>
      </div>
      <div className="containerImgLoginRegister">
        <Image src={ImageLoginRegister} alt="Unknown" />
      </div>
    </div>
  );
};

export default VerifyEmail;
