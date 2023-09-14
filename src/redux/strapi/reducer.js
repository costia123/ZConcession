import { strapi } from "redux/types";


const initialState = {
    strapiPage: null,
    strapiLogo: null,
    strapiImage: null,
    cars: null
};
 const reducer = (state = initialState, action) => {
    switch (action.type){
       case strapi.GET_CARS:
            return{
                ...state, 
                cars: action.payload
            }
      
        default:
			return state;
    }
};
export default reducer;