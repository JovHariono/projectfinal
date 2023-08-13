import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Validate } from "../types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IListItemValidateProps {}

const ListItemValidate: React.FunctionComponent<IListItemValidateProps> = (
  props
) => {
  const [products, setProducts] = useState<Validate[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://localhost:8001/auth/validate`, {
        withCredentials: true,
      })
      .then((res) => {
        setId(res.data.user.id);
        setIsPending(true);

        {
          isPending &&
            axios
              .get(`http://localhost:8001/product-inspections/user/${id}`, {
                withCredentials: true,
              })
              .then((res) => {
                setProducts(res.data.inspection);
                setIsLoading(false);
                console.log(res.data.inspection);
              })
              .catch((err) => {
                console.log(err);
              });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container">
      <Navbar />
      <div className="containerListItemValidate">
        <div className="textListItemValidate">Daftar Post User</div>
        {isLoading && <div> Loading... </div>}
        {!isLoading && (
          <div className="containerUtamaContentListItemValidate">
            {products == null ? (
              <div>No Products</div>
            ) : (
              products.map((product, index) => {
                return (
                  <div key={index} className="containerContentListItemValidate">
                    <div className="containerImageIMobil">
                      <Image
                        className="ImageIMobil"
                        src={product.image}
                        alt="Unknown"
                        width={0}
                        height={0}
                      />
                    </div>
                    <div className="containerDetailListItemValidate">
                      <div className="detailLIstItemValidate">
                        Nama Produk: {product.product_name}
                      </div>
                      <div className="detailLIstItemValidate">
                        Harga Produk:{" "}
                        {`Rp ${product.product_price.toLocaleString("id-ID")}`}
                      </div>
                      <div className="detailLIstItemValidateRequest">
                        validation Status: {product.inspection_status}
                      </div>
                      {product.inspection_status !== "Validated" && (
                        <div
                          onClick={() => {
                            router.push({
                              pathname: "/editvalidateproduct",
                              query: { inspectionId: product.inspection_id },
                            });
                          }}
                          className="editValidateProduct"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default ListItemValidate;
