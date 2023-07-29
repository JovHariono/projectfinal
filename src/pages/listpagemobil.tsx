import * as React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Product } from "../types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

interface IListPageMobilProps {}

const ListPageMobil: React.FunctionComponent<IListPageMobilProps> = (props) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8001/products")
      .then((res) => {
        setProducts(res.data.data);
        setIsPending(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // Function to filter products based on search query, brand, and price
  const filteredProducts = products.filter((product) => {
    const lowerCaseQuery = query.toLowerCase();
    const lowerCaseBrand = product.brand.toLowerCase();
    const lowerCaseName = product.name.toLowerCase();
    const lowerCasePrice = product.price.toString().toLowerCase();
    const queryNumber = parseFloat(lowerCaseQuery.replace(/[^\d.-]/g, ""));
    const lowerCaseType = product.type.toLowerCase();

    return (
      lowerCaseBrand.includes(lowerCaseQuery) ||
      lowerCaseName.includes(lowerCaseQuery) ||
      lowerCasePrice.includes(lowerCaseQuery) ||
      (product.price >= queryNumber && product.price <= queryNumber) ||
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
        <div className="judulListPageMobil"> List All Item </div>
        <div className="pageMobil">
          {filteredProducts.map((product, index) => (
            <div className="containerLinkBeliMobilHome" key={index}>
              <div
                onClick={() => {
                  router.push({
                    pathname: "/detailpost",
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
                  <div className="deskMobil">{product.type}:</div>
                  <div className="deskMobil">{product.brand}</div>
                  <div className="deskMobil">{product.name}</div>
                  <div className="deskMobil">{`Rp ${product.price.toLocaleString(
                    "id-ID"
                  )}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="footer"></div> */}
    </div>
  );
};

export default ListPageMobil;
