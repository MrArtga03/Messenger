import { 
  Button,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent
} from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'

import styles from './MyPopover.module.scss'

const MyPopover = ({ children1, children2 }) => {
  return (
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
  )
}

export default MyPopover