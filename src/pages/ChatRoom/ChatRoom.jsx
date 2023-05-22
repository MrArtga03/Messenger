import { createRef, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import Message from '../../components/Message/Message'
import Smile from '../../assets/svg/SmileButton.svg'
import SendMessageButton from '../../assets/svg/SendMessageButton.svg'
import { getCaretPosition } from '../../helper/getCaretPosition'
import { getTime } from '../../helper/getTime'
import { addMessage, clickEditMessage } from '../../store/chatSlice'
import { clickDeleteMessage } from '../../store/chatSlice'
import { CheckIcon } from '@chakra-ui/icons'
import NoMessages from '../NoMessages/NoMessages'
import MessageContextMenu from '../../components/MessageContextMenu/MessageContextMenu'
import EditMessage from '../../components/EditMessage/EditMessage'
import { useToast } from '@chakra-ui/react'

import styles from './ChatRoom.module.scss'

const ChatRoom = ({ description }) => {
  const time = getTime()
  //Рефы на DOM элементы
  const scrollRef = useRef(null)
  const inputRef = createRef()

  // Переменные состояния
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [caretPosition, setCaretPosition] = useState(0)
  const [editedMessage, setEditedMessage] = useState()
  const [editingMessage, setEditingMessage] = useState(null)
  const [editingMessageId, setEditingMessageId] = useState()
  const [, setCopied] = useState(false)
  const toast = useToast()
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
      setEditingMessage(false)
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
  }, [message, caretPosition, inputRef])

  const handleClickMessage = (e, messageId) => {
    e.preventDefault()
    if (e.detail === 1) {
      setIsOpen(messageId)
    }
  }

  const handleEditMessage = (e, messageText, messageId) => {
    e.preventDefault()
    setMessage(messageText)
    setEditedMessage(messageText)
    setCaretPosition(getCaretPosition(inputRef.current))
    setEditingMessageId(messageId)
    setEditingMessage(true)
  }

  const handleCopiedMessage = () => {
    setCopied(true)
    setIsOpen(false)
  }

  const handleCloseContext = e => {
    if (e.keyCode === 27) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleCloseContext)

    return () => {
      document.removeEventListener('keydown', handleCloseContext)
    }
  }, [isOpen])

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
        <div className={styles['container-info']}>
          <div className={styles.title}>{id}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <form className={styles.form}>
          <div className={styles.messages} ref={scrollRef}>
            {currentChat && currentChat.messages.length !== 0 ? (
              currentChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    isOpen === message.id
                      ? styles['container-context-menu']
                      : styles['container-context-menu_none']
                  }
                >
                  <Message
                    key={message.id}
                    isOwner={message.owner}
                    message={message.text.replace(/\n/g, '<br>')}
                    time={message.time}
                    onMouseDown={e => {
                      handleClickMessage(e, message.id)
                    }}
                    onContextMenu={e => {
                      e.preventDefault()
                    }}
                    editedText={
                      editedMessage === message.text
                        ? ''
                        : editingMessageId === message.id
                        ? ' Ред.'
                        : ''
                    }
                  />

                  {isOpen === message.id && (
                    <div className={styles['context-menu']}>
                      <MessageContextMenu
                        onClickDeleteMessage={() => {
                          dispatch(clickDeleteMessage({ id: message.id }))
                        }}
                        onClickEditMessage={e => {
                          handleEditMessage(e, message.text, message.id)
                        }}
                        value={message.text}
                        onCopy={handleCopiedMessage}
                        onClickToast={() =>
                          toast({
                            position: 'bottom-left',
                            title: 'Скопирован текст',
                            status: 'success',
                            duration: 2200,
                            isClosable: true,
                          })
                        }
                        onClickClose={() => {
                          setIsOpen(false)
                        }}
                        onChangeClose={handleCloseContext}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <NoMessages />
            )}
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
        {editingMessage && (
          <EditMessage
            onClick={() => {
              setEditingMessage(false)
              setMessage('')
            }}
            editedMessage={editedMessage}
          />
        )}
        <form
          className={
            !editingMessage ? styles['form-input'] : styles['form-input-edit']
          }
        >
          <div
            className={styles['button-emoji']}
            onClick={() => {
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

          {!editingMessage ? (
            <button onClick={handleSubmit} className={styles['button-send']}>
              <img src={SendMessageButton} alt='ERROR' />
            </button>
          ) : (
            <button
              onClick={e => {
                e.preventDefault()
                dispatch(
                  clickEditMessage({
                    chatId: id,
                    messageId: editingMessageId,
                    newText: message,
                  }),
                )
                setEditingMessage(false)
                setIsOpen(false)
                setMessage('')
              }}
              className={styles['button-edit']}
            >
              <CheckIcon />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default ChatRoom
