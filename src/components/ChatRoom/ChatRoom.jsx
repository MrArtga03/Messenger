import { createRef, useCallback, useRef, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

import Message from "../Message/Message"
import Smile from "../../assets/svg/SmileButton.svg"
import SendMessageButton from "../../assets/svg/SendMessageButton.svg" 
import { getCaretPosition } from '../../helper/getCaretPosition'
import { getTime } from '../../helper/getTime'
import { addMessage } from '../../store/messageSlice'
import { addLastMessageToChat } from '../../store/chatSlice'

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

  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.messages)

  const { id } = useParams()
  
  // Отправка сообщения по кнопке
  const onClickSendMessage = useCallback((e) => {
    const diapason = /[0-9A-Za-zА-Яа-я]/
    e.preventDefault()

    if (!message || !diapason.test(message)) {
      return
    }

    dispatch(addMessage({ message, time }));
    dispatch(addLastMessageToChat({ 
      lastMessage: message, 
      lastTime: time,
      id 
    }))

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    })
    setMessage('')
  }, [message, time])

  const onKeySendMessage = (e) => {
    if(e.ctrlKey && e.key === 'Enter') {
      const diapason = /[0-9A-Za-zА-Яа-я]/
      e.preventDefault()
  
      if (!message || !diapason.test(message)) {
        return
      }
  
      dispatch(addMessage({ message, time }));
      dispatch(addMessage({ message, time }));
      dispatch(addLastMessageToChat({ 
        lastMessage: message, 
        lastTime: time,
        id 
      }))

  
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
      setMessage('')
    }
  }

  // Добавление эмодзи в сообщение
  const onClickEmojiPicker = (e) => {
    setMessage(prev => {
      return prev.slice(0, caretPosition) + e.native + prev.slice(caretPosition);
    })
  }

  const handleBlur = (e) => {
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
          <div
            className={styles.messages}
            ref={scrollRef}
          >
            {messages.map((message) => (
              <Message
                  key={message.id}
                  isOwner={message.owner}
                  message={message.text}
                  time={message.time}
              />
            ))}
          </div>
        </form>

        <div className={styles['emoji-picker']} onMouseOut={() => setShowEmojiPicker(false)}>
          {showEmojiPicker && (
            <Picker 
              data={data} 
              onEmojiSelect={onClickEmojiPicker}
            />
          )}
        </div>
      </div>

      <div className={styles.input}>
        <form className={styles['form-input']}>
          <div
              style={{cursor: 'pointer'}}
              onMouseOver={() => setShowEmojiPicker(true)}
            >
            <img src={Smile} alt="ERROR" />
          </div>

          <div
            value={message}
            ref={inputRef}
            onBlur={handleBlur}
            onKeyUp={onKeySendMessage}
            className={styles['input-text']}
            placeholder={'Enter message...'}
            contentEditable={true}
            dangerouslySetInnerHTML={{__html: message}}
          />

          <button
            className={styles['button-send']}
            onClick={onClickSendMessage}
          >
            <img src={SendMessageButton} alt="ERROR" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoom