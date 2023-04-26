import styles from './ChatPage.module.scss'
import ChatRoom from '../ChatRoom/ChatRoom'

const ChatPage = () => {
  return (
    <section className={styles.chat}>
      <ChatRoom />
    </section>
  )
}

export default ChatPage
