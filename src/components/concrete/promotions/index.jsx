import React, { useEffect } from "react";
import styles from "components/concrete/contact/style.module.css";
import { getPromotion } from "redux/strapi/action";
import { useDispatch, useSelector } from "react-redux";
import CardContact from "components/abstract/CardContact";
import Card from "components/abstract/card";
import Slider from "react-slick";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CardCarousel from "components/abstract/cardCarousel";
function Promotion() {
  const strapi = useSelector((state) => state.strapi);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!strapi.promotion) {
      dispatch(getPromotion());
    }
  }, [strapi]);

  return (
    <>
      <div className={styles.mainBox}>
        <div className={styles.topFlex}>
          <h3>Nos promotions</h3>
        </div>
        <div className={styles.carousel_container}>
          <Carousel /* dynamicHeight={true} styles={{height: '460px'}} */ >
          {strapi.promotion ? strapi.promotion.map((item, index) => (
        <div key={index} className={styles.carousel}>
          <CardCarousel
            id={index}
            image={item.attributes.car.data.attributes.photo.data[0].attributes.url}
            price={item.attributes.car.data.attributes.price}
            name={item.attributes.car.data.attributes.Name}
            tyre={item.attributes.car.data.attributes.Roues}
            place={item.attributes.car.data.attributes.Places}
            doors={item.attributes.car.data.attributes.Portes}
            speed={item.attributes.car.data.attributes.speed}
            weight={item.attributes.car.data.attributes.Poids}
            type={item.attributes.car.data.attributes.Type}
            pricePromo={item.attributes.prix}
          />
        </div>
      )) : null}
          </Carousel>
        </div>
      </div>
    </>
  );
}
export default Promotion;
