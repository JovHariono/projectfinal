import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./navbar";
import Image from "next/image";
import axios from "axios";
import { faEnvelope, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import Contact from "./contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IDetailPostProps {}

const DetailPost: React.FunctionComponent<IDetailPostProps> = (props) => {
  const router = useRouter();
  const [product, setProduct] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<any | null>(null);
  const { productId } = router.query;

  useEffect(() => {
      axios
        .get(`http://localhost:8001/products/${productId}`)
        .then((res) => {
          setProduct(res.data.product);
          setUser(res.data.user)
          setUsername(res.data.user.username)
          setEmail(res.data.user.email)
          setPhone(res.data.user.phone)
          console.log(res.data)
        })
        .catch((err) => console.log(err));
  }, [productId]);
  
  return (
    <div className="container">
      <Navbar />

      <div className="contentDetailPost">
        <div className="contentKiri">
          <div className="containerItemDetail">
            {product ? (
              <div className="containerMapItemDetail">
                <div className="containerImageDetailPost">
                <Image
                  src={product.image}
                  alt={"unknown"}
                  width={0}
                  height={0}
                  className="imageDetailPost"
                />
                </div>
                <div className="textContainerMapItemDetail">
                  {product.name}
                </div>
                <h3 className="textContainerMapItemDetail">{product.price}</h3>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
          { user === null && <div>Loading....</div> }
          { user !== null && <div className="containerHalamanContact">
            <div className="containerIcon">
              <FontAwesomeIcon className="iconDetailPost" icon={faCircleUser} />
              { username !== "" ? (<div> { username } </div>) : (<div>Undefined</div>) }
            </div>
            <div className="containerIcon">
              <FontAwesomeIcon className="iconDetailPost" icon={faEnvelope} />
              { email !== "" ? (<div> { email } </div>) : (<div>Undefined</div>) }
            </div>
            <div className="containerIcon">
              <FontAwesomeIcon className="iconDetailPost" icon={faWhatsapp} />
              { phone !== "" ? (<div> { phone } </div>) : (<div>Undefined</div>) }
            </div>
          </div>}
        </div>
        <div className="contentKanan">
          <p>Deskripsi</p>
          <hr className="hrDetail"/>
          <p className="deskripsiDetailPost">
            { product && product.description }
          </p>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default DetailPost;
