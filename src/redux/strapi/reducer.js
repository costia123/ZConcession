import { strapi } from "redux/types";

const initialState = {
  strapiPage: null,
  strapiLogo: null,
  strapiImage: null,
  CarouselPage: null,
  CarouselCurrentPage: 1,
  carsPerPage: 12,
  CarouselIndexOfLast: null,
  CarouselIndexOfFirstCars: null,
  CarouselCurrentCars: null,
  cars: null,
  cat: null,
  CurentCars: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case strapi.GET_CARS:
      return {
        ...state,
        cars: action.payload,
      };
      case strapi.SET_SETCURRCARS:
        return {
          ...state,
          CurentCars: action.payload,
        };
      case strapi.GET_CAT:
        return {
          ...state,
          cat: action.payload,
        };
    case strapi.SET_PAGES:
      return {
        ...state,
        CarouselPage: action.payload,
      };
      case strapi.SET_INDEX:
      return {
        ...state,
        CarouselIndexOfLast: action.payload.indexOfLastCars,
        CarouselIndexOfFirstCars: action.payload.indexOfFirstCars,
      };  
      case strapi.SET_CURRENT_PAGE:
      return {
        ...state,
        CarouselCurrentPage: action.payload,
      };  
      case strapi.SET_CAROUSEL:
        console.log('here', action.payload)
      return {
        ...state,
        CarouselCurrentCars: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
