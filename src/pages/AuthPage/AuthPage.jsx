import { useState } from "react"
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
import PageNavigation from "../../components/PageNavigation/PageNavigation"
import CustomLink from "../../components/CustomLink/CustomLink"

import styles from "./AuthPage.module.scss"

const AuthPage = () => {
  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const { signin } = useAuth()

  const fromPage = location.state?.from?.pathname || "/"

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const user = form.username.value
    const password = form.password.value

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
    <section className={styles.container}>
      <PageNavigation />
      <div className={styles.wrapper}>
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
            <form onSubmit={handleSubmit}>
              <Stack mt="3" spacing="3">
                <Input
                  value={name}
                  name={"username"}
                  onChange={(e) => setName(e.target.value)}
                  variant={"flushed"}
                  placeholder={"Your name"}
                  color={"#fff"}
                />

                <InputGroup size="md">
                  <Input
                    value={password}
                    name={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                    pr="4.5rem"
                    color={"#fff"}
                    variant={"flushed"}
                    type={show ? "text" : "password"}
                    placeholder={"Enter password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>

              <Divider mt={"20px"} />

              <HStack mt={"5px"}>
                <Button type={"submit"} onClick={sendData}>
                  Log In
                </Button>
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
      </div>
    </section>
  )
}

export default AuthPage
