import { memo, useCallback, useRef } from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { AddIcon } from "@chakra-ui/icons"
import { 
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text, 
  useDisclosure 
} from "@chakra-ui/react"

import FormButton from "../UI/FormButton/FormButton";
import { onAddChat } from "../../store/chatSlice";
import { setTitle, setDescription } from "../../store/chatItemVariables"

const AddItemChat = () => {
  const title = useSelector(state => state.variables.title)
  const description = useSelector(state => state.variables.description)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  
  const dispatch = useDispatch()
  const addChat = () => {
    if(!title) {
      return
    }
    
    dispatch(onAddChat({title, description}))
    dispatch(setTitle(''))
    dispatch(setDescription(''))
    reset()
    onClose()
  }

  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value))
  }

  const handleTitleDescription = useCallback((event) => {
    dispatch(setDescription(event.target.value))
  }, [dispatch, setDescription])

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onBlur'
  })

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
    reset()
  }

  return (
    <>
      <FormButton 
        onClick={onOpen}
        background={'#8774E1'}
        mt={'5px'}
        h={'50px'}
        _hover={{
          background: '#9887e6'
        }}
      >
        <AddIcon w={'30px'}/>
      </FormButton>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={'#fff'}/>
          <DrawerHeader 
            background={'#1c1d22'} 
            color={'#fff'}
          >
              Создать чат
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody h={'calc(100vh - 134px)'} background={'#1c1d22'} color={'#fff'}>
                <Input
                  {...register('chatname', {
                    required: 'Поле опязательно к заполнению!',
                  })}
                  value={title}
                  onChange={handleTitleChange}
                  variant={"flushed"}
                  placeholder={"Название чата"}
                  color={"#fff"}
                />

                <Text h={'20px'}>
                  {errors?.chatname && <p style={{color: 'red'}}>{errors?.chatname?.message || 'Вы должны написать название вашего чата!'}</p>}
                </Text>

                <Input
                  {...register('description')}
                  variant={"flushed"}
                  value={description}
                  onChange={handleTitleDescription}
                  placeholder={"Описание"}
                  color={"#fff"}
                />
            </DrawerBody>
          </form>

          <DrawerFooter background={'#1c1d22'} color={'#fff'}>
              <FormButton type={"submit"} onClick={addChat} colorScheme='blue' mr={3}>
                Создать
              </FormButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default memo(AddItemChat)