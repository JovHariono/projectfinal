import * as React from "react";
import Navbar from "./navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import axios from "axios";

interface IEditValidateProductProps {}

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

const EditValidateProduct: React.FunctionComponent<
  IEditValidateProductProps
> = (props) => {
  const router = useRouter();
  const { inspectionId } = router.query;
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const [oldGambarProdukdepan, setOldGambarProdukDepan] = useState<any | null>(
    null
  );
  const [oldGambarProdukbelakang, setOldGambarProdukBelakang] = useState<
    any | null
  >(null);
  const [oldGambarProdukkiri, setOldGambarProdukKiri] = useState<any | null>(
    null
  );
  const [oldGambarProdukkanan, setOldGambarProdukKanan] = useState<any | null>(
    null
  );
  const [oldGambarProdukdalam, setOldGambarProdukDalam] = useState<any | null>(
    null
  );
  const [oldGambarProdukstnk, setOldGambarProdukStnk] = useState<any | null>(
    null
  );
  const [oldGambarProdukbpkb, setOldGambarProdukBpkb] = useState<any | null>(
    null
  );
  const [OldLinkGDvalidasi, setOldLinkGDvalidasi] = useState("");
  const [isPending, setIsPending] = useState(true)

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

  useEffect(() => {
    axios
      .get(`http://localhost:8001/product-inspections/${inspectionId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setOldGambarProdukDepan(res.data.data.depan);
        setOldGambarProdukBelakang(res.data.data.belakang);
        setOldGambarProdukKiri(res.data.data.kiri);
        setOldGambarProdukKanan(res.data.data.kanan);
        setOldGambarProdukDalam(res.data.data.dalam);
        setOldGambarProdukStnk(res.data.data.stnk);
        setOldGambarProdukBpkb(res.data.data.bpkb);
        setOldLinkGDvalidasi(res.data.data.gdrive_url);
        setIsPending(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);

    axios
        .put(`http://localhost:8001/product-inspections/${inspectionId}`, {
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
          })
        .then((res) => {
            console.log(res)
            if(res.status === 200){
                alert("update berhasil")
                router.push("/userdetail")
            }
        })
        .catch((err) => {
            console.log(err)
        })
  }

  return (
    <div className="container">
      <Navbar />
      <div className="containerUtamaEditValidateProducts">
        <div className="containerKiriEditValidateProducts">
            <div className="HeaderKiriEditValidateProducts">
            Validasi Lama
            </div>
            <div className="containerMasterGambarEditValidateProduct">
            <div className="containerUtamaGambarEditValidateProduct">
                { isPending ? (<div> Loading... </div>) : (
                <div className="containergambarEditValidateProduct">
                    Tampak Depan Lama:
                    <Image className="gambarEditValidateProduct" src={oldGambarProdukdepan} alt="unknown" width={0} height={0}/>
                </div>
                )}
            </div>

            <div className="containerUtamaGambarEditValidateProduct">
                { isPending ? (<div> Loading... </div>) : (
                <div className="containergambarEditValidateProduct">
                    Tampak Belakang Lama:
                    <Image className="gambarEditValidateProduct" src={oldGambarProdukbelakang} alt="unknown" width={0} height={0}/>
                </div>
                )}
            </div>

            <div className="containerUtamaGambarEditValidateProduct">
                { isPending ? (<div> Loading... </div>) : (
                <div className="containergambarEditValidateProduct">
                    Tampak Kiri Lama:
                    <Image className="gambarEditValidateProduct" src={oldGambarProdukkiri} alt="unknown" width={0} height={0}/>
                </div>
                )}
            </div>

            <div className="containerUtamaGambarEditValidateProduct">
                { isPending ? (<div> Loading... </div>) : (
                <div className="containergambarEditValidateProduct">
                    Tampak Kanan Lama:
                    <Image className="gambarEditValidateProduct" src={oldGambarProdukkanan} alt="unknown" width={0} height={0}/>
                </div>
                )}
            </div>

            <div className="containerUtamaGambarEditValidateProduct">
                { isPending ? (<div> Loading... </div>) : (
                <div className="containergambarEditValidateProduct">
                    Tampak Dalam Lama:
                    <Image className="gambarEditValidateProduct" src={oldGambarProdukdalam} alt="unknown" width={0} height={0}/>
                </div>
                )}
            </div>

            <div className="containerUtamaGambarEditValidateProduct">
                { isPending ? (<div> Loading... </div>) : (
                <div className="containergambarEditValidateProduct">
                    STNK Lama:
                    <Image className="gambarEditValidateProduct" src={oldGambarProdukstnk} alt="unknown" width={0} height={0}/>
                </div>
                )}
            </div>

            <div className="containerUtamaGambarEditValidateProduct">
                { isPending ? (<div> Loading... </div>) : (
                <div className="containergambarEditValidateProduct">
                    BPKB Lama:
                    <Image className="gambarEditValidateProduct" src={oldGambarProdukbpkb} alt="unknown" width={0} height={0}/>
                </div>
                )}
            </div>

            <div className="containerUtamaGambarEditValidateProductGdrive">
                { isPending ? (<div> Loading... </div>) : (
                <div className="containerGDrivegambarEditValidateProduct">
                    Link Gdrive Lama:
                    <div className="EditValidateProductLinkGdrive"> {OldLinkGDvalidasi} </div>
                </div>
                )}
            </div>
            </div>
        </div>
            <form className="formValidate" 
            onSubmit={handleSubmit(onSubmit)}
            >
            <div className="judulForm">Form validasi barang</div>
            {/* <div className="containerInput" style={{ display: "none" }}>
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
            </div> */}
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
              <label htmlFor="gambarprodukbpkb">Foto BTKB</label>
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
              <label htmlFor="linkgdvalidasi">Link Gdrive</label>
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
                      /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)(?:\/.*)?$/,
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

            <button>Submit Validation</button>
          </form>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default EditValidateProduct;
