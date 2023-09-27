import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Header from "components/concrete/header";
import { useDispatch, useSelector } from "react-redux";
import {
  getCars,
  getCategories,
  setCarousel,
  setCarouselWithOption,
  setCarouselWithOptionPlace,
  setNewPage,
} from "redux/strapi/action";
import Card from "components/abstract/card";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import Footer from "components/concrete/footer";

function Home(props) {
  const [cat, setCat] = useState("default");
  const [place, setPlace] = useState("default");
  const [search, setSearch] = useState(null);
  const strapi = useSelector((state) => state.strapi);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!strapi.cars) {
      dispatch(getCars());
      dispatch(getCategories());
    }
    if (strapi.CurentCars && !strapi.CarouselCurrentCars) {
      dispatch(
        setCarousel(
          strapi.CurentCars,
          strapi.CarouselIndexOfLast,
          strapi.CarouselIndexOfFirstCars
        )
      );
    }
  }, [strapi]);

  const handleChange = (event, value) => {
    dispatch(setNewPage(value, strapi.CurentCars, strapi.carsPerPage));
  };

  const catChange = (event) => {
    setCat(event.target.value);
    if (event.target.value === "default") {
      setPlace("default");
      dispatch(
        setCarousel(
          strapi.cars,
          strapi.CarouselIndexOfLast,
          strapi.CarouselIndexOfFirstCars
        )
      );
    } else {
      setPlace("default");
      dispatch(
        setCarouselWithOption(
          strapi.cars,
          strapi.CarouselIndexOfLast,
          strapi.CarouselIndexOfFirstCars,
          event.target.value
        )
      );
    }
  };
  const PlaceChange = (event) => {
    setPlace(Number(event.target.value));
    console.log("where i want", event.target.value);
    if (event.target.value === "default") {
      console.log("Default place");
      dispatch(
        setCarousel(
          strapi.cars,
          strapi.CarouselIndexOfLast,
          strapi.CarouselIndexOfFirstCars
        )
      );
    }
    if (cat === "default" && event.target.value != "default") {
      dispatch(
        setCarouselWithOptionPlace(
          strapi.cars,
          strapi.CarouselIndexOfLast,
          strapi.CarouselIndexOfFirstCars,
          Number(event.target.value)
        )
      );
    } else {
      dispatch(
        setCarouselWithOptionPlace(
          strapi.CurentCars,
          strapi.CarouselIndexOfLast,
          strapi.CarouselIndexOfFirstCars,
          Number(event.target.value)
        )
      );
    }
  };
  const onChangeSearch = (event) => {
    setSearch(event.target.value)
  };
  return (
    <>
      <Header />
      <div className={styles.mainBox}>
        <div className={styles.optionsBox}>
          <Alert variant="outlined" severity="warning">
            L'application est en cours de développement.
          </Alert>
        </div>
        <div className={styles.optionsBox}>
          <input 
          className={styles.imput}
          value={search}
          onChange={onChangeSearch}
          />
          <div className="selectdiv">
            <label>
              <select placeholder="Catégories" value={cat} onChange={catChange}>
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
            </label>
          </div>
          <div className="selectdiv">
            <label>
              <select
                placeholder="Catégories"
                value={place}
                onChange={PlaceChange}
              >
                <option value={"default"}>Places</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
              </select>
            </label>
          </div>
        </div>
        <div className={styles.cars}>
          {strapi.CarouselCurrentCars && !search
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
            : strapi.CarouselCurrentCars && search
            ? strapi.cars.map((item, index) => {
                if (item.attributes.Name.toLowerCase().includes(search.toLowerCase())) {
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
                }
              })
            : null}
        </div>
        <div className={styles.pagination}>
          {strapi.CarouselCurrentCars && !search? (
            <>
              <Pagination
                count={strapi.CarouselPage}
                page={strapi.CarouselCurrentPage}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                /*   size="large" */
              />
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
