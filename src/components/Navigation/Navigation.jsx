import React from "react"
import { Link } from "react-router-dom"

import styles from "./Navigation.module.scss"

const Navigation = () => {
  return (
    <section className={styles.Navigation}>
      <div className={styles.Navigation__Content}>
        <h1 className={styles.Navigation__Content__text_margin}>Messanger</h1>
      </div>
      <nav className={styles.Navigation__nav}>
        <ul className={styles.Navigation__ul}>
          <span className={styles.Navigation__span}>
            <Link to="/" className={styles.Navigation__link}>
              Home
            </Link>
            <Link to="/organizations" className={styles.Navigation__link}>
              Organizations
            </Link>
            <Link to="/menu" className={styles.Navigation__link}>
              Menu
            </Link>
          </span>
        </ul>
      </nav>
    </section>
  )
}

export default Navigation
