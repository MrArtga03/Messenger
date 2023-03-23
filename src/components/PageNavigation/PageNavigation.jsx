import { useNavigate } from "react-router-dom"
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { 
  Button,
  ButtonGroup
} from '@chakra-ui/react'

const PageNavigation = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)
  const goForward = () => navigate(1)
  return (
    <ButtonGroup
      position={'absolute'}
      top={'0'}
      left={'0'}
    >
      <Button 
        background={'none'}
        color={'#fff'}
        _hover
        fontSize={'15px'}
        m={'0'}
        w={'10px'}
        onClick={goBack}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        background={'none'}
        color={'#fff'}
        _hover
        fontSize={'15px'}
        m={'0'}
        w={'10px'}
        onClick={goForward}
      >
        <ArrowRightIcon />
      </Button>
    </ButtonGroup>
  )
}

export default PageNavigation