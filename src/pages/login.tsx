import Image from "next/image";
import * as React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

import ImageLoginRegister from "../../public/assets/LoginRegister.png";
import Link from "next/link";

type typeLogin = {
  email: string;
  password: string;
};

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const formLogin = useForm<typeLogin>();
  const { register, handleSubmit, formState } = formLogin;
  const { errors } = formState;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onSubmit = (data: typeLogin) => {
    console.log("Form Submitted", data);

    //pass admin: 123
    // "http://188.166.238.35:8001/auth/login"

    axios
      .post(
        "http://localhost:8001/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data);
        console.log(res);
        if (res.status === 200) {
          alert("login berhasil");
          router.push("/");
        }
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          alert("Please try again ");
        } else {
          alert("Wrong username/password");
        }
      });
  };

  return (
    <div className="containerLogin">
      <div className="containerLoginContent">
        <div className="containerContentK">
          <div className="Header1LoginRegister">Welcome !</div>
          <div className="Header2LoginRegister">Sign in to</div>
          <div className="subHeader1LoginRegister">lorem ipsum is simply</div>
          <div className="containerFormLogin">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="containerInput">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email not yet filled",
                    },
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="error"> {errors.email?.message} </p>
              </div>

              <div className="containerInput">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password not yet filled",
                    },
                  })}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="error"> {errors.password?.message} </p>
              </div>

              {/* <div className="containerInput">
                <div className="containerRememberInput">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    {...register("rememberMe")}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe" className="label">
                    Remember Me
                  </label>
                </div>
              </div> */}

              <button>Log In</button>
            </form>
          </div>
          <div className="subHeader3LoginRegister">
            Do not have an Account?
            <Link href="/register">
              <strong>Register</strong>
            </Link>
          </div>
        </div>
      </div>
      <div className="containerImgLoginRegister">
        <Image src={ImageLoginRegister} alt="Unknown" />
      </div>
    </div>
  );
};

export default Login;
