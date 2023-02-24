import styles from "./ChatPage.module.scss"
import ListUsers from "../../components/ListUsers/ListUsers"
import ChatRoom from "../../components/ChatRoom/ChatRoom"

const ChatPage = () => {
  return (
    <section className={styles.list_users}>
      <ListUsers/>
      <ChatRoom/>
    </section>
  )
}

export default ChatPage
