import React from "react"
import { Link } from "react-router-dom"

import styles from "./Navigation.module.scss"

const Navigation = () => {
  return (
    <section className={styles.navigation}>
      <div className={styles.title_container}>
        <span className={styles.title}>
          Messanger
        </span>
      </div>

      <nav className={styles.nav_container}>
        <ul className={styles.ul_container}>
            <Link to="/" className={styles.nav__link}>
              Home
            </Link>
            <Link to="/organizations" className={styles.nav__link}>
              Organizations
            </Link>
            <Link to="/menu" className={styles.nav__link}>
              Menu
            </Link>
        </ul>
      </nav>
    </section>
  )
}

export default Navigation
