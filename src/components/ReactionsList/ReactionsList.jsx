import { Box, Stack } from '@chakra-ui/react'

import FormButton from '../UI/FormButton/FormButton'

import styles from './ReactionsList.module.scss'

const ReactionsList = ({ onSelectReaction }) => {
  return (
    <Box className={styles.container}>
      <Stack className={styles.wrapper}>
        <FormButton
          className={styles.smile}
          onClick={() => onSelectReaction('😂')}
        >
          😂
        </FormButton>
        <FormButton
          className={styles.smile}
          onClick={() => onSelectReaction('😭')}
        >
          😭
        </FormButton>
        <FormButton
          className={styles.smile}
          onClick={() => onSelectReaction('😡')}
        >
          😡
        </FormButton>
        <FormButton
          className={styles.smile}
          onClick={() => onSelectReaction('👍')}
        >
          👍
        </FormButton>
        <FormButton
          className={styles.smile}
          onClick={() => onSelectReaction('👎')}
        >
          👎
        </FormButton>
        <FormButton
          className={styles.smile}
          onClick={() => onSelectReaction('❓')}
        >
          ❓
        </FormButton>
      </Stack>
    </Box>
  )
}

export default ReactionsList
