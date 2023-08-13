import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Route } from "react-router";

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
  const [isValue, setIsValue] = useState(false);
  const [type, setType] = useState("");
  const [brand, SetBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<any | null>(null);
  const [description, setDescription] = useState("");

  const [oldType, setOldType] = useState("");
  const [oldBrand, setOldBrand] = useState("");
  const [oldName, setOldName] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [oldImage, setOldImage] = useState<any | null>(null);
  const [oldDescription, setOldDescription] = useState("");

  const form = useForm<postValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState

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
            setOldDescription(res.data.product.description);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [id]);

  const postSubmited = (data: postValues) => {
    console.log("Form Submited", data);

    if (type.length === 0) {
      setType(oldType);
    }
    if (brand.length === 0) {
      SetBrand(oldBrand);
    }
    if (name === "") {
      setName(oldName);
    }
    if (price === "") {
      setPrice(oldPrice);
    }
    if (image === null) {
      setImage(oldImage);
    }
    if (description === "") {
      setDescription(oldDescription);
    }

    axios
      .put(
        `http://localhost:8001/products/${productId}`,
        {
          type: type || oldType,
          brand: brand || oldBrand,
          name: name || oldName,
          price: price || oldPrice,
          image: image || oldImage,
          description: description || oldDescription,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        console.log(res.status);
        if(res.status === 200){
          alert("Update Berhasil")
          router.push("/userdetail")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = () => {
    axios
      .delete(`http://localhost:8001/products/${productId}`, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("berhasil delete data");
          router.push("/userdetail");
        }
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
            <div> {`Rp ${Number(oldPrice).toLocaleString("id-ID")}`} </div>
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
              placeholder={oldBrand}
              onChange={(e) => SetBrand(e.target.value)}
            />
          </div>

          <div className="containerInput">
            <label htmlFor="name">Nama Produk</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder={oldName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="containerInput">
            <label htmlFor="price">Harga produk</label>
            <input
              type="number"
              id="price"
              {...register("price", {
                // valueAsNumber: true,
              })}
              value={price}
              placeholder={oldPrice}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="containerInput">
            <label htmlFor="image">Image produk (Harus Input Lagi)</label>
            <input
              type="file"
              id="image"
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is required",
                },
              })}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            <p className="error"> {errors.image?.message} </p>
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
              placeholder={oldDescription}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button>Submit Product</button>
          {/* {isPending && <button>Submiting Product...</button>} */}
        </form>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default EditDeleteProduct;
