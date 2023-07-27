import * as React from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { slide as Menu } from "react-burger-menu";

//local components
import Contact from "../cards/productCards/Contact";
import SideBar from "../cards/productCards/SideBar";
import Link from "next/link";

interface IcontactProps {}

const contact: React.FunctionComponent<IcontactProps> = (props) => {
  const Contacts = [
    {
      gambar: faUser,
      detail: "Nixon Gaming",
    },
    {
      gambar: faWhatsapp,
      detail: "+62 182936189236",
    },
    {
      gambar: faEnvelope,
      detail: "nixongaming@gmail.com",
    },
  ];

  return (
    <div className="container">
      <div className="containerHalamanContact">
        {Contacts.map((contact, index) => {
          return <Contact key={index} gambar={contact.gambar} detail={contact.detail} />;
        })}
      </div>
    </div>
  );
};

export default contact;
