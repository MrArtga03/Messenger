import React from "react";
import CustomLink from "../../components/CustomLink/CustomLink";

import styles from "./OrganizationsPage.module.scss";

const OrganizationsPage = () => {
  return (
    <section className={styles.organization}>
      <nav className={styles['nav-organization']}>
        <ul className={styles['ul-organization']}>
          <CustomLink to='/chat' className={styles['organization-link']}>
            Chat
          </CustomLink>
        </ul>
      </nav>
    </section>
  );
};

export default OrganizationsPage;
