import * as React from "react";
import Navbar from "./navbar";
import {
  faCircleUser,
  faEnvelope,
  faLocationDot,
  faCircleCheck,
  faPen,
  faCartShopping,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";
import { useRouter } from "next/router";

interface IUserDetailProps {}

const UserDetail: React.FunctionComponent<IUserDetailProps> = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [isVerifiedAddress, setIsVerifiedAddress] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifPending, setIsVerifPending] = useState(true);
  const [isVerified, setIsVerified] = useState("");
  const [isUserVeridId, setIsUserVeridId] = useState("");
  const [isSold, setIsSold] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8001/auth/validate", {
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.user.username);
        setId(res.data.user.id);
        setEmail(res.data.user.email);
        setIsPending(true);
        {
          isPending &&
            axios
              .get(`http://localhost:8001/products/user/${id}`)
              .then((res) => {
                setProducts(res.data.products);
                setIsLoading(false);
                setIsSold(res.data.products.status);
              })
              .catch((err) => console.log(err.message));
        }
        {
          isPending &&
            axios
              .get(`http://localhost:8001/address/user/${id}`, {
                withCredentials: true,
              })
              .then((res) => {
                setAddress(res.data.message.address);
                setLocation(res.data.message.city);
                setIsVerifiedAddress(false);
              })
              .catch((err) => {
                console.log(err);
              });
        }
        {
          isPending &&
            axios
              .get(`http://localhost:8001/user-verifications/user/${id}`, {
                withCredentials: true,
              })
              .then((res) => {
                setIsVerified(res.data.status);
                setIsVerifPending(false);
                setIsUserVeridId(res.data.id)
              })
              .catch((err) => {
                console.log(err);
              });
        }
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const deleteUserVerif = () => {
    axios
      .delete(`http://localhost:8001/user-verifications/${isUserVeridId}`, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res.data)
        router.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container">
      <Navbar />
      <div className="headerUser">
        <div className="headerUserContent">
          <div className="detailUser">
            <FontAwesomeIcon className="faIndex" icon={faCircleUser} />
            <div className="userName"> {name} </div>
          </div>
          <div className="containerListValidate">
            <div className="listValidate">
              <Link className="linkListValidate" href="/listitemvalidate">
                Daftar Post User
              </Link>
            </div>
          </div>
          {/* {isVerified === "" && (
            <div
              className="verifSeller"
              // href="/validasiseller"
            >
              be verified user
            </div>
          )}
          {isVerified === "Requested" && (
            <div className="verifSellerRequested">request in process</div>
          )}
          {isVerified === "Validated" && (
            <div className="verifSellerValidated">seller verified</div>
          )} */}
        </div>
      </div>
      <div className="userContent">
        <div>
          <div className="detailSeller"></div>
          <div className="productSeller">
            <div className="detailsContainer">
              {isLoading && <div>Loading...</div>}
              {email !== null && (
                <div className="details">
                  <div>Details</div>
                  <hr />
                  <div className="containerDetailsContent">
                    <div className="detailsContent">
                      <FontAwesomeIcon className="faDetail" icon={faEnvelope} />
                      {email}
                    </div>
                    <div className="detailsContent2">
                      <FontAwesomeIcon
                        className="faDetail"
                        icon={faLocationDot}
                      />
                      {address !== "" && location !== "" ? (
                        <div>
                          {isVerifiedAddress && <div> Loading... </div>}
                          {!isVerifiedAddress && (
                            <div>
                              {" "}
                              {address}, {location}{" "}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          className="undefinedUserDetail"
                          href="/detailseller"
                        >
                          {" "}
                          Undefined{" "}
                        </Link>
                      )}
                    </div>
                    <div className="validasiSeller">
                      {isVerifPending && (
                        <Link
                          className="verifiedSellerIcon"
                          href="/validasiseller"
                        >
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </Link>
                      )}
                      {isVerified === "Requested" && (
                        <div className="verifiedSellerIconRequested">
                          {" "}
                          <FontAwesomeIcon icon={faCircleCheck} />{" "}
                        </div>
                      )}
                      {isVerified === "Validated" && (
                        <div className="verifiedSellerIconValidated">
                          {" "}
                          <FontAwesomeIcon icon={faCircleCheck} />{" "}
                        </div>
                      )}
                      {isVerified === "Declined" && (
                        <div className="verifiedSellerIcon">
                          <div
                            className="verifiedSellerIconDecline"
                            onClick={deleteUserVerif}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            <div className="textVerifiedSellerIcon">
                              Declined,<br/> click to create new req
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="productsSeller">
              {isLoading && <div>Loading...</div>}
              {!isLoading && (
                <div>
                  {products.length == 0 ? (
                    <div className="noProduct">No Products Posted</div>
                  ) : (
                    <div className="productsContentContainer">
                      {products.map((product, index) => {
                        return (
                          <div key={index} className="containerLinkBeliMobil">
                            <div
                              onClick={() => {
                                router.push({
                                  pathname: "detailpost",
                                  query: { productId: product.id },
                                });
                              }}
                              className="containerBeliMobil"
                            >
                              <div className="containerContentBeliMobil">
                                <div className="containerImageIMobil">
                                  <Image
                                    className="ImageIMobil"
                                    src={product.image}
                                    alt="Unknown"
                                    width={0}
                                    height={0}
                                  />
                                </div>
                                <div className="deskMobil">
                                  {" "}
                                  {product.type}:{" "}
                                </div>
                                <div className="deskMobil">
                                  {" "}
                                  {product.brand}{" "}
                                </div>
                                <div className="deskMobil">
                                  {" "}
                                  {product.name}{" "}
                                </div>
                                <div className="deskMobil">
                                  {" "}
                                  {`Rp ${product.price.toLocaleString(
                                    "id-ID"
                                  )}`}{" "}
                                </div>
                              </div>
                            </div>
                            <div>
                              {product.status ? (
                                <div className="containerProductSold">
                                  {" "}
                                  <div className="productSold">
                                    Product Sold
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="containerEditUserProduct">
                              <div
                                className="editUserProduct"
                                onClick={() => {
                                  router.push({
                                    pathname: "editdeleteproduct",
                                    query: { productId: product.id },
                                  });
                                }}
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </div>
                              {!product.status ? (
                                <div
                                  className="editUserProduct2"
                                  onClick={() => {
                                    router.push({
                                      pathname: "soldproduct",
                                      query: { productId: product.id },
                                    });
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCartShopping} />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UserDetail;
