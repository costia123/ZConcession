import React from "react";
import styles from "./style.module.css";
import LogoNoBG from "static/img/0Concession__6_-cricle_glow.png";
import LogoBG from "static/img/0Concession__6_-cricle_glow_bg.png";
import logoNo from "static/img/0Concession__6_-removebg-preview.png";
function Header() {
  return (
    <>
      <div className={styles.headerBox}>
        <a href="/">
          <div className={styles.logoBox}>
            <img src={LogoNoBG} className={styles.Logo} />
          {/*   <h2 className={styles.headerTitle}>0Concession</h2> */}
          </div>
        </a>
      </div>
    </>
  );
}
export default Header;
