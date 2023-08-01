import * as React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

interface ISoldProductProps {}

const SoldProduct: React.FunctionComponent<ISoldProductProps> = (props) => {
  const router = useRouter();
  const { productId } = router.query;
  const [image, setImage] = useState<any | null>(null);
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [description, setDecription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/products/${productId}`)
      .then((res) => {
        setImage(res.data.product.image);
        setBrand(res.data.product.brand);
        setType(res.data.product.type);
        setDecription(res.data.product.description);
        setName(res.data.product.name);
        setPrice(res.data.product.price);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const soldProduct = () => {
    axios
      .put(
        `http://localhost:8001/products/sold/${productId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if(res.status === 200){
            alert("berhasil update produk ke  sold")
            router.push("/userdetail")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="containerUtamaSoldProduct">
        <div className="containerSoldProduct">
          {isPending && <div> Loading.... </div>}
          {!isPending && (
            <div>
              <div className="containerImageIMobil">
                <Image
                  className="ImageIMobil"
                  src={image}
                  alt="Unknown"
                  width={0}
                  height={0}
                />
              </div>
              <div>{type}</div>
              <div>{brand}</div>
              <div>{name}</div>
              <div>{`Rp ${Number(price).toLocaleString("id-ID")}`}</div>
              <button onClick={soldProduct}>Sold</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoldProduct;
