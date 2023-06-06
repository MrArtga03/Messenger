import { Box, IconButton, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import styles from './PinMessage.module.scss'

const PinMessage = ({ message, onClickClose }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Text className={styles.title}>Закрепленное сообщение</Text>
        <Box className={styles['wrapper-message']}>
          <Text className={styles.text}>{message}</Text>
        </Box>
      </Box>
      <IconButton
        onClick={onClickClose}
        className={styles['close-button']}
        icon={<CloseIcon />}
        aria-label={'Close context menu'}
      />
    </Box>
  )
}

export default PinMessage
