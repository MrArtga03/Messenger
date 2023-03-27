import styles from "./ChatPage.module.scss"
import ChatRoom from "../../components/ChatRoom/ChatRoom"

const ChatPage = () => {
  return (
    <section className={styles['chat']}>
      <ChatRoom/>
    </section>
  )
}

export default ChatPage
