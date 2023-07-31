import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserValidate } from "../types";
import { useRouter } from "next/router";

interface IAdminUserVerificationProps {}

const AdminUserVerification: React.FunctionComponent<
  IAdminUserVerificationProps
> = (props) => {
  const [users, setUsers] = useState<UserValidate[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8001/user-verifications", {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const userRequest = users.filter(
    (user) => user.verification_status === "Requested"
  );

  return (
    <div className="container">
      <Navbar />
      <div className="containerAdminUserVerification">
        <div className="containerContentAdminUserVerification">
          {userRequest.map((user, index) => {
            return (
              <div key={index}
                className="contentAdminUserVerification"
                onClick={() => {
                    router.push({
                        pathname: '/adminuserverificationdetail',
                        query: { verifId: user.id }
                    })
                }}
              >
                <div> User ID: {user.user_id}</div>
                <div> Status: {user.verification_status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminUserVerification;
