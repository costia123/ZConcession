import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Header from "components/concrete/header";
import { useDispatch, useSelector } from "react-redux";
import {
  getCars,
  getCategories,
  setCarousel,
  setCarouselWithFilters,
  setCarouselWithOption,
  setCarouselWithOptionPlace,
  setNewPage,
} from "redux/strapi/action";
import Card from "components/abstract/card";
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import Footer from "components/concrete/footer";
import Contact from "components/concrete/contact";
import Promotion from "components/concrete/promotions";
import "MUIGlobalCss.css";

function Home(props) {
  const [cat, setCat] = useState("default");
  const [place, setPlace] = useState("default");
  const [roue, setRoue] = useState("default");
  const [type, setType] = useState("default");
  const [decapotable, setDecapotable] = useState(false);
  const [hydrolique, setHydrolique] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(null);
  const strapi = useSelector((state) => state.strapi);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!strapi.cars) {
      dispatch(getCars());
      dispatch(getCategories());
      const isMobile = window.innerWidth <= 768;
      setMobile(isMobile);
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
  const Filter = (event, typeS) => {
    if (typeS === "Place") {
      console.log(event.target.value);
      setPlace(event.target.value);
      dispatch(
        setCarouselWithFilters(
          strapi.cars,
          strapi.indexOfLastCars,
          strapi.indexOfFirstCars,
          {
            Places: event.target.value,
            Roues: roue,
            Type: type,
            categorie: cat,
            decapotable: decapotable,
            hydraulique: hydrolique,
          }
        )
      );
    } else if (typeS === "Catégorie") {
      setCat(event.target.value);
      dispatch(
        setCarouselWithFilters(
          strapi.cars,
          strapi.indexOfLastCars,
          strapi.indexOfFirstCars,
          {
            Places: place,
            Roues: roue,
            Type: type,
            categorie: event.target.value,
            decapotable: decapotable,
            hydraulique: hydrolique,
          }
        )
      );
    } else if (typeS === "roue") {
      setRoue(event.target.value);
      dispatch(
        setCarouselWithFilters(
          strapi.cars,
          strapi.indexOfLastCars,
          strapi.indexOfFirstCars,
          {
            Places: place,
            Roues: event.target.value,
            Type: type,
            categorie: cat,
            decapotable: decapotable,
            hydraulique: hydrolique,
          }
        )
      );
    } else if (typeS === "type") {
      setType(event.target.value);
      dispatch(
        setCarouselWithFilters(
          strapi.cars,
          strapi.indexOfLastCars,
          strapi.indexOfFirstCars,
          {
            Places: place,
            Roues: roue,
            Type: event.target.value,
            categorie: cat,
            decapotable: decapotable,
            hydraulique: hydrolique,
          }
        )
      );
    } else if (typeS === "décapotable") {
      console.log(event);
      setDecapotable(!decapotable);
      dispatch(
        setCarouselWithFilters(
          strapi.cars,
          strapi.indexOfLastCars,
          strapi.indexOfFirstCars,
          {
            Places: place,
            Roues: roue,
            Type: type,
            categorie: cat,
            decapotable: !decapotable,
            hydraulique: hydrolique,
          }
        )
      );
    } else if (typeS === "hydrolique") {
      setHydrolique(!hydrolique);
      dispatch(
        setCarouselWithFilters(
          strapi.cars,
          strapi.indexOfLastCars,
          strapi.indexOfFirstCars,
          {
            Places: place,
            Roues: roue,
            Type: type,
            categorie: cat,
            decapotable: decapotable,
            hydraulique: !hydrolique,
          }
        )
      );
    }
  };
  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <div className={styles.mainBox}>
      <Promotion />
        <div className={styles.optionsBox}></div>
        <div className={styles.optionsBox}>
          <TextField
            sx={
              mobile
                ? { width: "75%", marginBottom: "25px" }
                : { m: 1, minWidth: 80 }
            }
            id="outlined-Custom"
            label="Nom de la voiture"
            variant="outlined"
            onChange={onChangeSearch}
            InputLabelProps={{
              shrink: true,
              FormLabelClasses: {
                root: "formLabelRoot",
                focused: "formLabelFocused",
              },
            }}
            value={search}
          />
          <FormControl
            sx={
              mobile
                ? { width: "75%", marginBottom: "25px" }
                : { m: 1, minWidth: 80 }
            }
          >
            <InputLabel id="demo-simple-select-label">Catégories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cat}
              label="Catégories"
              onChange={(e) => {
                Filter(e, "Catégorie");
              }}
            >
              <MenuItem value={"default"}>Catégories</MenuItem>
              {strapi.cat
                ? strapi.cat.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.attributes.Type}>
                        {item.attributes.Name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl
            sx={
              mobile
                ? { width: "75%", marginBottom: "25px" }
                : { m: 1, minWidth: 80 }
            }
          >
            <InputLabel id="demo-simple-select-label">Places</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={place}
              label="Places"
              onChange={(e) => {
                Filter(e, "Place");
              }}
            >
              <MenuItem value={"default"}>Places</MenuItem>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"8"}>8</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={
              mobile
                ? { width: "75%", marginBottom: "25px" }
                : { m: 1, minWidth: 80 }
            }
          >
            <InputLabel id="demo-simple-select-label">roue</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={roue}
              label="roue"
              onChange={(e) => {
                Filter(e, "roue");
              }}
            >
              <MenuItem value={"default"}>Roues</MenuItem>
              <MenuItem value={"Traction"}>Traction</MenuItem>
              <MenuItem value={"Propulsion"}>Propulsion</MenuItem>
              <MenuItem value={"4x4"}>4x4</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={
              mobile
                ? { width: "75%", marginBottom: "25px" }
                : { m: 1, minWidth: 80 }
            }
          >
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={(e) => {
                Filter(e, "type");
              }}
            >
              <MenuItem value={"default"}>Type</MenuItem>
              <MenuItem value={"Thermique"}>Thermique</MenuItem>
              <MenuItem value={"Électrique"}>Électrique</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    Filter(e, "décapotable");
                  }}
                />
              }
              label="décapotable"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    Filter(e, "hydrolique");
                  }}
                />
              }
              label="hydrolique"
            />
          </FormGroup>
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
                          item.attributes.categorie.data
                        }
                      />
                    </div>
                  </>
                );
              })
            : strapi.CarouselCurrentCars && search
            ? strapi.cars.map((item, index) => {
                if (
                  item.attributes.Name.toLowerCase().includes(
                    search.toLowerCase()
                  )
                ) {
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
                            item.attributes.categorie.data
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
          {strapi.CarouselCurrentCars && !search ? (
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

        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default Home;
