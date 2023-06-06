import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard/src'
import { Box, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import {
  AttachmentIcon,
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons'

import FormButton from '../UI/FormButton/FormButton'
import ModalItem from '../UI/ModalItem/ModalItem'

import styles from './MessageContextMenu.module.scss'

const MessageContextMenu = props => {
  const {
    onClickDeleteMessage,
    onClickEditMessage,
    value,
    onCopy,
    onClickToast,
    onClickClose,
    onChangeClose,
    onClickPinMessage,
  } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box onChange={onChangeClose} className={styles.container}>
      <Box className={styles.wrapper}>
        <Box>
          <FormButton className={styles['action-message']} onClick={onOpen}>
            <Text className={styles['danger-zone']}>
              <DeleteIcon className={styles.button} /> Удалить
            </Text>
          </FormButton>

          <FormButton
            className={styles['action-message_none']}
            onClick={onOpen}
          >
            <Text className={styles['danger-zone']}>
              <DeleteIcon className={styles.button} />
            </Text>
          </FormButton>

          <ModalItem
            isOpen={isOpen}
            onClose={onClose}
            onClickRemove={onClickDeleteMessage}
            onClickClose={onClose}
          >
            Хотите удалить сообщение?
          </ModalItem>
        </Box>

        <FormButton
          className={styles['action-message']}
          onClick={onClickEditMessage}
        >
          <EditIcon className={styles.button} /> Редактировать
        </FormButton>

        <FormButton
          className={styles['action-message_none']}
          onClick={onClickEditMessage}
        >
          <EditIcon className={styles.button} />
        </FormButton>

        <CopyToClipboard onCopy={onCopy} text={value}>
          <Box>
            <FormButton
              onClick={onClickToast}
              className={styles['action-message']}
            >
              <CopyIcon className={styles.button} /> Копировать
            </FormButton>

            <FormButton
              onClick={onClickToast}
              className={styles['action-message_none']}
            >
              <CopyIcon className={styles.button} />
            </FormButton>
          </Box>
        </CopyToClipboard>

        <FormButton
          onClick={onClickPinMessage}
          className={styles['action-message']}
        >
          <AttachmentIcon className={styles.button} /> Закрепить
        </FormButton>

        <FormButton
          onClick={onClickPinMessage}
          className={styles['action-message_none']}
        >
          <AttachmentIcon className={styles.button} />
        </FormButton>

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

MessageContextMenu.propsTypes = {
  onClickDeleteMessage: PropTypes.func,
  onClickEditMessage: PropTypes.func,
  value: PropTypes.string,
  onCopy: PropTypes.func,
  onClickToast: PropTypes.func,
  onClickClose: PropTypes.func,
  onChangeClose: PropTypes.func,
  onClickPinMessage: PropTypes.func,
}

export default MessageContextMenu
