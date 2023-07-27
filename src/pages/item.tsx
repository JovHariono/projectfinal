import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

//local inmage
import ImageMobil from "../../public/assets/mobil.png";

//local component
import ItemMobil from "../cards/productCards/ItemMobil";
import Link from "next/link";
import { Product } from "../types";
import DetailPost from "./detailpost";

interface IItemProps {}

const Item: React.FunctionComponent<IItemProps> = (props) => {
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
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container_Item_Mobil">
      {isPending && <div>Loading....</div>}
      {products && (
        <div>
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {products.length == 0 ? (
              <div></div>
            ) : (
              products.map((product, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="containerListMobil">
                      <div
                        className="containerIMobil"
                        onClick={() => {
                          router.push({
                            pathname: "/detailpost",
                            query: { productId: product.id },
                          });
                        }}
                      >
                        <div className="containerImageIMobil">
                          <Image
                            className="ImageIMobil"
                            src={product.image}
                            alt="Unknown"
                            width={0}
                            height={0}
                          />
                        </div>
                        <div className="deskMobil"> {product.name} </div>
                        <div className="deskMobil"> {product.brand} </div>
                        <div className="deskMobil">
                          {" "}
                          {`Rp ${product.price.toLocaleString("id-ID")}`}{" "}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Item;
