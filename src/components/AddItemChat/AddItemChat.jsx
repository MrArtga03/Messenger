import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react'

import FormButton from '../UI/FormButton/FormButton'
import { onAddChat } from '../../store/chatSlice'

import styles from './AddItemChat.module.scss'

const AddItemChat = () => {
  const inputTitleRef = useRef(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { isOpen, onToggle, onClose } = useDisclosure()

  const dispatch = useDispatch()

  useEffect(() => {
    inputTitleRef.current.focus()
  }, [isOpen])

  const addChat = () => {
    if (!title) {
      return
    }

    dispatch(onAddChat({ title, description }))
    setTitle('')
    setDescription('')
    reset()
    onClose()
  }

  const addChatEnter = e => {
    if (!title) {
      return
    }

    if (e.key === 'Enter') {
      dispatch(onAddChat({ title, description }))
      setTitle('')
      setDescription('')
      reset()
      onClose()
    }
  }

  const handleTitleChange = useCallback(event => {
    setTitle(event.target.value)
  }, [])

  const handleDescriptionChange = useCallback(event => {
    setDescription(event.target.value)
  }, [])

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = data => {
    console.log(JSON.stringify(data))
    reset()
  }

  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <Stack position={'relative'}>
          <Box className={styles['container-form']} rounded='md' shadow='md'>
            <Heading className={styles.header}>Создать чат</Heading>

            <Box className={styles.body}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register('chat-name', {
                    required: 'Поле опязательно к заполнению!',
                  })}
                  value={title}
                  onChange={handleTitleChange}
                  onKeyUp={addChatEnter}
                  variant={'flushed'}
                  placeholder={'Название чата'}
                  autoComplete='off'
                  ref={inputTitleRef}
                />

                <Text h={'20px'}>
                  {errors?.chatname && (
                    <p style={{ color: 'red' }}>
                      {errors?.chatname?.message ||
                        'Вы должны написать название вашего чата!'}
                    </p>
                  )}
                </Text>

                <Input
                  {...register('description')}
                  variant={'flushed'}
                  value={description}
                  onKeyUp={addChatEnter}
                  onChange={handleDescriptionChange}
                  placeholder={'Описание (необязательно)'}
                  autoComplete='off'
                />
              </form>
            </Box>

            <Box className={styles.footer}>
              <FormButton
                type={'submit'}
                onClick={addChat}
                colorScheme='blue'
                mr={3}
              >
                Создать
              </FormButton>
            </Box>
          </Box>
        </Stack>
      </Collapse>

      <div className={styles.container}>
        <FormButton className={styles['button-add']} onClick={onToggle}>
          <AddIcon className={styles.icon} />
        </FormButton>
      </div>
    </>
  )
}

export default memo(AddItemChat)
