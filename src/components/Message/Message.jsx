import React, { memo } from "react"

import styles from "./Message.module.scss"

const Message = ({ message, isOwner, time }) => {
  return (
    <section className={isOwner === 0 ? styles.my_message_box : styles.oponent_message_box}>
      <div className={isOwner === 0 ? styles.my_box_context : styles.oponent_box_context}>
        <span className={isOwner === 0 ? styles.my_context_message : styles.oponent_context_message}>
          {message}
        </span>
        <span className={isOwner === 0 ? styles.my_context_time : styles.oponent_context_time}>
          {time}
        </span>
      </div>
    </section>
  )
}

export default memo(Message)
