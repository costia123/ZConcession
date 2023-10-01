//r
import axios from "axios";
import { api_link } from "configlink";
import { strapi } from "redux/types";

export const getCars = () => (dispatch) => {
  axios.get(`${api_link}cars?populate=*`).then((res) => {
    dispatch(carouselSetPage(12, res.data.data));
    dispatch(carouselIndex(12, 1));
    dispatch(setCarousel(res.data.data, 0, 11));
    dispatch(CurentCars(res.data.data));
    dispatch({
      type: strapi.GET_CARS,
      payload: res.data.data,
    });
  });
};
export const getPerson = () => (dispatch) => {
  console.log("first");
  axios.get(`${api_link}employes?populate=*`).then((res) => {
    console.log("contact", res);
    dispatch({
      type: strapi.GET_PERSON,
      payload: res.data.data,
    });
  });
};
export const getPromotion = () => (dispatch) => {
  console.log("first");
  axios
    .get(`${api_link}promotions?populate[0]=car&populate[1]=car.photo`)
    .then((res) => {
      console.log("promo", res);
      dispatch({
        type: strapi.GET_PROMOTION,
        payload: res.data.data,
      });
    });
};

export const getCategories = () => (dispatch) => {
  axios.get(`${api_link}categories`).then((res) => {
    dispatch({
      type: strapi.GET_CAT,
      payload: res.data.data,
    });
  });
};

export const carouselSetPage = (carsPerPage, cars) => (dispatch) => {
  const CarouselPage = Math.ceil(cars.length / carsPerPage);
  dispatch({
    type: strapi.SET_PAGES,
    payload: CarouselPage,
  });
};

export const carouselIndex = (carsPerPage, currentPage) => (dispatch) => {
  const indexOfLastCars = currentPage * carsPerPage;
  const indexOfFirstCars = indexOfLastCars - carsPerPage;
  dispatch({
    type: strapi.SET_INDEX,
    payload: {
      indexOfLastCars: indexOfLastCars,
      indexOfFirstCars: indexOfFirstCars,
    },
  });
};

export const carouselCurrentPage = (page) => (dispatch) => {
  dispatch({
    type: strapi.SET_CURRENT_PAGE,
    payload: page,
  });
};

export const setCarousel =
  (cars, indexOfLastCars, indexOfFirstCars) => (dispatch) => {
    console.log("carsss", cars);
    let carousel = cars.slice(indexOfFirstCars, indexOfLastCars);
    if (carousel.length > 0) {
      dispatch({
        type: strapi.SET_CAROUSEL,
        payload: carousel,
      });
    }
  };

export const setNewPage = (page, cars, carsPerPage) => (dispatch) => {
  dispatch(carouselIndex(carsPerPage, page));
  dispatch(carouselCurrentPage(page));
  dispatch(
    setCarousel(cars, page * carsPerPage, page * carsPerPage - carsPerPage)
  );
};
export const CurentCars = (cars) => (dispatch) => {
  dispatch({
    type: strapi.SET_SETCURRCARS,
    payload: cars,
  });
};
export const setCarouselWithOption =
  (cars, indexOfLastCars, indexOfFirstCars, cat) => (dispatch) => {
    console.log(cars, indexOfLastCars, indexOfFirstCars, cat);
    let arr = [];
    cars.map((itm, index) => {
      if (itm.attributes.categorie.data.attributes.Type === cat) {
        arr.push(itm);
      }
    });
    dispatch(carouselCurrentPage(1));

    const CarouselPage = Math.ceil(arr.length / 12);
    dispatch(CurentCars(arr));
    dispatch({
      type: strapi.SET_PAGES,
      payload: CarouselPage,
    });

    dispatch(setCarousel(arr, 12, 0));
  };

export const setCarouselWithOptionPlace =
  (cars, indexOfLastCars, indexOfFirstCars, place) => (dispatch) => {
    console.log(indexOfLastCars, indexOfFirstCars, place);
    let arr = [];
    cars.map((itm, index) => {
      if (itm.attributes.Places == place) {
        arr.push(itm);
      }
    });
    dispatch(carouselCurrentPage(1));

    const CarouselPage = Math.ceil(arr.length / 12);
    dispatch(CurentCars(arr));
    dispatch({
      type: strapi.SET_PAGES,
      payload: CarouselPage,
    });

    dispatch(setCarousel(arr, 12, 0));
  };
export const setCarouselWithFilters =
  (cars, indexOfLastCars, indexOfFirstCars, filters) => (dispatch) => {
    console.log(indexOfLastCars, indexOfFirstCars, filters);

    // Filtrez les éléments en fonction des critères sélectionnés
    let filteredCars = cars.filter((itm) => {
      const {
        Places,
        Roues,
        Type,
        categorie,
        decapotable,
        hydraulique,
      } = itm.attributes;

      if (
        (filters.Places === "default" || Places === filters.Places) &&
        (filters.Roues === "default" || Roues === filters.Roues) &&
        (filters.Type === "default" || Type === filters.Type) &&
        (filters.categorie === "default" || categorie.data.attributes.Type === filters.categorie) &&
        (filters.decapotable === false || decapotable === filters.decapotable) &&
        (filters.hydraulique === false || hydraulique === filters.hydraulique)
      ) {
        console.log("true")
        return true;
      }

      return false;
    });
    console.log("Cfilter", filteredCars)
    dispatch(carouselCurrentPage(1));

    const CarouselPage = Math.ceil(filteredCars.length / 12);
    dispatch(CurentCars(filteredCars));
    dispatch({
      type: strapi.SET_PAGES,
      payload: CarouselPage,
    });

    dispatch(setCarousel(filteredCars, 12, 0));
  };
