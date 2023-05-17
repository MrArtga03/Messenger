import React, { memo, useState } from 'react'
import { Avatar, Box, Wrap, WrapItem } from '@chakra-ui/react'

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

  const users = [
    { name: 'Artyom Derbin', image: '' },
    { name: 'Artyom Galkin', image: 'https://bit.ly/kent-c-dodds' },
    { name: 'Ivan Solovyov', image: 'https://bit.ly/ryan-florence' },
    { name: 'Kourin Daniel', image: 'https://bit.ly/sage-adebayo' },
  ]
  const [avatarIndex] = useState(() => Math.floor(Math.random() * users.length))
  return (
    <Box className={styles['container-image']}>
      <Wrap
        className={
          isOwner === 1
            ? styles['wrapper-image-opponent']
            : styles['wrapper-image']
        }
      >
        <WrapItem>
          <Avatar
            name={users[avatarIndex].name}
            src={users[avatarIndex].image}
          />
        </WrapItem>
      </Wrap>
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
    </Box>
  )
}

export default memo(Message)
