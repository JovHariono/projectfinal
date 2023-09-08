import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

import slblogo1 from "../../public/assets/jualkendaraan.png";
import slblogo2 from "../../public/assets/belikendaraan.png";
import benlogo1 from "../../public/assets/garansi.png";
import benlogo2 from "../../public/assets/testdrive.png";
import benlogo3 from "../../public/assets/pengecekan.png";
import benlogo4 from "../../public/assets/hargabersaing.png";
import Dashboard from "../cards/Dashboard";

import Item from "./item";
import Navbar from "./navbar";
import ItemMobil from "./itemMobil";
import ItemMotor from "./itemMotor";

const dashItems = [
  {
    id: 1,
    dashimage: benlogo1,
    deskripsi: "Garansi Mesin Kendaraan Selama 30 Hari ",
  },
  {
    id: 2,
    dashimage: benlogo2,
    deskripsi: "Dapat Melakukan Test Drive Sebelum Membeli",
  },
  {
    id: 3,
    dashimage: benlogo3,
    deskripsi: "Pengecekan Kondisi Kendaraan oleh Tim Star Autos",
  },
  {
    id: 4,
    dashimage: benlogo4,
    deskripsi: "Harga Jual dan Beli Sesuai dengan Harga Pasar",
  },
];

export default function Home() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(false);
  const [role, SetRole] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8001/auth/validate", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.user);
        setName(res.data.user.username);
        SetRole(res.data.user.role);
        setUser(true);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="container">
      <Navbar />

      <div className="container-card">
        <Link className="card-slb" href="/createpost">
          <div className="slb-image slb-1">
            <Image src={slblogo1} alt="slblogo1" />
          </div>
          <h2>Jual Kendaraan</h2>
        </Link>
        <Link className="card-slb" href="/listpagemobil">
          <div className="slb-image slb-2">
            <Image src={slblogo2} alt="slblogo2" />
          </div>
          <h2>Beli Kendaraan</h2>
        </Link>
      </div>

      <div className="benefit">
        <h2>Keunggulan Star Autos</h2>
      </div>

      <div className="benefit-container">
        {dashItems.map((dashBen) => {
          return (
            <Dashboard
              key={dashBen.id}
              dashimage={dashBen.dashimage}
              deskripsi={dashBen.deskripsi}
            />
          );
        })}
      </div>
      <div className="container-filter-harga">
        <h2 className="ListKendaraan">List Semua Kendaraan</h2>
      </div>
      <Item />
      <div className="container-filter-harga">
        <h2 className="ListKendaraan">List Mobil</h2>
      </div>
      <ItemMobil />
      <div className="container-filter-harga">
        <h2 className="ListKendaraan">List Motor</h2>
      </div>
      <ItemMotor />
      <div className="footer"></div>
    </div>
  );
}
