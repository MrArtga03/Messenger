import { createRef, useCallback, useEffect, useState } from "react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

import Message from "../Message/Message"
import Smile from "../../assets/svg/SmileButton.svg" 
import SendMessageButton from "../../assets/svg/SendMessageButton.svg" 

import styles from './ChatRoom.module.scss'

const ChatRoom = () => {
  const inputRef = createRef()
  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}`
  const lastMessage = document.getElementById("box")

  // Переменные состояния
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [count, setCount] = useState(0)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [cursorPosition, setCursorPosition] = useState()
  
  // Отправка сообщения по кнопке
  const onClickSendMessage = useCallback((e) => {
    const diapozon = /[0-9A-Za-zА-Яа-я]/
    const textarea = document.getElementById("textArea")

    e.preventDefault()

    if (message === '' && diapozon.test(message)) {
      return 
    }

    setCount(() => count + 1)

    setMessages((prev) => [
      ...prev,
      {
        id: `message - ${count}`,
        time: time,
        text: message,
        owner: Math.round(Math.random(0, 1))
      },
    ])

    lastMessage.scrollIntoView({ block: "start", behavior: "smooth" })
    textarea.style.height = '40px'
    setMessage('')
  }, [message, time, lastMessage, count])

  // Появление Picker по нажатию на кнопку
  const onClickSetShowEmji = useCallback((e) => {
    e.preventDefault()
    setShowEmojiPicker(!showEmojiPicker)
  }, [showEmojiPicker])

  // Добавление эмодзи в сообщение
  const onClickEmojiPicker = (e) => {
    const ref = inputRef.current
    ref.focus()
    const start = message.substring(0, ref.selectionStart)
    const end = message.substring(ref.selectionStart)
    const text = start + e.native + end
    setMessage(text)
    inputRef.current.selectionEnd = start.length + e.native.length
    setCursorPosition(start.length + e.native.length)
  }

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition])

  // События при комбинациях клавиш
  const clickCombinations  = useCallback((e) => {
    const diapozon = /[0-9A-Za-zА-Яа-я]/
    const textarea = document.getElementById("textArea")

    // Событие по нажатию на Enter
    if(e.key === 'Enter' && diapozon.test(message) && e.ctrlKey !== true) {
      setCount(() => count + 1)
      setMessages((prev) => [
        ...prev,
        { 
          id: `message - ${count}`,
          time: time,
          text: message,
          owner: Math.round(Math.random(0, 1))
        },
      ])
      
      lastMessage.scrollIntoView({ block: "start", behavior: "smooth" })
      textarea.style.height = '40px'
      setMessage('')
    } 
    // Событие по нажатию на Ctrl + Enter
    else if (e.ctrlKey && e.key === 'Enter') {
      setMessage(message + '\n')
      textarea.style.cssText = 'height: auto; padding: 0';
      textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
      textarea.style.removeProperty("white-space")
    }
    // Событие по нажатию на Backspace
    else if (e.key === 'Backspace') {
      textarea.style.cssText = 'height: auto; padding: 0';
      textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
      textarea.style.removeProperty("white-space")
    }
    else if(e.key === 'Enter') {
      setMessage(message.replace('\n', ''))
      textarea.style.whiteSpace = "nowrap"
    }
    
  }, [message, time, lastMessage, count])
  
  return (
    <div className={styles.chat}>
      <div className={styles.container}>
        <form className={styles.form}>
          <div
            id="scroll"
            className={styles.messages}
          >
            {messages.map((message) => (
              <Message
                key={message.id}
                isOwner={message.owner}
                message={message.text}
                time={message.time}
              />
            ))}
            <div id="box" style={{ height: 0, width: 0 }}></div>
          </div>
        </form>
        
        <div className={styles.emojiPicker} onMouseOut={() => setShowEmojiPicker(false)}>
          {showEmojiPicker && (
            <Picker data={data} onEmojiSelect={onClickEmojiPicker}/>
          )}
        </div>
      </div>

      <div className={styles.input}>
        <form className={styles.form_input}>
          <button 
              className={styles.button_emoji}
              onClick={onClickSetShowEmji}
              onMouseOver={() => setShowEmojiPicker(true)}
            >
            <img src={Smile} alt="ERROR" />
          </button>

          <textarea
            className={styles.input_text}
            id="textArea"
            name="message"
            type="text"
            value={message}
            ref={inputRef}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={clickCombinations}
            wrap="hard"
            autoFocus
            rows="1"
            placeholder={"Enter message"}
          />

          <button
            className={styles.button_send}
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