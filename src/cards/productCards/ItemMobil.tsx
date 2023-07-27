import { StaticImageData } from "next/image";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

interface IItemMobilProps {
  gambar: StaticImageData;
  judul: string;
  lokasi: string;
  harga: string;
}

const ItemMobil: React.FunctionComponent<IItemMobilProps> = (props) => {
  return (
    <Link href="/detailpost" className="containerListMobil">
    <div className="containerIMobil">
      <div className="containerImageIMobil">
        <Image src={props.gambar} alt="Unknown" />
      </div>
      <div className="subJudulIMobil">{props.judul}</div>
      <div className="lokasiIMobil">{props.lokasi}</div>
      <div className="hargaIMobil">{props.harga}</div>
    </div>
    </Link>
  );
};

export default ItemMobil;
