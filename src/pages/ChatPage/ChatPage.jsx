import React from "react";
import { useState, useRef } from "react";

import styles from "./ChatPage.module.scss";

const ChatPage = () => {
    const [message, setMessage] = useState("");
    const inputRef = useRef(null);

    function handleChange(event) {
        event.preventDefault();
        setMessage(inputRef.current.value);
        inputRef.current.value = "";
    }

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
                <div className={styles.chat}>
                    <form className={styles.chat__form}>
                        <div>
                            <span>{message}</span>
                        </div>
                        <div></div>
                    </form>
                </div>

                <div className={styles.input}>
                    <form className={styles.input__form}>
                        <input 
                            placeholder={"Enter message"}
                            ref={inputRef}
                            id="message"
                            name="message"
                            type="text"
                            className={styles.input__form_input}
                        />
                        <button className={styles.input__form_button} onClick={handleChange}>Click me</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;