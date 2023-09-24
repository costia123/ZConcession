import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Header from "components/concrete/header";
import { useDispatch, useSelector } from "react-redux";
import {
  getCars,
  getCategories,
  setCarousel,
  setCarouselWithOption,
  setNewPage,
} from "redux/strapi/action";
import Card from "components/abstract/card";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

function Home(props) {
  const [cat, setCat] = useState("default");
  const strapi = useSelector((state) => state.strapi);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!strapi.cars) {
      dispatch(getCars());
      dispatch(getCategories());
    }
    if (strapi.cars && !strapi.CarouselCurrentCars) {
      dispatch(
        setCarousel(
          strapi.cars,
          strapi.CarouselIndexOfLast,
          strapi.CarouselIndexOfFirstCars
        )
      );
    }
  }, [strapi]);

  const handleChange = (event, value) => {
    console.log("here we are", value);
    dispatch(setNewPage(value, strapi.cars, strapi.carsPerPage));
  };

  const catChange = (event) => {
    setCat(event.target.value)
    if(event.target.value === "default"){
      dispatch(
        setCarousel(
          strapi.cars,
          strapi.CarouselIndexOfLast,
          strapi.CarouselIndexOfFirstCars
        )
      );
    }else{
      dispatch(setCarouselWithOption(
        strapi.cars,
        strapi.CarouselIndexOfLast,
        strapi.CarouselIndexOfFirstCars,
        event.target.value
      ))
    }
  }

  return (
    <>
      <Header />
      <div className={styles.mainBox}>
        <div className={styles.optionsBox}>
          <select placeholder="Catégories"
          value={cat}
          onChange={catChange}
          >
            <option value={"default"}>Catégories</option>
            {strapi.cat
              ? strapi.cat.map((item, index) => {
                  return (
                    <option key={index} value={item.attributes.Type}>
                      {item.attributes.Name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <div className={styles.cars}>
          {strapi.CarouselCurrentCars
            ? strapi.CarouselCurrentCars.map((item, index) => {
                return (
                  <>
                    <div className={styles.cardRow} key={index}>
                      <Card
                        key={index}
                        id={index}
                        image={item.attributes.photo.data[0].attributes.url}
                        price={item.attributes.price}
                        name={item.attributes.Name}
                        tyre={item.attributes.Roues}
                        place={item.attributes.Places}
                        doors={item.attributes.Portes}
                        speed={item.attributes.speed}
                        weight={item.attributes.Poids}
                        type={item.attributes.Type}
                        categorie={
                          item.attributes.categorie.data.attributes.Name
                        }
                      />
                    </div>
                  </>
                );
              })
            : null}
        </div>
        <div className={styles.pagination}>
          {strapi.CarouselCurrentCars ? (
            <>
              <Pagination
                count={strapi.CarouselPage}
                page={strapi.CarouselCurrentPage}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                size="large"
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Home;
