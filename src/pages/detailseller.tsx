import * as React from "react";
import Navbar from "./navbar";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface IDetailSellerProps {}

type FormValues = {
  idseller: number;
  address: string;
  city: string;
  postcode: number;
};

const DetailSeller: React.FunctionComponent<IDetailSellerProps> = (props) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostCode] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [idSeller, setIdSeller] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);
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
    console.log(postcode)
    axios
      .post(
        "http://localhost:8001/address",
        {
          user_id: id,
          address,
          city,
          post_code: postcode,
        },
        {
          withCredentials: true,
          // headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        setIsPending(true);
        router.push("/userdetail")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;



  return (
    <div className="container">
      <Navbar />
      {id !== null && (
        <div className="containerForm">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="judulForm">Verified Address Form</div>
            <div
              className="containerInput"
              style={{ display: "none" }}
            >
              <label htmlFor="idseller">Id User</label>
              <input
                type="number"
                id="idseller"
                {...register("idseller", {
                  valueAsNumber: true,
                })}
                defaultValue={id}
              />
              <p className="error"> {errors.idseller?.message} </p>
            </div>

            <div className="containerInput">
              <label htmlFor="address">Address</label>
              <textarea
                rows={5}
                cols={30}
                id="address"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Address is required",
                  },
                })}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
              <p className="error"> {errors.address?.message} </p>
            </div>

            <div className="containerInput">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                {...register("city", {
                  required: {
                    value: true,
                    message: "City is required",
                  },
                })}
                //   value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <p className="error"> {errors.city?.message} </p>
            </div>

            <div className="containerInput">
              <label htmlFor="postCode">PostCode</label>
              <input
                type="number"
                id="postCode"
                {...register("postcode",  {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Post Code is required",
                  },
                })}
                //   value={postcode}
                onChange={(e) => setPostCode(e.target.valueAsNumber)}
              />
              <p className="error"> {errors.postcode?.message} </p>
            </div>

            {!isPending && <button>Submit</button>}
            {isPending && <button>Submitting...</button>}
          </form>
        </div>
      )}
    </div>
  );
};

export default DetailSeller;
