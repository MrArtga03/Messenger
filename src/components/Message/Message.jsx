import React, { memo } from 'react'

import styles from './Message.module.scss'

const Message = ({
  message,
  isOwner,
  time,
  onMouseDown,
  onContextMenu,
  editedText,
}) => {
  const smilesRegex = /^[\uD83C-\uDBFF\uDC00-\uDFFF]+$/
  const containsOnlySmiles = message && smilesRegex.test(message.trim())

  return (
    <section
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
      className={
        isOwner === 0
          ? styles['my-message-box']
          : styles['opponent-message-box']
      }
    >
      <div className={styles.container}>
        <div className={!containsOnlySmiles && styles.polygon} />
        <div
          className={
            isOwner === 0
              ? containsOnlySmiles
                ? styles['my-box-context-smiles']
                : styles['my-box-context']
              : containsOnlySmiles
              ? styles['opponent-box-context-smiles']
              : styles['opponent-box-context']
          }
        >
          <span
            dangerouslySetInnerHTML={{ __html: message }}
            className={
              isOwner === 0
                ? styles['my-context-message']
                : styles['opponent-context-message']
            }
          ></span>
          <span
            className={
              isOwner === 0
                ? styles['my-context-time']
                : styles['opponent-context-time']
            }
          >
            {time}
            {editedText}
          </span>
        </div>
      </div>
    </section>
  )
}

export default memo(Message)
