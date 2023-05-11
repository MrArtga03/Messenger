import { Box, IconButton } from '@chakra-ui/react'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'

import styles from './EditMessage.module.scss'

const EditMessage = ({ onClick, editedMessage }) => {
  return (
    <div className={styles['edit-message-container']}>
      <Box className={styles['edit-message']}>
        <Box className={styles['edit-icon']}>
          <EditIcon />
        </Box>
        <Box className={styles['edit-info']}>
          <span className={styles['title-edit-message']}>Редактирование</span>
          <span className={styles['edit-message']}>{editedMessage}</span>
        </Box>
      </Box>

      <Box className={styles['close-button-container']}>
        <IconButton
          onClick={onClick}
          className={styles['close-button']}
          icon={<CloseIcon />}
          aria-label={'close button'}
        />
      </Box>
    </div>
  )
}

export default EditMessage
