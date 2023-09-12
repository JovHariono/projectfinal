import Image from "next/image";
import * as React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ImageLoginRegister from "../../public/assets/LoginRegister.png";
import Link from "next/link";
import { error } from "console";

interface IVerifyEmailProps {}

const VerifyEmail: React.FunctionComponent<IVerifyEmailProps> = (props) => {
  const router = useRouter();
  const { code } = router.query;
  const [judul, setJudul] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(code){
        fetchData()
    }
  }, [code]);

  const fetchData = () => {
    setLoading(true);

    axios
      .get(`http://localhost:8001/auth/verify-email?code=${code}`)
      .then((res) => {
        console.log(res.data.message);
        setJudul(res.data.message)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setJudul(err.response.data.message)
        setLoading(false);
      });
  };

  const login = () => {
    router.push("login");
  };

  return (
    <div className="containerLogin">
      <div className="containerLoginContent">
        <div className="containerContentK">
          <div className="Header1LoginRegister">Welcome !</div>
          <div className="Header2LoginRegister">{ judul }</div>
          <div className="subHeader1LoginRegister"></div>
          <div className="containerFormLogin"></div>
          <div className="subHeader3LoginRegister">
            <button onClick={login}>Click here to login</button>
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
