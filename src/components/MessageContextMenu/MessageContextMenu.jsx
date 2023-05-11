import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

import FormButton from '../UI/FormButton/FormButton'

import styles from './MessageContextMenu.module.scss'

const MessageContextMenu = ({ onClickDeleteMessage, onClickEditMessage }) => {
  return (
    <>
      <div className={styles.container}>
        <FormButton
          className={styles['action-message']}
          onClick={onClickDeleteMessage}
        >
          <DeleteIcon mr={'2px'} /> Удалить сообщение
        </FormButton>
        <FormButton
          className={styles['action-message']}
          onClick={onClickEditMessage}
        >
          <EditIcon mr={'2px'} /> Редактировать сообщение
        </FormButton>
      </div>
    </>
  )
}

export default MessageContextMenu
