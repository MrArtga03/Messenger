import { createRef, useCallback, useEffect, useRef, useState} from "react"
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

  const scrollRef = useRef(null)
  const inputRef = createRef()

  // Переменные состояния
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [count, setCount] = useState(0)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)

  // Отправка сообщения по кнопке
  const onClickSendMessage = useCallback((e) => {
    const diapason = /[0-9A-Za-zА-Яа-я]/
    e.preventDefault()

    if (message === '' && !diapason.test(message)) {
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

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    })
    setMessage('')
  }, [message, count, time])

  const onKeySendMessage = (e) => {
    if(e.ctrlKey && e.keyCode === 13) {
      const diapason = /[0-9A-Za-zА-Яа-я]/
      e.preventDefault()
  
      if (message === '' && !diapason.test(message)) {
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
  
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
      setMessage('')
    }
  }

  const getCaretPosition = (editableDiv) => {
    let caretPos = 0
    let sel
    let range
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode === editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } 
    else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      
      if (range.parentElement() === editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
  
    return caretPos;
  }

  // Добавление эмодзи в сообщение
  const onClickEmojiPicker = (e) => {
    setMessage(prev => {
      return prev.slice(0, caretPosition) + e.native + prev.slice(caretPosition);
    })
  }

  const handleBlur = (e) => {
    setMessage(e.currentTarget.textContent)
    setCaretPosition(getCaretPosition(e.currentTarget))
  }

  const handleEnterPress = e => {
    if (e.key === 'Enter') {
      const content = e.currentTarget.textContent

      console.log(caretPosition)

      setMessage(content.slice(0, caretPosition) + '\n' + content.slice(caretPosition))
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
            contentEditable
            onKeyDown={handleEnterPress}
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