import React, { useEffect } from "react";
import styles from "components/concrete/contact/style.module.css";
import { getPerson } from "redux/strapi/action";
import { useDispatch, useSelector } from "react-redux";
import CardContact from "components/abstract/CardContact";

function Contact() {
  const strapi = useSelector((state) => state.strapi);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!strapi.contact) {
      dispatch(getPerson());
    }
  }, [strapi]);
  return (
    <>
      <div className={styles.mainBox}>
        <div className={styles.topFlex}>
          <h3>Nos employées</h3>
        </div>
        <div className={styles.CardFlex}>
          {strapi.contact
            ? strapi.contact.map((itm, index) => {
                return (
                  <>
                    <CardContact
                      index={index}
                      Name={itm.attributes.Nom}
                      Title={itm.attributes.Role}
                      logo={itm.attributes.Photo.data.attributes.url}
                      Number={itm.attributes.Tel}
                    />
                  </>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
export default Contact;
