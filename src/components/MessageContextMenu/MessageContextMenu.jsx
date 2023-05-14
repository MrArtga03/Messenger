import { CopyToClipboard } from 'react-copy-to-clipboard/src'
import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

import FormButton from '../UI/FormButton/FormButton'

import styles from './MessageContextMenu.module.scss'

const MessageContextMenu = ({
  onClickDeleteMessage,
  onClickEditMessage,
  value,
  onCopy,
  onClickToast,
}) => {
  return (
    <>
      <div className={styles.container}>
        <FormButton
          className={styles['action-message']}
          onClick={onClickDeleteMessage}
        >
          <DeleteIcon className={styles.button} /> Удалить сообщение
        </FormButton>
        <FormButton
          className={styles['action-message']}
          onClick={onClickEditMessage}
        >
          <EditIcon className={styles.button} /> Редактировать сообщение
        </FormButton>

        <CopyToClipboard onCopy={onCopy} text={value}>
          <FormButton
            onClick={onClickToast}
            className={styles['action-message']}
          >
            <CopyIcon className={styles.button} /> Копировать сообщение
          </FormButton>
        </CopyToClipboard>
      </div>
    </>
  )
}

export default MessageContextMenu
