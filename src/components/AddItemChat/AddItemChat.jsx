import { memo, useCallback, useMemo, useRef } from "react"
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

import styles from './AddItemChat.module.scss'

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

  const handleTitleChange = useCallback((event) => {
    dispatch(setTitle(event.target.value))
  }, [dispatch, setTitle])

  const handleDescriptionChange = useCallback((event) => {
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
        className={styles['button-add']}
        onClick={onOpen}
      >
        <AddIcon className={styles.icon}/>
      </FormButton>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className={styles['close-button']}/>
          <DrawerHeader className={styles.header}>
              Создать чат
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody className={styles.body}>
                <Input
                  {...register('chatname', {
                    required: 'Поле опязательно к заполнению!',
                  })}
                  value={title}
                  onChange={handleTitleChange}
                  variant={"flushed"}
                  placeholder={"Название чата"}
                  color={"#fff"}
                  autocomplete="off"
                />

                <Text h={'20px'}>
                  {errors?.chatname && <p style={{color: 'red'}}>{errors?.chatname?.message || 'Вы должны написать название вашего чата!'}</p>}
                </Text>

                <Input
                  {...register('description')}
                  variant={"flushed"}
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder={"Описание"}
                  color={"#fff"}
                  autocomplete="off"
                />
            </DrawerBody>
          </form>

          <DrawerFooter className={styles.footer}>
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