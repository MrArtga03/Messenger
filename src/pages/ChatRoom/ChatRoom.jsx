import { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import Message from '../../components/Message/Message'
import Smile from '../../assets/svg/SmileButton.svg'
import SendMessageButton from '../../assets/svg/SendMessageButton.svg'
import { getCaretPosition } from '../../helper/getCaretPosition'
import { getTime } from '../../helper/getTime'
import { addMessage, clickDelete } from '../../store/chatSlice'
import { clickDeleteMessage } from '../../store/chatSlice'

import styles from './ChatRoom.module.scss'
import FormButton from '../../components/UI/FormButton/FormButton'
import { DeleteIcon } from '@chakra-ui/icons'
import { noChatsUrl } from '../../constants/urls'

const ChatRoom = ({ title, description }) => {
  const time = getTime()
  //Рефы на DOM элементы
  const scrollRef = useRef(null)
  const inputRef = createRef()

  // Переменные состояния
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)
  const owner = Math.round(Math.random())

  const { id } = useParams()

  const dispatch = useDispatch()
  const chatsList = useSelector(state => state.chats.chatsList)
  const currentChat = chatsList.find(chat => chat.id === id)

  // Отправка сообщения по кнопке
  const handleSubmit = e => {
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
    inputRef.current.focus()
  }

  const handleKeyDown = e => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e)
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

  const handleInput = e => {
    setMessage(e.currentTarget.textContent)
    setCaretPosition(window.getSelection().focusOffset)
  }

  useEffect(() => {
    const selection = window.getSelection()
    selection.collapse(inputRef.current.firstChild, caretPosition)
    selection.setPosition(inputRef.current.firstChild, caretPosition)
  }, [message, caretPosition])

  const handleClickMessage = (e, messageId) => {
    e.preventDefault()
    if (e.button === 2) {
      setIsOpen(messageId)
    }
  }

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
        <div className={styles['container-info']}>
          <div className={styles.title}>{id}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <form className={styles.form}>
          <div className={styles.messages} ref={scrollRef}>
            {currentChat &&
              currentChat.messages.map(message => (
                <>
                  <div
                    className={styles['container-context-menu']}
                    key={message.id}
                  >
                    <Message
                      isOwner={message.owner}
                      message={message.text.replace(/\n/g, '<br>')}
                      time={message.time}
                      onMouseDown={e => {
                        handleClickMessage(e, message.id)
                      }}
                      onContextMenu={e => {
                        e.preventDefault()
                      }}
                    />
                    {isOpen === message.id && (
                      <div
                        onMouseLeave={() => {
                          setIsOpen(false)
                        }}
                        onContextMenu={e => {
                          e.preventDefault()
                        }}
                        className={
                          message.owner === 0
                            ? styles['my-context-menu']
                            : styles['opponent-context-menu']
                        }
                      >
                        <FormButton
                          onClick={() => {
                            dispatch(clickDeleteMessage({ id: message.id }))
                          }}
                          className={styles['delete-message']}
                        >
                          <DeleteIcon mr={'2px'} /> Удалить сообщение
                        </FormButton>
                      </div>
                    )}
                  </div>
                </>
              ))}
          </div>
        </form>

        <div
          className={styles['emoji-picker']}
          onMouseOut={() => {
            setShowEmojiPicker(false)
          }}
        >
          {showEmojiPicker && (
            <Picker data={data} onEmojiSelect={onClickEmojiPicker} />
          )}
        </div>
      </div>

      <div className={styles.input}>
        <form className={styles['form-input']} onSubmit={handleSubmit}>
          <div
            className={styles['button-emoji']}
            onMouseOver={() => {
              setShowEmojiPicker(true)
            }}
          >
            <img src={Smile} alt='ERROR' />
          </div>

          <div
            ref={inputRef}
            onBlur={handleBlur}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            contentEditable={true}
            dangerouslySetInnerHTML={{ __html: message }}
            placeholder={'Enter message...'}
            className={styles['input-text']}
          />

          <button type='submit' className={styles['button-send']}>
            <img src={SendMessageButton} alt='ERROR' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoom
