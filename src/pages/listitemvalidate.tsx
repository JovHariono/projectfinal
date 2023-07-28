import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../types";

interface IListItemValidateProps {}

const ListItemValidate: React.FunctionComponent<IListItemValidateProps> = (
  props
) => {
  const [products, setProducts] = useState<any | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("")

  useEffect(() => {
    axios
        .get(`http://localhost:8001/auth/validate`, {
            withCredentials: true
        })
        .then((res) => {
            setId(res.data.user.id)
            setIsPending(true)

            { isPending && 
                axios
                .get(`http://localhost:8001/product-inspections/user/${id}`, {
                    withCredentials: true
                })
                .then((res) => {
                    setProducts(res.data.inspection)
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })}
        })
        .catch((err) => {
            console.log(err)
        })
  },[id])

  return (
    <div className="container">
      <Navbar />
      <div className="containerContentListItemValidate">
        { isPending && <div> Loading... </div> }
        {/* { !isPending && <div>
            { products.length == 0 ? (<div>No Products</div>) : ( 
                // products.map((product, index) => {
                //     return(
                //         <div key={index}>
                            
                //         </div>
                //     )
                // })
                <div></div>
             ) }
        </div> } */}
      </div>
    </div>
  );
};

export default ListItemValidate;
