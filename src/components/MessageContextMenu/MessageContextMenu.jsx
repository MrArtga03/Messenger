import { CopyToClipboard } from 'react-copy-to-clipboard/src'
import { CloseIcon, CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

import FormButton from '../UI/FormButton/FormButton'

import styles from './MessageContextMenu.module.scss'
import { Box, IconButton, Text } from '@chakra-ui/react'

const MessageContextMenu = ({
  onClickDeleteMessage,
  onClickEditMessage,
  value,
  onCopy,
  onClickToast,
  onClickClose,
  onChangeClose,
}) => {
  return (
    <Box onChange={onChangeClose} className={styles.container}>
      <Box className={styles.wrapper}>
        <FormButton
          className={styles['action-message']}
          onClick={onClickDeleteMessage}
        >
          <Text className={styles['danger-zone']}>
            <DeleteIcon className={styles.button} /> Удалить сообщение
          </Text>
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

        <IconButton
          className={styles['close-button']}
          onClick={onClickClose}
          icon={<CloseIcon />}
          aria-label={'Close context menu'}
        />
      </Box>
    </Box>
  )
}

export default MessageContextMenu
