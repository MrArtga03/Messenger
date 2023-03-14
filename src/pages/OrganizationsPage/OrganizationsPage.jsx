import React from "react";
import { Link } from "react-router-dom";

import styles from "./OrganizationsPage.module.scss";

const OrganizationsPage = () => {
  return (
    <section className={styles.organization}>
      <nav className={styles.nav_organization}>
        <ul className={styles.ul_organization}>
          <Link to='/chat' className={styles.organization_link}>
            Chat
          </Link>
        </ul>
      </nav>
    </section>
  );
};

export default OrganizationsPage;
