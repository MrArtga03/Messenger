import { useForm } from "react-hook-form";
import { AddIcon } from "@chakra-ui/icons";
import { 
  Input,
  Modal, 
  ModalBody, 
  ModalCloseButton,
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Text, 
  useDisclosure 
} from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { onAddChat } from "../../store/chatSlice";

import FormButton from "../UI/FormButton/FormButton";
import { useState } from "react";

const AddItemChat = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const dispatch = useDispatch()
  const addChat = () => {
    dispatch(onAddChat({title, description}))
    setTitle('')
    setDescription('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleTitleDescription = (event) => {
    setDescription(event.target.value)
  }

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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader background={'#1c1d22'} color={'#fff'}>Создать чат</ModalHeader>
          <ModalCloseButton color={'#fff'}/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody background={'#1c1d22'} color={'#fff'}>
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
            </ModalBody>
            <ModalFooter background={'#1c1d22'} color={'#fff'}>
              <FormButton type={"submit"} onClick={addChat} colorScheme='blue' mr={3}>
                Создать
              </FormButton>
              <FormButton colorScheme='blue' mr={3} onClick={onClose}>
                Закрыть
              </FormButton>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddItemChat