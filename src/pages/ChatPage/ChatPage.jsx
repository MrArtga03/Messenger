import React from "react";

import styles from "./ChatPage.module.scss"

const ChatPage = () => {
    return (
        <div className={styles.listUsers}>
            <div className={styles.listUsers__collectionChats}>
                <div className={styles.listUsers__title}>
                    <span className={styles.listUsers__title__span}>
                        <h2 className={styles.listUsers__title__span_margin}>Messages</h2>
                    </span>
                </div>
            </div>
            <div className={styles.listUsers__chat}>

            </div>
        </div>
    );
}

export default ChatPage;