import React from "react";
import {Link} from 'react-router-dom';

import styles from "./MenuPage.module.scss"

const MenuPage = () => {
    return (
        <nav>
            <ul>
                <span>
                    <Link to="/account">Account</Link>
                    <Link to="/setting">Settings</Link>
                </span>
            </ul>
        </nav>
    );
}

export default MenuPage;