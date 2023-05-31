import PropTypes from 'prop-types'
import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

import FormButton from '../FormButton/FormButton'

import styles from './ModalItem.module.scss'

const ModalItem = props => {
  const { isOpen, onClose, onClickRemove, onClickClose } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background={'#1c1d22'}>
        <ModalHeader textAlign={'center'} color={'#fff'}>
          Хотите удалить чат?
        </ModalHeader>
        <ModalCloseButton color={'#fff'} />
        <ModalFooter display={'flex'} justifyContent={'center'}>
          <Box className={styles['delete']} onClick={onClickRemove}>
            Да
          </Box>

          <FormButton colorScheme='blue' ml={3} onClick={onClickClose}>
            Нет
          </FormButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

ModalItem.prototype = {
  isOpen: PropTypes.func,
  onClose: PropTypes.func,
  onClickRemove: PropTypes.func,
  onClickClose: PropTypes.func,
}

export default ModalItem
