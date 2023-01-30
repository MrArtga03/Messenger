import React from "react";
import {Link} from 'react-router-dom';

import styles from "./OrganizationsPage.module.scss"

const OrganizationsPage = () => {
    return (
        <div className={styles.Organization}>
            <nav className={styles.Organization__nav}>
                <ul className={styles.Organization__ul}>
                    <span className={styles.Organizatio__span}>
                        <Link to="/chat" className={styles.Organization__link}>Chat</Link>
                    </span>
                </ul>
            </nav>
        </div>
    );
}

export default OrganizationsPage;