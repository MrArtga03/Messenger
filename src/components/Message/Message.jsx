import React, { memo } from "react"

import styles from "./Message.module.scss"

const Message = ({ message, isOwner, time }) => {
  return (
    <section className={isOwner === 0 ? styles['my-message-box'] : styles['opponent-message-box']}>
      <div className={styles.container}>
        <div className={styles.poligon}/>
          <div className={isOwner === 0 ? styles['my-box-context'] : styles['opponent-box-context']}>
            <span dangerouslySetInnerHTML={{ __html: message }} className={isOwner === 0 ? styles['my-context-message'] : styles['opponent-context-message']}>
            </span>
            <span className={isOwner === 0 ? styles['my-context-time'] : styles['opponent-context-time']}>
              {time}
            </span>
          </div>
      </div>
    </section>
  )
}

export default memo(Message)
