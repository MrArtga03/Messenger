import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
} from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'

import styles from './InfoPopover.module.scss'

const InfoPopover = ({ children1, children2 }) => {
  return (
    <section className={styles.container}>
      <Popover>
        <PopoverTrigger>
          <Button className={styles['button-question']}>
            <QuestionIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className={styles['info']}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{children1}</PopoverHeader>
          <PopoverBody>{children2}</PopoverBody>
        </PopoverContent>
      </Popover>
    </section>
  )
}

export default InfoPopover
