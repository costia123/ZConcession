import React from "react";
import styles from "components/concrete/footer/style.module.css";
import LogoNoBG from "static/img/0Concession__6_-cricle_glow.png";
function Footer() {
  return (
    <>
      <div className={styles.mainBox}>
        <div className={styles.logobox}>
            <img src={LogoNoBG} className={styles.logo} />
{/*           <h3>0 Concession</h3> */}
        </div>
        <div>
          <a href="https://github.com/costia123" className={styles.Href}>
          <p>{`Developed by Oxy & Associate © 2023 - ${new Date().getFullYear()}`} </p>
          </a>
        </div>
      </div>
    </>
  );
}
export default Footer;
