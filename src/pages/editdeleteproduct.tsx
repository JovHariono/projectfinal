import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface IEditDeleteProductProps {}

type postValues = {
  type: string;
  brand: string;
  name: string;
  price: number;
  image: File;
  description: string;
};

const EditDeleteProduct: React.FunctionComponent<IEditDeleteProductProps> = (
  props
) => {
  const router = useRouter();
  const { productId } = router.query;
  const [id, setId] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [type, setType] = useState("");
  const [brand, SetBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const [oldType, setOldType] = useState("");
  const [oldBrand, setOldBrand] = useState("");
  const [oldName, setOldName] = useState("");
  const [oldPrice, setOldPrice] = useState(0);
  const [oldImage, setOldImage] = useState("");
  const [oldDescription, setOldDescription] = useState("");

  const form = useForm<postValues>();
  const { register, handleSubmit, formState } = form;

  useEffect(() => {
    axios
      .get("http://localhost:8001/auth/validate", {
        withCredentials: true,
      })
      .then((res) => {
        setId(res.data.user.id);
        setIsPending(true);
      })
      .catch((err) => console.log(err.message));

    {
      isPending &&
        axios
          .get(`http://localhost:8001/products/${productId}`, {
            withCredentials: true,
          })
          .then((res) => {
            setOldType(res.data.product.type);
            setOldBrand(res.data.product.brand);
            setOldName(res.data.product.name);
            setOldPrice(res.data.product.price);
            setOldImage(res.data.product.image);
            setOldDescription(res.data.product.decription);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [id]);

  const postSubmited = (data: postValues) => {
    console.log("Form Submited", data);

    // axios
    //   .post(
    //     "http://localhost:8001/products",
    //     {
    //       type,
    //       brand,
    //       name,
    //       price,
    //       image,
    //       description,
    //     },
    //     {
    //       withCredentials: true,
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log("backend",res.data.data);
    //     }
    //     console.log("Posting data", res);
    //     setIsPending(false);
    //     router.push("/validasiproduk");
    //   })
    //   .catch((err) => {
    //     console.log(err.response.status)
    //     if(err.response.status === 401){
    //       alert("login/register dulu")
    //       router.push('/')
    //     }
    //   });
  };

  const deleteProduct = () => {
    axios
      .delete(`http://localhost:8001/products/${productId}`, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="containerFormEditDelete">
        <div className="oldObject">
          <div className="judulForm">Kendaraan sekarang</div>
          <div className="detailOldProduct">
            <div>Type Kendaraan:</div>
            <div> {oldType} </div>
          </div>
          <div className="detailOldProduct">
            <div>Merk Produk:</div>
            <div> {oldBrand} </div>
          </div>
          <div className="detailOldProduct">
            <div>Nama Produk:</div>
            <div> {oldName} </div>
          </div>
          <div className="detailOldProduct">
            <div>Harga Produk:</div>
            <div> {`Rp ${oldPrice.toLocaleString("id-ID")}`} </div>
          </div>
          <div className="detailOldProduct">
            <div>Gambar Produk:</div>
            {oldImage === null ? (
              <div></div>
            ) : (
              <div className="containerImageIMobil">
                <Image
                  className="ImageIMobil"
                  src={oldImage}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
              </div>
            )}
          </div>
          <div className="detailOldProduct">
            <div>Deskripsi Produk:</div>
            <div> {oldDescription} </div>
          </div>
          <button onClick={deleteProduct} className="deleteProduct">
            {" "}
            Delete Product{" "}
          </button>
        </div>
        <form className="formEditDelete" onSubmit={handleSubmit(postSubmited)}>
          <div className="judulForm">Form Edit / Delete kendaraan</div>
          <div className="containerInput">
            <label htmlFor="type">Type Kendaraan</label>
            <select
              id="type"
              {...register("type")}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Mobil">Mobil</option>
              <option value="Motor">Motor</option>
            </select>
          </div>

          <div className="containerInput">
            <label htmlFor="brand">Merk produk</label>
            <input
              type="text"
              id="brand"
              {...register("brand")}
              value={brand}
              onChange={(e) => SetBrand(e.target.value)}
            />
          </div>

          <div className="containerInput">
            <label htmlFor="name">Nama Produk</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              // value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="containerInput">
            <label htmlFor="price">Harga produk</label>
            <input
              type="number"
              id="price"
              {...register("price")}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="containerInput">
            <label htmlFor="image">Gambar produk</label>
            <input
              type="file"
              id="image"
              {...register("image")}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="containerInput">
            <label className="textdescription" htmlFor="description">
              Deskripsi Produk
            </label>
            <textarea
              id="description"
              rows={15}
              cols={65}
              {...register("description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button>Submit Product</button>
          {/* {isPending && <button>Submiting Product...</button>} */}
        </form>
      </div>
    </div>
  );
};

export default EditDeleteProduct;
