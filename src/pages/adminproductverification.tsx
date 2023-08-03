import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProductValidate, UserValidate } from "../types";
import { useRouter } from "next/router";

interface IAdminProductVerificationProps {}

const AdminProductVerification: React.FunctionComponent<
  IAdminProductVerificationProps
> = (props) => {
  const [products, setProducts] = useState<ProductValidate[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8001/product-inspections", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.inspection)
        setProducts(res.data.inspection);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const productRequest = products.filter((product) => product.inspection_status === "Requested" );

  console.log(productRequest)

  return (
    <div className="container">
      <Navbar />
      <div className="containerAdminUserVerification">
        <div className="containerContentAdminUserVerification">
          { productRequest.map((product, index) => {
            return(
                <div key={index}
                className="containerContentAdminProductVerification"
                onClick={() => {
                    router.push({
                        pathname: '/adminproductverificationdetail',
                        query: { productId: product.id }
                    })
                }}
              >                
                <div> Product Name: { product.product_name }</div>
                <div> Status: { product.inspection_status }</div>
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  );
};

export default AdminProductVerification;
