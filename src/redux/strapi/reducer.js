

const initialState = {
    strapiPage: null,
    strapiLogo: null,
    strapiImage: null
};
 const reducer = (state = initialState, action) => {
    switch (action.type){
       /*  case strapi.GET_STRAPI_PAGE:
            return{
                ...state, 
                strapiPage: action.payload
            }
        case strapi.GET_STRAPI_IMAGE:
            return {
                ...state,
                strapiImage: action.payload
            } */
        default:
			return state;
    }
};
export default reducer;