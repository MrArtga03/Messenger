import { CopyToClipboard } from 'react-copy-to-clipboard/src'
import {
  Box,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {
  AttachmentIcon,
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons'

import FormButton from '../UI/FormButton/FormButton'

import styles from './MessageContextMenu.module.scss'

const MessageContextMenu = ({
  onClickDeleteMessage,
  onClickEditMessage,
  value,
  onCopy,
  onClickToast,
  onClickClose,
  onChangeClose,
  onClickPinMessage,
}) => {
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

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent background={'#1c1d22'}>
              <ModalHeader color={'#fff'}>
                Хотите удалить сообщение?
              </ModalHeader>
              <ModalCloseButton color={'#fff'} />
              <ModalFooter display={'flex'} justifyContent={'center'}>
                <FormButton
                  className={styles['action-message']}
                  onClick={onClickDeleteMessage}
                >
                  <Text className={styles['danger-zone']}>Да</Text>
                </FormButton>

                <FormButton colorScheme='blue' ml={3} onClick={onClose}>
                  Нет
                </FormButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <FormButton
          className={styles['action-message']}
          onClick={onClickEditMessage}
        >
          <EditIcon className={styles.button} /> Редактировать
        </FormButton>

        <CopyToClipboard onCopy={onCopy} text={value}>
          <FormButton
            onClick={onClickToast}
            className={styles['action-message']}
          >
            <CopyIcon className={styles.button} /> Копировать
          </FormButton>
        </CopyToClipboard>

        <FormButton
          onClick={onClickPinMessage}
          className={styles['action-message']}
        >
          <AttachmentIcon className={styles.button} /> Закрепить
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

export default MessageContextMenu
