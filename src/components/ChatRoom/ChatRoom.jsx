import { createRef, useCallback, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import Message from '../Message/Message'
import Smile from '../../assets/svg/SmileButton.svg'
import SendMessageButton from '../../assets/svg/SendMessageButton.svg'
import { getCaretPosition } from '../../helper/getCaretPosition'
import { getTime } from '../../helper/getTime'
import { addMessage } from '../../store/chatSlice'

import styles from './ChatRoom.module.scss'

const ChatRoom = ({ title, description }) => {
  const time = getTime()
  //Рефы на DOM элементы
  const scrollRef = useRef(null)
  const inputRef = createRef()

  // Переменные состояния
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)
  const owner = Math.round(Math.random())

  const { id } = useParams()

  const dispatch = useDispatch()
  const chatsList = useSelector(state => state.chats.chatsList)
  const currentChat = chatsList.find(chat => chat.id === id)

  // Отправка сообщения по кнопке
  const handleClickSendMessage = useCallback(
    e => {
      const diapason = /[0-9A-Za-zА-Яа-я]|[\uD83C-\uDBFF\uDC00-\uDFFF]+/
      e.preventDefault()

      if (!message || !diapason.test(message)) {
        return
      }

      dispatch(addMessage({ chatId: id, owner, text: message, time }))

      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
      setMessage('')
    },
    [message, time],
  )

  const handleKeySendMessage = e => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleClickSendMessage(e)
    }
  }

  // Добавление эмодзи в сообщение
  const onClickEmojiPicker = e => {
    setMessage(prev => {
      return prev.slice(0, caretPosition) + e.native + prev.slice(caretPosition)
    })
  }

  const handleBlur = e => {
    setMessage(`${e.currentTarget.innerHTML}`)
    setCaretPosition(getCaretPosition(e.currentTarget))
  }

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
        <div className={styles['container-info']}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <form className={styles.form}>
          <div className={styles.messages} ref={scrollRef}>
            {currentChat &&
              currentChat.messages.map(message => (
                <Message
                  key={message.id}
                  isOwner={message.owner}
                  message={message.text}
                  time={message.time}
                />
              ))}
          </div>
        </form>

        <div
          className={styles['emoji-picker']}
          onMouseOut={() => setShowEmojiPicker(false)}
        >
          {showEmojiPicker && (
            <Picker data={data} onEmojiSelect={onClickEmojiPicker} />
          )}
        </div>
      </div>

      <div className={styles.input}>
        <form className={styles['form-input']}>
          <div
            style={{ cursor: 'pointer' }}
            onMouseOver={() => setShowEmojiPicker(true)}
          >
            <img src={Smile} alt='ERROR' />
          </div>

          <div
            value={message}
            ref={inputRef}
            onBlur={handleBlur}
            onKeyUp={handleKeySendMessage}
            className={styles['input-text']}
            placeholder={'Enter message...'}
            contentEditable={true}
            dangerouslySetInnerHTML={{ __html: message }}
          />

          <button
            className={styles['button-send']}
            onClick={handleClickSendMessage}
          >
            <img src={SendMessageButton} alt='ERROR' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoom
