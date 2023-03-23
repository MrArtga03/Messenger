import React from "react";
import CustomLink from "../../components/CustomLink/CustomLink";

import styles from "./MenuPage.module.scss";

const MenuPage = () => {
  return (
    <section>
      <nav>
        <ul>
          <span>
            <CustomLink to='/setting'>Settings</CustomLink>
          </span>
        </ul>
      </nav>
    </section>
  );
};

export default MenuPage;
