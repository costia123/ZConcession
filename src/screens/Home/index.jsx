import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Header from "components/concrete/header";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "redux/strapi/action";
import Card from "components/abstract/card";
import { Pagination } from "@mui/material";

function Home(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(12);
  const [currentCars, setCurrentCars] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const [indexOfLastCars, setIndexOfLastCars] = useState(currentPage * carsPerPage);
  const [indexOfFirstCars, setIndexOfFirstCars] = useState(indexOfLastCars - carsPerPage);
  const strapi = useSelector((state) => state.strapi);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!strapi.cars) {
      dispatch(getCars());
    }
    if (strapi.cars) {
      setIndexOfFirstCars(indexOfLastCars - carsPerPage)
      setIndexOfLastCars(currentPage * carsPerPage)
      setPageNumber(Math.ceil(strapi.cars.length / carsPerPage));
      setCurrentCars(strapi.cars.slice(indexOfFirstCars, indexOfLastCars));
    }
  }, [strapi]);

  const handleChange = (event, value) => {
    console.log(value)
    setCurrentPage(value);
    console.log("first0", currentPage)
    setIndexOfLastCars(currentPage * carsPerPage)
    console.log("first1", indexOfLastCars)
    setIndexOfFirstCars(indexOfLastCars - carsPerPage)
    console.log("first2", indexOfFirstCars)
    setCurrentCars(strapi.cars.slice(indexOfFirstCars, indexOfLastCars));
    console.log("first3", currentCars)
  };

  return (
    <>
      <Header />
      <div className={styles.mainBox}>
        <div className={styles.cars}>
      

          {currentCars
            ? currentCars.map((item, index) => {
                return (
                  <>
                    <div className={styles.cardRow}>
                      <Card
                        image={item.attributes.photo.data[0].attributes.url}
                        price={item.attributes.price}
                        name={item.attributes.Name}
                        tyre={item.attributes.Roues}
                        place={item.attributes.Places}
                        doors={item.attributes.Portes}
                        speed={item.attributes.speed}
                        weight={item.attributes.Poids}
                        type={item.attributes.type}
                      />
                    </div>
                  </>
                );
              })
            : null}
                {currentCars ? (
            <>
      <Pagination count={pageNumber} page={currentPage} onChange={handleChange}  />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Home;
