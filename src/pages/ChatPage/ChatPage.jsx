import React, { useState, useCallback } from 'react'

import Message from '../../components/Message/Message'
import EmojiPicker from 'emoji-picker-react'

import styles from './ChatPage.module.scss'

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleMessagesChange = e => {
    e.preventDefault()

    if (message === '') {
      return 0
    }

    setMessages(prev => [
      ...prev,
      {
        text: message,
        randomInt: Math.round(Math.random(1, 2)),
      },
    ])
    setMessage('')
  }
  const onClickEmojiPicker = useCallback(e => {
    setMessage(prevInput => prevInput + e.emoji)
    setShowEmojiPicker(false)
  }, [])

  return (
    <section className={styles.listUsers}>
      <div className={styles.listUsers__collectionChats}>
        <div className={styles.listUsers__collectionChats_title}>
          <span className={styles.listUsers__collectionChats_title__span}>
            <h2 className={styles.listUsers__collectionChats_title__span_margin}>Messages</h2>
          </span>
        </div>
      </div>

      <div className={styles.listUsers__chat}>
        <div className={styles.listUsers__chat__container}>
          <form className={styles.listUsers__chat__container__form}>
            <div className={styles.listUsers__chat__container__form__messages}>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  isOwner={message.owner === 0}
                  message={message.text}
                  random={message.randomInt}
                />
              ))}
            </div>
          </form>
          <div className={styles.listUsers__chat__container__emojiPicker}>
            {showEmojiPicker && (
              <EmojiPicker lazyLoadEmojis theme='dark' onEmojiClick={onClickEmojiPicker} />
            )}
          </div>
        </div>

        <div className={styles.listUsers__chat__input}>
          <button
            className={styles.listUsers__chat__input__emoji}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              color='white'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
              <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
            </svg>
          </button>

          <form className={styles.listUsers__chat__input__form}>
            <textarea
              placeholder={'Enter message'}
              value={message}
              onChange={e => setMessage(e.target.value)}
              wrap='hard'
              autoFocus
              id='message'
              name='message'
              type='text'
              autoComplete='off'
              className={styles.listUsers__chat__input__form__text}
            />

            <button
              className={styles.listUsers__chat__input__form__button}
              onClick={handleMessagesChange}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                viewBox='0 0 18 15'
              >
                <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z' />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ChatPage
