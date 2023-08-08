import Image from "next/image";
import * as React from "react";
import ImageLoginRegister from "../../public/assets/LoginRegister.png";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

type regValues = {
  email: string;
  username: string;
  password: string;
  cPassword: string;
  phone: number;
  address: string;
};

const Login: React.FunctionComponent = () => {
  const { register, handleSubmit, formState, watch } = useForm<regValues>();
  const { errors, touchedFields } = formState;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const pass = watch("password");

  useEffect(() => {
    if (email && errors.email?.message) {
      errors.email.message = "";
    }
  }, [email, errors.email]);

  useEffect(() => {
    if (username && errors.username?.message) {
      errors.username.message = "";
    }
  }, [username, errors.username]);

  useEffect(() => {
    if (password && errors.password?.message) {
      errors.password.message = "";
    }
  }, [password, errors.password]);

  const regSubmit = (data: regValues) => {
    console.log("Form submitted", data);

    axios
      .post("http://localhost:8001/auth/register", {
        email,
        username,
        password,
        phone,
        // address,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));

    router.push("/login");
  };

  return (
    <div className="containerLogin">
      <div className="containerRegisterContent">
        <div className="containerContentK">
          <div className="Header1LoginRegister">Welcome !</div>
          <div className="Header2LoginRegister">Sign in to</div>
          <div className="subHeader1LoginRegister">lorem ipsum is simply</div>
          <div className="containerFormReg">
            <form onSubmit={handleSubmit(regSubmit)}>
              <div className="containerInput">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+).com$/,

                      message:
                        "Invalid email format, email must be like 'admin@example.com'",
                    },
                    validate: {
                      notAdmin: (fieldValue) => {
                        return (
                          fieldValue !== "admin@example.com" ||
                          "Enter a different email address"
                        );
                      },
                    },
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="error">
                  {(touchedFields.email || formState.isSubmitted) &&
                    errors.email?.message}
                </p>
              </div>

              <div className="containerInput">
                <label htmlFor="user">Username</label>
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "User is required",
                    },
                  })}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="error">
                  {(touchedFields.username || formState.isSubmitted) &&
                    errors.username?.message}
                </p>
              </div>

              <div className="containerInput">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="error">
                  {(touchedFields.password || formState.isSubmitted) &&
                    errors.password?.message}
                </p>
              </div>

              <div className="containerInput">
                <label htmlFor="cPassword">Confirm Password</label>
                <input
                  type="password"
                  id="cPassword"
                  {...register("cPassword", {
                    required: {
                      value: true,
                      message: "Confirm Password is required",
                    },
                    validate: (value) =>
                      value === pass || "Passwords do not match",
                  })}
                />
                <p className="error">
                  {(touchedFields.cPassword || formState.isSubmitted) &&
                    errors.cPassword?.message}
                </p>
              </div>

              <div className="containerInput">
                <label htmlFor="price">Nomor HP</label>
                <input
                  type="number"
                  id="phone"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Nomor HP is required",
                    },
                    pattern: {
                      value: /^08\d{9,11}$/,

                      message:
                        "Invalid phone number format, phone number must start with '08' and have 10-12 digits",
                    },
                  })}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="error">{errors.phone?.message}</p>
              </div>

              {/* <div className="containerInput">
                <label className="textaddress" htmlFor="description">
                  Alamat Rumah
                </label>
                <textarea
                  id="address"
                  rows={15}
                  cols={65}
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Alamat Rumah Is Rerquired",
                    },
                  })}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                <p className="error"> {errors.address?.message} </p>
              </div> */}

              <button type="submit">Register</button>
            </form>
          </div>
          <div className="subHeader3LoginRegister">
            Already have an account?
            <Link href="/login">
              <strong>Log in</strong>
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
