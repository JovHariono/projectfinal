import * as React from "react";
import Navbar from "./navbar";
import {
  faCircleUser,
  faEnvelope,
  faLocationDot,
  faCircleCheck,
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
              })
              .catch((err) => console.log(err.message));
        }
        {
          isPending &&
            axios
              .get(`http://localhost:8001/address/${id}`, {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
                console.log(id)
              });
        }
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  return (
    <div className="container">
      <Navbar />
      <div className="headerUser">
        <div className="headerUserContent">
          <div className="detailUser">
            <FontAwesomeIcon className="faIndex" icon={faCircleUser} />
            <div className="userName"> {name} </div>
          </div>
          <Link className="verifSeller" href="/validasiseller">
            Be Verified User
          </Link>
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
                      Undefined
                    </div>
                    <div className="validasiSeller">
                      <Link href="/detailseller" className="validasiSellerLink">
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </Link>
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
                    <div>No Products Available</div>
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
                                  {product.name}{" "}
                                </div>
                                <div className="deskMobil">
                                  {" "}
                                  {product.brand}{" "}
                                </div>
                                <div className="deskMobil">
                                  {" "}
                                  {`Rp ${product.price.toLocaleString(
                                    "id-ID"
                                  )}`}{" "}
                                </div>
                              </div>
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
