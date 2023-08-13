import * as React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

import hmlogo from "../../public/assets/LogoHome.png";
import usrlogo from "../../public/assets/User.png";
import Navbar from "./navbar";

type postValues = {
  type: string;
  brand: string;
  name: string;
  price: number;
  image: File;
  description: string;
};

interface ICreatePostProps {}

const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {
  const formProduk = useForm<postValues>();
  const { register, control, handleSubmit, formState } = formProduk;
  const { errors } = formState;

  const [type, setType] = useState("");
  const [brand, SetBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const postSubmited = (data: postValues) => {
    // const formdata = new FormData();

    setIsPending(true);
    // console.log("Form Submmitted", data);

    axios
      .post(
        "http://localhost:8001/products",
        {
          type,
          brand,
          name,
          price,
          image,
          description,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("backend", res.data.data);
          setIsPending(false);
          router.push("/validasiproduk");
          alert("posting produk berhasil");
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          alert("login/register dulu");
          router.push("/");
        }
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="containerForm">
        <form className="form" onSubmit={handleSubmit(postSubmited)}>
          <div className="judulForm">Form Jual kendaraan</div>
          <div className="containerInput">
            <label htmlFor="type">Type Kendaraan</label>
            <select
              id="type"
              {...register("type", {
                required: {
                  value: true,
                  message: "Type is required",
                },
              })}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Mobil">Mobil</option>
              <option value="Motor">Motor</option>
            </select>
            <p className="error"> {errors.type?.message} </p>
          </div>

          <div className="containerInput">
            <label htmlFor="brand">Merk produk</label>
            <input
              type="text"
              id="brand"
              {...register("brand", {
                required: {
                  value: true,
                  message: "Merk mobil is required",
                },
              })}
              value={brand}
              onChange={(e) => SetBrand(e.target.value)}
            />
            <p className="error"> {errors.brand?.message} </p>
          </div>

          <div className="containerInput">
            <label htmlFor="name">Nama Produk</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Nama Produk is required",
                },
              })}
              // value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="error"> {errors.name?.message} </p>
          </div>

          <div className="containerInput">
            <label htmlFor="price">Harga produk</label>
            <input
              type="number"
              id="price"
              {...register("price", {
                required: {
                  value: true,
                  message: "Harga produk is required",
                },
              })}
              // value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="error">{errors.price?.message}</p>
          </div>

          <div className="containerInput">
            <label htmlFor="image">Gambar produk</label>
            <input
              type="file"
              id="image"
              {...register("image", {
                required: {
                  value: true,
                  message: "Gambar Produk is required",
                },
              })}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            <p className="error">{errors.image?.message}</p>
          </div>

          <div className="containerInput">
            <label className="textdescription" htmlFor="description">
              Deskripsi Produk
            </label>
            <textarea
              id="description"
              rows={15}
              cols={65}
              {...register("description", {
                required: {
                  value: true,
                  message: "Deksripsi Produk is rerquired",
                },
              })}
              // value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className="error"> {errors.description?.message} </p>
          </div>
          {!isPending && <button>Submit Product</button>}
          {isPending && <button>Submiting Product...</button>}
        </form>
        {/* <DevTool control={control} /> */}
      </div>
      
    </div>
  );
};

export default CreatePost;
