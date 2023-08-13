import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./navbar";
import Image from "next/image";
import axios from "axios";
import { faEnvelope, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import Contact from "./contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IDetailPostProps {}

const DetailPost: React.FunctionComponent<IDetailPostProps> = (props) => {
  const router = useRouter();
  const [product, setProduct] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState<any | null>(null);
  const [isUserId, setIsUserId] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const { productId } = router.query;
  const [statusSold, setStatusSold] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/products/${productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data.product);
        setUser(res.data.user);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setIsUserId(res.data.user.id);
        setIsPending(true);
        setStatus(res.data.product.validation_status);
        setStatusSold(res.data.product.status);
        console.log(res.data)

        {
          isPending &&
            axios
              .get(`http://localhost:8001/address/user/${isUserId}`, {
                withCredentials: true,
              })
              .then((res) => {
                setAddress(res.data.message.address);
                setCity(res.data.message.city);
                setIsLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
        }
      })
      .catch((err) => console.log(err));
  }, [productId, isPending, isUserId]);

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
                  {product.type}:
                </div>
                <div className="textContainerMapItemDetail2">
                  {product.name}
                </div>
                <h3 className="textContainerMapItemDetail">{`Rp ${product.price.toLocaleString(
                  "id-ID"
                )}`}</h3>
                {status ? (
                  <div className="isVerified"> verified </div>
                ) : (
                  <div className="notVerifed"> not verified </div>
                )}
                { !statusSold ? null : (
                  <div className="containerProductSoldDetail">
                    {" "}
                    <div className="productSoldDetail">Product Sold</div>
                  </div>
                )}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
          {user === null && <div>Loading....</div>}
          {user !== null && (
            <div className="containerHalamanContact">
              <div className="containerIcon">
                <FontAwesomeIcon
                  className="iconDetailPost"
                  icon={faCircleUser}
                />
                {username !== "" ? (
                  <div> {username} </div>
                ) : (
                  <div>Undefined</div>
                )}
              </div>
              <div className="containerIcon">
                <FontAwesomeIcon className="iconDetailPost" icon={faEnvelope} />
                {email !== "" ? <div> {email} </div> : <div>Undefined</div>}
              </div>
              <div className="containerIcon">
                <FontAwesomeIcon className="iconDetailPost" icon={faWhatsapp} />
                {phone !== "" ? <div> {phone} </div> : <div>Undefined</div>}
              </div>
              <div className="containerIcon">
                <FontAwesomeIcon
                  className="iconDetailPost"
                  icon={faLocationDot}
                />
                {address !== "" ? (
                  <div>
                    {" "}
                    {address}, {city}{" "}
                  </div>
                ) : (
                  <div>Undefined</div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="contentKanan">
          <p>Deskripsi</p>
          <hr className="hrDetail" />
          <p className="deskripsiDetailPost">
            {product && product.description}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default DetailPost;
