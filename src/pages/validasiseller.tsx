import * as React from "react";
import Navbar from "./navbar";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
interface IValidasiSellerProps {}

type FormValues = {
  user_id: number;
  skdu: File;
  iud: File;
  situ: File;
};

const ValidasiSeller: React.FunctionComponent<IValidasiSellerProps> = (
  props
) => {
  axios.defaults.withCredentials = true;
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [id, setId] = useState(null);
  const [idSeller, setIdSeller] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [skdu, setSkdu] = useState<File | null>(null);
  const [iud, setIud] = useState<File | null>(null);
  const [situ, setSitu] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8001/auth/validate", {
        withCredentials: true,
      })
      .then((res) => {
        setId(res.data.user.id);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
    axios
      .post(
        "http://localhost:8001/user-verifications",
        {
          user_id: id,
          skdu,
          iud,
          situ,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        console.log("Posting data", res);
        setIsPending(true);
        router.push("/userdetail")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Navbar />
      { id == null && <div className="loadingValidasiSeller">Loading...</div> }
    { id !== null && <div className="containerForm">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="judulForm">Verified Seller Form</div>
        <div
          className="containerInput"
          style={{ display: "none" }}
        >
          <label htmlFor="idseller">Id User</label>
          <input
            disabled
            type="number"
            id="idseller"
            {...register("user_id")}
            value={id}
          />
          <p className="error"> {errors.user_id?.message} </p>
        </div>

        <div className="containerInput">
          <label htmlFor="skdu">
            Surat Keterangan Usaha Domisili Usaha (SKDU)
          </label>
          <input
            type="file"
            id="skdu"
            {...register("skdu", {
              required: {
                value: true,
                message: "SKDU is required",
              },
            })}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setSkdu(e.target.files[0]);
              }
            }}
          />
          <p className="error"> {errors.skdu?.message} </p>
        </div>

        <div className="containerInput">
          <label htmlFor="iud">Izin Usaha Dagang (UD)</label>
          <input
            type="file"
            id="iud"
            {...register("iud", {
              required: {
                value: true,
                message: "IUD is required",
              },
            })}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setIud(e.target.files[0]);
              }
            }}
          />
          <p className="error"> {errors.iud?.message} </p>
        </div>

        <div className="containerInput">
          <label htmlFor="situ">Surat Ijin Tempat Usaha (SITU)</label>
          <input
            type="file"
            id="situ"
            {...register("situ", {
              required: {
                value: true,
                message: "SITU is required",
              },
            })}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setSitu(e.target.files[0]);
              }
            }}
          />
          <p className="error"> {errors.situ?.message} </p>
        </div>

        {!isPending && <button>Submit Form</button>}
        {isPending && <button>Submiting Form...</button>}
      </form>
    </div>}
    {/* <div className="footer"></div> */}
    </div>
  );
};

export default ValidasiSeller;
