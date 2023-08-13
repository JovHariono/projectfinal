import * as React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { useRouter } from "next/router";

type FormValues = {
  product_id: number;
  gambarprodukdepan: File;
  gambarprodukbelakang: File;
  gambarprodukkiri: File;
  gambarprodukkanan: File;
  gambarprodukdalam: File;
  gambarprodukstnk: File;
  gambarprodukbpkb: File;
  linkgdvalidasi: string;
};

interface IValidasiProdukProps {}

const ValidasiProduk: React.FunctionComponent<IValidasiProdukProps> = (
  props
) => {
  const formValidation = useForm<FormValues>({});
  const { register, handleSubmit, formState } = formValidation;
  const { errors } = formState;
  const router = useRouter();
  const [idProduct, setIdProduct] = useState("");
  const [gambarprodukdepan, setGambarProdukDepan] = useState<File | null>(null);
  const [gambarprodukbelakang, setGambarProdukBelakang] = useState<File | null>(
    null
  );
  const [gambarprodukkiri, setGambarProdukKiri] = useState<File | null>(null);
  const [gambarprodukkanan, setGambarProdukKanan] = useState<File | null>(null);
  const [gambarprodukdalam, setGambarProdukDalam] = useState<File | null>(null);
  const [gambarprodukstnk, setGambarProdukStnk] = useState<File | null>(null);
  const [gambarprodukbpkb, setGambarProdukBpkb] = useState<File | null>(null);
  const [linkGDvalidasi, setLinkGDvalidasi] = useState("");
  const [latestPostId, setLatestPostId] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:8001/products")
      .then((res) => {
        const posts = res.data.data;
        const latestPost = posts.reduce(
          (prev: { id: number }, current: { id: number }) => {
            return prev.id > current.id ? prev : current;
          }
        );
        setLatestPostId(latestPost.id);
        setIsPending(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // console.log(latestPostId)

  const onSubmit = (data: FormValues) => {
    setIsLoading(true)

    console.log("Form Submitted", data);

    axios
      .post(
        "http://localhost:8001/product-inspections",
        {
          product_id: latestPostId,
          depan: gambarprodukdepan,
          belakang: gambarprodukbelakang,
          kiri: gambarprodukkiri,
          kanan: gambarprodukkanan,
          dalam: gambarprodukdalam,
          stnk: gambarprodukstnk,
          gdrive_url: linkGDvalidasi,
          bpkb: gambarprodukbpkb,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          router.push("/");
          alert("berhasil masukkan validasi produk")
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="containerForm">
        {isPending && <div>Loading...</div>}
        {latestPostId !== null && (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="judulForm">Form validasi barang</div>
            <div className="containerInput" style={{ display: "none" }}>
              <label htmlFor="idProduct">Id produk</label>
              <input
                disabled
                type="number"
                id="idProduct"
                {...register("product_id", {})}
                onChange={(e) => setIdProduct(e.target.value)}
                defaultValue={latestPostId !== 1 ? Number(latestPostId) : 0}
              />
              <p className="error">{errors.product_id?.message}</p>
            </div>
            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukdepan">Tampak Depan</label>
              <input
                type="file"
                id="gambarprodukdepan"
                {...register("gambarprodukdepan", {
                  required: {
                    value: true,
                    message: "Gambar Produk Depan is required",
                  },
                })}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setGambarProdukDepan(e.target.files[0]);
                  }
                }}
              />
              <p className="error"> {errors.gambarprodukdepan?.message} </p>
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukbelakang">Tampak Belakang</label>
              <input
                type="file"
                id="gambarprodukbelakang"
                {...register("gambarprodukbelakang", {
                  required: {
                    value: true,
                    message: "Gambar Produk Belakang is required",
                  },
                })}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setGambarProdukBelakang(e.target.files[0]);
                  }
                }}
              />
              <p className="error"> {errors.gambarprodukbelakang?.message} </p>
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukkiri">Tampak Kiri</label>
              <input
                type="file"
                id="gambarprodukkiri"
                {...register("gambarprodukkiri", {
                  required: {
                    value: true,
                    message: "Gambar Produk Kiri is required",
                  },
                })}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setGambarProdukKiri(e.target.files[0]);
                  }
                }}
              />
              <p className="error"> {errors.gambarprodukkiri?.message} </p>
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukkanan">Tampak Kanan</label>
              <input
                type="file"
                id="gambarprodukkanan"
                {...register("gambarprodukkanan", {
                  required: {
                    value: true,
                    message: "Gambar Produk Kanan is required",
                  },
                })}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setGambarProdukKanan(e.target.files[0]);
                  }
                }}
              />
              <p className="error"> {errors.gambarprodukkanan?.message} </p>
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukdalam">Tampak Dalam</label>
              <input
                type="file"
                id="gambarprodukdalam"
                {...register("gambarprodukdalam", {
                  required: {
                    value: true,
                    message: "Gambar Produk Dalam is required",
                  },
                })}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setGambarProdukDalam(e.target.files[0]);
                  }
                }}
              />
              <p className="error"> {errors.gambarprodukdalam?.message} </p>
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukstnk">Foto STNK</label>
              <input
                type="file"
                id="gambarprodukstnk"
                {...register("gambarprodukstnk", {
                  required: {
                    value: true,
                    message: "Gambar Produk Stnk is required",
                  },
                })}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setGambarProdukStnk(e.target.files[0]);
                  }
                }}
              />
              <p className="error"> {errors.gambarprodukstnk?.message} </p>
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukbpkb">Foto BPKB</label>
              <input
                type="file"
                id="gambarprodukbpkb"
                {...register("gambarprodukbpkb", {
                  required: {
                    value: true,
                    message: "Gambar Produk Bpkb is required",
                  },
                })}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setGambarProdukBpkb(e.target.files[0]);
                  }
                }}
              />
              <p className="error"> {errors.gambarprodukbpkb?.message} </p>
            </div>

            <div className="containerInput">
              <label htmlFor="linkgdvalidasi">Video Mobil/Motor (Link Gdrive)</label>
              <input
                type="text"
                id="linkgdvalidasi"
                {...register("linkgdvalidasi", {
                  required: {
                    value: true,
                    message: "Link Gdrive is required",
                  },
                  pattern: {
                    value:
                      /^https:\/\/drive\.google\.com\//,
                    message:
                      "invalid gdrive format, gdrive must be like https://drive.google.com/........",
                  },
                })}
                value={linkGDvalidasi}
                onChange={(e) => {
                  setLinkGDvalidasi(e.target.value);
                }}
              />
              <p className="error"> {errors.linkgdvalidasi?.message} </p>
            </div>

            { !isLoading && <button>Submit Validation</button> }
            { isLoading && <div>Submiting Validation....</div> }
          </form>
        )}
      </div>
      
    </div>
  );
};

export default ValidasiProduk;
