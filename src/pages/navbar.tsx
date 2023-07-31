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
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8001/auth/validate", {
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.user.username);
        setUser(true);
        setIsLoading(false);
        setRole(res.data.user.role);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="navbar">
      <Link href="/" className="homeIcon">
        <FontAwesomeIcon className="faIndex" icon={faCar} />
      </Link>
      <div className="navLeft">
        {isLoading ? (
          <div className="loading"> Loading... </div>
        ) : (
          <div className="profile">
            {user ? (
              <div className="profileUser">
                <div>
                {role === "Admin" ? (
                  <div className="containerAdminPage">
                    <div className="adminPage">
                      <Link href="/adminpage" className="linkAdminPage">
                        To Admin Page
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                </div>
                <div className="iconUserDetail">
                <Link href="/userdetail">
                  <FontAwesomeIcon className="faIndex" icon={faCircleUser} />
                </Link>
                {name}{" "}
                </div>
              </div>
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
