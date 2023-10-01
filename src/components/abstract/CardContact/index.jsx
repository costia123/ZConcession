import React from "react";
import styles from "components/abstract/CardContact/styles.module.css";
import Skeleton from "@mui/material/Skeleton";
import { api_img } from "configlink";
function CardContact(props) {
  const { Title, logo, noMarge, Name, Number, index } = props;
  return (
    <>
      <div className={noMarge ? styles.mainBox2 : styles.mainBox} index={index}>
        <div className={styles.logoWChart}>
          {logo ? (
            <img src={`${api_img}${logo}`} className={styles.logo} />
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )}
        </div>
        <div className={styles.txtdiv}>
          {Name ? (
            <h4>{Name}</h4>
          ) : (
            <Skeleton variant="rectangular" width={150} height={20} />
          )}
          {Title ? (
            <h4>{Title}</h4>
          ) : (
            <Skeleton variant="rectangular" width={150} height={20} />
          )}
          {Number ? (
            <h4>{Number}</h4>
          ) : (
            <Skeleton variant="rectangular" width={100} height={20} />
          )}
        </div>
      </div>
    </>
  );
}
export default CardContact;
