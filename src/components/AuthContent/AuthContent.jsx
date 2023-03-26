import { useState } from "react"
import { useForm } from 'react-hook-form'
import { QuestionIcon } from "@chakra-ui/icons"
import { useLocation, useNavigate } from "react-router-dom"
import {
  CardBody,
  Text,
  Card,
  CardHeader,
  Stack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Divider,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react"

import { useAuth } from "../../hook/useAuth"
import CustomLink from "../../components/CustomLink/CustomLink"
import FormButton from "../UI/FormButton/FormButton"

const AuthContent = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { signin } = useAuth()

  const fromPage = location.state?.from?.pathname || "/"
  
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm({
    mode: 'onBlur'
  })
  
  const onSubmit = (data) => {
    alert(JSON.stringify(data))

    const user = data.username
    const password = data.password
    signin(user, password, () => navigate(fromPage, { replace: true }))
  }
  
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = () => setShow(!show)

  const sendData = () => {
    console.log(name)
    console.log(password)
  }

  return (
    <Card
    mt={"10%"}
    w={"400px"}
    background={"#141416"}
    borderRadius={"20px"}
  >
    <CardHeader>
      <Heading>
        <HStack justify={"center"} align={"center"}>
          <Text align={"center"} color={"#ffffff"} fontSize="2xl">
            Authorization
          </Text>

          <Popover>
            <PopoverTrigger>
              <Button
                background={"none"}
                p={"0px 0px 0px 0px"}
                m={"0px 0px 0px 0px"}
                _hover=""
              >
                <QuestionIcon />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              fontSize={"16px"}
              fontWeight={"400"}
              background={"#1c1d22"}
              color={"#fff"}
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Info</PopoverHeader>
              <PopoverBody>
                You must log in with an accont provided to you by your
                organization
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Heading>
    </CardHeader>

    <Divider />

    <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack mt="3" spacing="3">
          <Input
            {...register('username', {
              required: 'Поле опязательно к заполнению!',
            })}
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant={"flushed"}
            placeholder={"Your name"}
            color={"#fff"}
          />

          <Text h={'20px'}>
            {errors?.username && <p style={{color: 'red'}}>{errors?.username?.message || 'Вы должны написать ваше имя!'}</p>}
          </Text>

          <InputGroup size="md">
            <Input
              {...register('password', {
                required: 'Поле опязательно к заполнению!',
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pr="4.5rem"
              color={"#fff"}
              variant={"flushed"}
              type={show ? "text" : "password"}
              placeholder={"Enter password"}
            />

            <InputRightElement width="4.5rem">
              <FormButton h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </FormButton>
            </InputRightElement>
          </InputGroup>

          <Text h={'20px'}>
            {errors?.password && <p style={{color: 'red'}}>{errors?.password?.message || 'Вы должны написать ваше имя!'}</p>}
          </Text>
        </Stack>

        <Divider mt={"20px"} />

        <HStack mt={"5px"}>
          <FormButton type={"submit"} onClick={sendData}>
            Log In
          </FormButton>
          <Divider orientation={"vertical"} />

          <Stack>
            <Text color={"#9d9d9d59"}>
              If you are not registered, follow the link-
              <Text as="ins">
                <CustomLink to="/reg">Sing Up</CustomLink>
              </Text>
            </Text>
          </Stack>
        </HStack>
      </form>
    </CardBody>
  </Card>
  )
}

export default AuthContent