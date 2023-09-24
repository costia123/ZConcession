import React from "react";
import styles from "./style.module.css";
import { api_img } from "configlink";
import { GiCarSeat, GiCarDoor, GiCarWheel } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { TbWeight, TbEngine } from "react-icons/tb";
import bookMark from "static/img/bookmark.png"
function Card(props) {
  const {
    image,
    price,
    name,
    tyre,
    place,
    doors,
    speed,
    weight,
    type,
    id,
    categorie,
  } = props;
  return (
    <>
      <div className={styles.cardBox} key={id}>
        <img src={`${api_img}${image}`} className={styles.img} />
        <div className={styles.cardText}>
          <div className={styles.cardBoxBackground}>
            <h4 className={styles.textAlignCenter}>{name}</h4>
          </div>
          <div className={styles.cardBoxBackground1}>
            <div>
              <p><TbEngine /> {type}</p>
              <p className={styles.MT}><IoSpeedometerOutline /> {speed}</p>
              <p className={styles.MT}><GiCarDoor /> {doors}</p>
            </div>
            <div>
              <p ><GiCarWheel /> {tyre}</p>
              <p className={styles.MT}><TbWeight />{weight}</p>
              <p className={styles.MT}><GiCarSeat /> {place}</p>
            </div>
            {/*  <p>{categorie}</p> */}
          </div>
          <div className={styles.priceContainCenter}>
              <div className={styles.priceBox}>${price}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;
