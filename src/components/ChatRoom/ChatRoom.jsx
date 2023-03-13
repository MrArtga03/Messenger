import {useEffect, useRef, useState} from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

import Message from "../Message/Message"
import Smile from "../../assets/svg/SmileButton.svg"
import SendMessageButton from "../../assets/svg/SendMessageButton.svg" 

import styles from './ChatRoom.module.scss'

const ChatRoom = () => {
  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}`
  const emojis = require('emojis-list')

  //Рефы на DOM-элементы
  const editorRef = useRef(null)
  const scrollRef = useRef(null)

  // Переменные состоянияее
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([])
  const [count, setCount] = useState(0)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  //Установка текста редактора в состояние
  const handleChangeValue = (content, delta, source, editor) => {
    const text = editor.getText()
    setValue(text)
  }

  // Отправка сообщения по кнопке
  const onClickSendMessage = (event) => {
    const diapason = /[0-9A-Za-zА-Яа-я]/
    event.preventDefault()

    if (value === '' && !diapason.test(value)) {
      return
    }

    setCount(() => count + 1)

    setMessages((prev) => [
      ...prev,
      {
        id: `message - ${count}`,
        time: time,
        text: value,
        owner: Math.round(Math.random(0, 1))
      },
    ])

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    })
    setValue('')
  }


  //Обработка событий клавиш
  const keysEvent = (event) => {
    if(event.keyCode === 16) {
      const diapason = /[0-9A-Za-zА-Яа-я]/
    
      if (value === '' && !diapason.test(value)) {
        return 
      }
  
      setCount(() => count + 1)
  
      setMessages((prev) => [
        ...prev, 
        {
          id: `message - ${count}`,
          time: time,
          text: value,
          owner: Math.round(Math.random(0, 1))
        },
      ])

      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
      setValue('')
    }
  }

  const clickEmoji = (event) => {
    event.preventDefault()
  }

  // Добавление эмодзи в сообщение
  const onClickEmojiPicker = (event) => {
    for (let i = 0; i < emojis.length; i++) {
      if(emojis[i] === event.native) {
        setValue(value + emojis[i].replace('\n', ''))
      }
    }
  }

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
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
          <button 
              onClick={clickEmoji}
              onMouseOver={() => setShowEmojiPicker(true)}
            >
            <img src={Smile} alt="ERROR" />
          </button>
          <ReactQuill 
            ref={editorRef} 
            onKeyDown={keysEvent}
            value={value} 
            onChange={handleChangeValue}
            placeholder={'Enter message...'}
            theme="snow" 
            className={styles['input-text']} 
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