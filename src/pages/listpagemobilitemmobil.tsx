import * as React from "react";
import Navbar from "./navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "../types";
import axios from "axios";
import Link from "next/link";
import router, { useRouter } from "next/router";

interface IListPageItemMobilProps {}

const ListPageItemMobil: React.FunctionComponent<IListPageItemMobilProps> = (
  props
) => {
    const [query, setQuery] = useState("")
    const [products, setProducts] = useState<Product[]>([])
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        axios
            .get("http://localhost:8001/products", {
                withCredentials: true
            })
            .then((res) => {            
                setProducts(res.data.data)
                setIsPending(false)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const filteredProducts = products.filter((product) => product.type === "Mobil" && product.validation_status === true)

    const filteredProductsMobil = filteredProducts.filter((filteredProduct) => {
        const lowerCaseQuery = query.toLowerCase();
        const lowerCaseBrand = filteredProduct.brand.toLowerCase();
        const lowerCaseName = filteredProduct.name.toLowerCase();
        const lowerCasePrice = filteredProduct.price.toString().toLowerCase();
        const queryNumber = parseFloat(lowerCaseQuery.replace(/[^\d.-]/g, ""));
        const lowerCaseType = filteredProduct.type.toLowerCase();
      
        return (
          lowerCaseBrand.includes(lowerCaseQuery) ||
          lowerCaseName.includes(lowerCaseQuery) ||
          lowerCasePrice.includes(lowerCaseQuery) ||
          (filteredProduct.price >= queryNumber && filteredProduct.price <= queryNumber) ||
          lowerCaseType.includes(lowerCaseQuery)
        );
      });
    

  return (
    <div className="container">
      <Navbar />
      <div className="contentListPageMobil">
        <div className="filter">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="inputListPage"
          />
        </div>
        <div className="judulListPageMobil"> List Item Mobil </div>
        <div className="pageMobil">
          {filteredProductsMobil.map((filteredProduct, index) => (
            <div className="containerLinkBeliMobilHome" key={index}>
              <div
                onClick={() => {
                  router.push({
                    pathname: "/detailpost",
                    query: { productId: filteredProduct.id },
                  });
                }}
                className="containerBeliMobil"
              >
                <div className="containerContentBeliMobil">
                  <div className="containerImageIMobil">
                    <Image
                      className="ImageIMobil"
                      src={filteredProduct.image}
                      alt="Unknown"
                      width={0}
                      height={0}
                    />
                  </div>
                  <div className="deskMobil">{filteredProduct.type}:</div>
                  <div className="deskMobil">{filteredProduct.brand}</div>
                  <div className="deskMobil">{filteredProduct.name}</div>
                  <div className="deskMobil">{`Rp ${filteredProduct.price.toLocaleString(
                    "id-ID"
                  )}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default ListPageItemMobil;
