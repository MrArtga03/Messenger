import { useState } from "react"
import { ContentState, EditorState, getDefaultKeyBinding, RichUtils } from "draft-js"
import { createEditorStateWithText } from '@draft-js-plugins/editor'
import createEmojiPlugin from '@draft-js-plugins/emoji';

import Message from "../Message/Message"
import TextArea from "../TextArea/TextArea"
import SendMessageButton from "../../assets/svg/SendMessageButton.svg" 

import styles from './ChatRoom.module.scss'
import '@draft-js-plugins/emoji/lib/plugin.css';

const ChatRoom = () => {
  const date = new Date()
  const time = `${date.getHours()}:${date.getMinutes()}`
  const lastMessage = document.querySelector("#box")

  // Переменные состояния
  const [messages, setMessages] = useState([])
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const emojiPlugin = createEmojiPlugin();
  const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

  const [count, setCount] = useState(0)
  const messageState = EditorState.push(editorState, ContentState.createFromText(""))

  console.log(editorState)

  // Отправка сообщения по кнопке
  const onClickSendMessage = (e) => {
    const diapozon = /[0-9A-Za-zА-Яа-я]/
    const message = editorState.getCurrentContent().getPlainText('\u0001')

    e.preventDefault()

    if (message === '' && !diapozon.test(message)) {
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
    setEditorState(messageState)
  }

  // const myKeyBindingFn = (e) => {
  //   if(e.keyCode === 13) {
  //     return 'Send-message'
  //   }

  //   return getDefaultKeyBinding(e)
  // }

  // const handleMessage = (command) => {
  //   if(!editorState) {
  //     return
  //   }
  //   if(command === 'Send-message') {
  //     const diapozon = /[0-9A-Za-zА-Яа-я]/
  //     const message = editorState.getCurrentContent().getPlainText('\u0001')

  //     // e.preventDefault()

  //     if (message === '' && !diapozon.test(message)) {
  //       return 
  //     }

  //     setCount(() => count + 1)

  //     setMessages((prev) => [
  //       ...prev, 
  //       {
  //         id: `message - ${count}`,
  //         time: time,
  //         text: message,
  //         owner: Math.round(Math.random(0, 1))
  //       },
  //     ])

  //     lastMessage.scrollIntoView({ block: "start", behavior: "smooth" })
  //     setEditorState(EditorState.createEmpty())
  //   }
  // }

  const isSoftNewlineEvent = (e) => {
    return (
      e.which === 13 && e.getModifierState('Shift')
    )
  }

  const handleReturn = (event) => {
    if(isSoftNewlineEvent(event)) {
      setEditorState(RichUtils.insertSoftNewline(editorState))
      console.log(1)
      return 'handled'
    }
    return 'not-handled'
  }

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
            <div id="box" style={{ height: 0, width: 0 }}/>
          </div>
        </form>
      </div>

      <div className={styles.input}>
        <form className={styles.form_input}>
          <EmojiSuggestions/>
          <EmojiSelect/>
          <TextArea 
            editorState={editorState}
            setEditorState={setEditorState}
            keyBindingFn={myKeyBindingFn}
            handleReturn={handleReturn}
            handleKeyCommand={handleMessage}
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