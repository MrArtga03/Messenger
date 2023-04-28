import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { 
  Button,
  ButtonGroup
} from '@chakra-ui/react'

import styles from './PageNavigation.module.scss'

const PageNavigation = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)
  const goForward = () => navigate(1)
  return (
    <ButtonGroup className={styles['buttons-navigate']}>
      <Button 
        className={styles['button-go-back']}
        onClick={goBack}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        className={styles['button-go-forward']}
        onClick={goForward}
      >
        <ArrowRightIcon />
      </Button>
    </ButtonGroup>
  )
}

export default PageNavigation