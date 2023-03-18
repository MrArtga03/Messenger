import styles from "./ListUsers.module.scss"

const ListUsers = () => {
  return (
    <section className={styles.list_users}>
      <div className={styles['collection-chats']}>
        <div className={styles.title}>
          <span className={styles['title-chats']}>
              Messages
          </span>
        </div>
      </div>
    </section>
  )
}

export default ListUsers