import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";

interface IAdminProductVerificationDetailProps {}

const AdminProductVerificationDetail: React.FunctionComponent<
  IAdminProductVerificationDetailProps
> = (props) => {
  const router = useRouter();
  const { productId } = router.query;
  const [gambarprodukdepan, setGambarProdukDepan] = useState<any | null>(null);
  const [gambarprodukbelakang, setGambarProdukBelakang] = useState<any | null>(
    null
  );
  const [gambarprodukkiri, setGambarProdukKiri] = useState<any | null>(null);
  const [gambarprodukkanan, setGambarProdukKanan] = useState<any | null>(null);
  const [gambarprodukdalam, setGambarProdukDalam] = useState<any | null>(null);
  const [gambarprodukstnk, setGambarProdukStnk] = useState<any | null>(null);
  const [gambarprodukbpkb, setGambarProdukBpkb] = useState<any | null>(null);
  const [linkGDvalidasi, setLinkGDvalidasi] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/product-inspections/${productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setGambarProdukDepan(res.data.data.depan);
        setGambarProdukBelakang(res.data.data.belakang);
        setGambarProdukKiri(res.data.data.kiri);
        setGambarProdukKanan(res.data.data.kanan);
        setGambarProdukDalam(res.data.data.dalam);
        setGambarProdukStnk(res.data.data.stnk);
        setGambarProdukBpkb(res.data.data.bpkb);
        setLinkGDvalidasi(res.data.data.gdrive_url);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cancelSubmit = () => {
    axios
      .put(
        `http://localhost:8001/product-inspections/decline/${productId}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Decline Product Berhasil");
          router.push("/adminproductverification");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifySubmit = () => {
    axios
      .put(
        `http://localhost:8001/product-inspections/validate/${productId}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          alert("Verify Product Berhasil");
          router.push("/adminproductverification");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="containerAdminProductVerificationDetail">
        <div className="containerContentAdminProductVerificationDetail">
          {isPending && <div> Loading... </div>}
          {!isPending && (
            <div>
              <div className="containerDetailContentAdminUserVerificationDetail">
                Gambar Produk Depan:
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={gambarprodukdepan}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                Gambar Produk Belakang:
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={gambarprodukbelakang}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                Gambar Produk Kiri:
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={gambarprodukkiri}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                Gambar Produk Kanan:
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={gambarprodukkanan}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                Gambar Produk Dalam:
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={gambarprodukdalam}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                Gambar Surat Tanda Nomor Kendaraan(STNK):
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={gambarprodukstnk}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                Gambar Buku Pemilik Kendaraan Bermotor(BPKB):
                {/* <div className="containerImageIMobil"> */}
                <Image
                  className="ImageIVerif"
                  src={gambarprodukbpkb}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
                {/* </div> */}
              </div>

              <div className="containerDetailContentAdminUserVerificationDetail">
                G-Drive:
                <div className="containerlinkgdriveAdminProductVerificationDetail">
                { linkGDvalidasi }
                </div>
              </div>

              <div className="containerButtonDetailContentAdminUserVerification">
                <button onClick={cancelSubmit} className="cancelVerify">
                  {" "}
                  Decline Verify Product{" "}
                </button>
                <button onClick={verifySubmit}> Verify Product </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductVerificationDetail;
