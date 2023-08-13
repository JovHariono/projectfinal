import * as React from "react";
import Navbar from "./navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface IEditValidationProductProps {}

const EditValidationProduct: React.FunctionComponent<
  IEditValidationProductProps
> = (props) => {
  const router = useRouter();
  const { productId } = router.query;
  const [id, setId] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isValue, setIsValue] = useState<any | null>(null);
  const [oldDepan, setIsOldDepan] = useState<any | null>(null);
  const [oldBelakang, setOldBelakang] = useState<any | null>(null);
  const [oldKiri, setOldKiri] = useState<any | null>(null);
  const [oldKanan, setOldKanan] = useState<any | null>(null);
  const [oldDalam, setOldDalam] = useState<any | null>(null);
  const [oldStnk, setOldStnk] = useState<any | null>(null);
  const [oldGdrive, setOldGdrive] = useState<any | null>(null);
  const [oldBpkb, setOldBpkb] = useState<any | null>(null);

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
          .get(`http://localhost:8001/product-inspections/user/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data.inspection)
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [id]);

//   console.log(oldDepan)

  return (
    <div className="container">
      <Navbar />
      <div className="containerFormEditDelete">
        <div className="oldObject">
          <div className="judulForm">Kendaraan sekarang</div>
          <div className="detailOldProduct">
            <div>Type Kendaraan:</div>
            {/* <div> {oldType} </div> */}
          </div>
          <div className="detailOldProduct">
            <div>Merk Produk:</div>
            {/* <div> {oldBrand} </div> */}
          </div>
          <div className="detailOldProduct">
            <div>Nama Produk:</div>
            {/* <div> {oldName} </div> */}
          </div>
          <div className="detailOldProduct">
            <div>Harga Produk:</div>
            {/* <div> {`Rp ${Number(oldPrice).toLocaleString("id-ID")}`} </div> */}
          </div>
          {/* <div className="detailOldProduct">
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
          </div> */}
          <div className="detailOldProduct">
            <div>Deskripsi Produk:</div>
            {/* <div> {oldDescription} </div> */}
          </div>
          {/* <button onClick={deleteProduct} className="deleteProduct"> */}
          {/* {" "} */}
          {/* Delete Product{" "} */}
          {/* </button> */}
        </div>
        <form
          className="formEditDelete"
          // onSubmit=
          // {handleSubmit(postSubmited)}
        >
          <div className="judulForm">Form Edit / Delete kendaraan</div>

          <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukdepan">Tampak Depan</label>
              <input
                type="file"
                id="gambarprodukdepan"
                // {...register("gambarprodukdepan", {
                //   required: {
                //     value: true,
                //     message: "Gambar Produk Depan is required",
                //   },
                // })}
                // onChange={(e) => {
                //   if (e.target.files && e.target.files.length > 0) {
                //     setGambarProdukDepan(e.target.files[0]);
                //   }
                // }}
              />
              {/* <p className="error"> {errors.gambarprodukdepan?.message} </p> */}
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukbelakang">Tampak Belakang</label>
              <input
                type="file"
                id="gambarprodukbelakang"
                // {...register("gambarprodukbelakang", {
                //   required: {
                //     value: true,
                //     message: "Gambar Produk Belakang is required",
                //   },
                // })}
                // onChange={(e) => {
                //   if (e.target.files && e.target.files.length > 0) {
                //     setGambarProdukBelakang(e.target.files[0]);
                //   }
                // }}
              />
              {/* <p className="error"> {errors.gambarprodukbelakang?.message} </p> */}
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukkiri">Tampak Kiri</label>
              <input
                type="file"
                id="gambarprodukkiri"
                // {...register("gambarprodukkiri", {
                //   required: {
                //     value: true,
                //     message: "Gambar Produk Kiri is required",
                //   },
                // })}
                // onChange={(e) => {
                //   if (e.target.files && e.target.files.length > 0) {
                //     setGambarProdukKiri(e.target.files[0]);
                //   }
                // }}
              />
              {/* <p className="error"> {errors.gambarprodukkiri?.message} </p> */}
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukkanan">Tampak Kanan</label>
              <input
                type="file"
                id="gambarprodukkanan"
                // {...register("gambarprodukkanan", {
                //   required: {
                //     value: true,
                //     message: "Gambar Produk Kanan is required",
                //   },
                // })}
                // onChange={(e) => {
                //   if (e.target.files && e.target.files.length > 0) {
                //     setGambarProdukKanan(e.target.files[0]);
                //   }
                // }}
              />
              {/* <p className="error"> {errors.gambarprodukkanan?.message} </p> */}
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukdalam">Tampak Dalam</label>
              <input
                type="file"
                id="gambarprodukdalam"
                // {...register("gambarprodukdalam", {
                //   required: {
                //     value: true,
                //     message: "Gambar Produk Dalam is required",
                //   },
                // })}
                // onChange={(e) => {
                //   if (e.target.files && e.target.files.length > 0) {
                //     setGambarProdukDalam(e.target.files[0]);
                //   }
                // }}
              />
              {/* <p className="error"> {errors.gambarprodukdalam?.message} </p> */}
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukstnk">Foto STNK</label>
              <input
                type="file"
                id="gambarprodukstnk"
                // {...register("gambarprodukstnk", {
                //   required: {
                //     value: true,
                //     message: "Gambar Produk Stnk is required",
                //   },
                // })}
                // onChange={(e) => {
                //   if (e.target.files && e.target.files.length > 0) {
                //     setGambarProdukStnk(e.target.files[0]);
                //   }
                // }}
              />
              {/* <p className="error"> {errors.gambarprodukstnk?.message} </p> */}
            </div>

            <div className="formPostGambarProduk">
              <label htmlFor="gambarprodukbpkb">Foto BPKB</label>
              <input
                type="file"
                id="gambarprodukbpkb"
                // {...register("gambarprodukbpkb", {
                //   required: {
                //     value: true,
                //     message: "Gambar Produk Bpkb is required",
                //   },
                // })}
                // onChange={(e) => {
                //   if (e.target.files && e.target.files.length > 0) {
                //     setGambarProdukBpkb(e.target.files[0]);
                //   }
                // }}
              />
              {/* <p className="error"> {errors.gambarprodukbpkb?.message} </p> */}
            </div>

            <div className="containerInput">
              <label htmlFor="linkgdvalidasi">Link Gdrive</label>
              <input
                type="text"
                id="linkgdvalidasi"
                // {...register("linkgdvalidasi", {
                //   required: {
                //     value: true,
                //     message: "Link Gdrive is required",
                //   },
                //   pattern: {
                //     value:
                //       /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)(?:\/.*)?$/,
                //     message:
                //       "invalid gdrive format, gdrive must be like https://drive.google.com/........",
                //   },
                // })}
                // value={linkGDvalidasi}
                // onChange={(e) => {
                //   setLinkGDvalidasi(e.target.value);
                // }}
              />
              {/* <p className="error"> {errors.linkgdvalidasi?.message} </p> */}
            </div>
          <button>Submit Product</button>
          {/* {isPending && <button>Submiting Product...</button>} */}
        </form>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default EditValidationProduct;
