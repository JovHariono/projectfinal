import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";

interface IAdminUserVerificationDetailProps {}

const AdminUserVerificationDetail: React.FunctionComponent<
  IAdminUserVerificationDetailProps
> = (props) => {
  const router = useRouter();
  const { verifId } = router.query;
  const [iud, setIud] = useState<any | null>(null);
  const [situ, setSitu] = useState<any | null>(null);
  const [skdu, setSkdu] = useState<any | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/user-verifications/${verifId}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.data);
        setIud(res.data.data.iud);
        setSitu(res.data.data.situ);
        setSkdu(res.data.data.skdu);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cancelSubmit = () => {
    axios
      .put(
        `http://localhost:8001/user-verifications/decline/${verifId}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Decline User Berhasil");
          router.push("/adminuserverification");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifySubmit = () => {
    axios
      .put(
        `http://localhost:8001/user-verifications/verify/${verifId}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          alert("Verify User Berhasil");
          router.push("/adminuserverification");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Navbar />

      <div className="containerAdminUserVerificationDetail">
        <div className="containerContentAdminUserVerificationDetail">
          <div className="judulContainerContentAdminUserVerificationDetail">
            User Verification
          </div>
          {isPending && <div> Loading... </div>}
          {!isPending && (
            <div>
              <div className="containerDetailContentAdminUserVerificationDetail">
                Izin Usaha Dagang(IUD):
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={iud}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                Surat Ijin Tempat Usaha(SITU):
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={situ}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                Surat Keterangan Domisili Usaha(SKDU):
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={skdu}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>
              <div className="containerButtonDetailContentAdminUserVerification">
                <button onClick={cancelSubmit} className="cancelVerify">
                  {" "}
                  Decline Verify User{" "}
                </button>
                <button onClick={verifySubmit}> Verify User </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserVerificationDetail;
