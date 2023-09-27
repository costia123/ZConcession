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
    console.log("carsss", cars)
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
export const CurentCars = (cars) => dispatch => {
  dispatch({
    type: strapi.SET_SETCURRCARS,
    payload: cars
  })
}
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
    dispatch(CurentCars(arr))
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
    dispatch(CurentCars(arr))
    dispatch({
      type: strapi.SET_PAGES,
      payload: CarouselPage,
    });

    dispatch(setCarousel(arr, 12, 0));
  };

