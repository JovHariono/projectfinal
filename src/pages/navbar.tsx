import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  faCartShopping,
  faCircleUser,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import Link from "next/link";

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8001/auth/validate", {
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.user.username);
        setUser(true);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="navbar">
      <Link href="/" className="homeIcon">
        <FontAwesomeIcon className="faIndex" icon={faCar} />
      </Link>
      <div className="navLeft">
        {/* <div className="cart">
          <FontAwesomeIcon className="faIndex" icon={faCartShopping} />
          <span>0</span>
          </div> */}
        <div className="profile">
          {user ? (
            <div className="profileUser">
              <Link href="/userdetail">
              <FontAwesomeIcon className="faIndex" icon={faCircleUser} />
              </Link>
               {name} </div>
          ) : (
            <div className="profileUser">
              <FontAwesomeIcon className="faIndex" icon={faCircleUser} />
              <Link href="/login" className="profileLink">
                Log in
              </Link>
              <Link href="/register" className="profileLink">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
