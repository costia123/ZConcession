//r
import axios from "axios"
import { api_link } from "configlink"
import { strapi } from "redux/types"

export const getCars = () => dispatch => {
    axios.get(`${api_link}cars?populate=*`).then((res) => {
        console.log("get res")
        dispatch({
            type:strapi.GET_CARS,
            payload: res.data.data
        })
    })
}