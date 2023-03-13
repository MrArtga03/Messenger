import React, { memo } from "react"

import styles from "./Message.module.scss"

const Message = ({ message, isOwner, time }) => {
  return (
    <section className={isOwner === 0 ? styles['my-message-box'] : styles['opponent-message-box']}>
      <div className={isOwner === 0 ? styles['my-box-context'] : styles['opponent-box-context']}>
        <span className={isOwner === 0 ? styles['my-context-message'] : styles['opponent-context-message']}>
          {message}
        </span>
        <span className={isOwner === 0 ? styles['my-context-time'] : styles['opponent-context-time']}>
          {time}
        </span>
      </div>
    </section>
  )
}

export default memo(Message)
