import React from "react";
import styles from "./style.module.css"
import { api_img } from "configlink";
function Card (props){
    const {image, price, name, tyre, place, doors, speed, weight, type } = props;
    return(
        <>
        <div className={styles.cardBox} >
        <img src={`${api_img}${image}`}  className={styles.img} />
        <div className={styles.cardText}>
        <p>{name}</p>
        <p>{type}</p>
        <p>{speed}</p>
        <p>{tyre}</p>
        <p>{doors}</p>
        <p>{place}</p>
        <p>{weight}</p>
        </div>
        </div>
        </>
    )
}
export default Card;