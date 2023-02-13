import React, { memo, useState } from 'react'

import styles from './Message.module.scss'

const Message = ({ message, random }) => {
  const date = new Date()
  const [time, setTime] = useState(`${date.getHours()}:${date.getMinutes()}`)

  return (
    <>
      {random === 0 ? (
        <section className={styles.my_message__box}>
          <div className={styles.my_message__box_context}>
            <span className={styles.my_message__box_context_message}>{message}</span>
            <span className={styles.my_message__box_context_time}>{time}</span>
          </div>
        </section>
      ) : (
        <section className={styles.oponent_message__box}>
          <div className={styles.oponent_message__box_context}>
            <span className={styles.oponent_message__box_context_message}>{message}</span>
            <span className={styles.oponent_message__box_context_time}>{time}</span>
          </div>
        </section>
      )}
    </>
  )
}

export default memo(Message)
