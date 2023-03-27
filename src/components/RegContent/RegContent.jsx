import { useState } from 'react'
import { QuestionIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
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
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent
} from '@chakra-ui/react'

import CustomLink from '../../components/CustomLink/CustomLink'
import FormButton from '../UI/FormButton/FormButton'


const RegContent = () => {
  const [showPas, setPasShow] = useState(false)
  const [showRepPas, setRepPasShow] = useState(false)

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
    console.log(JSON.stringify(data))
  }

  const handleClickPassword = () => setPasShow(!showPas)
  const handleClickRepPassword = () => setRepPasShow(!showRepPas)
  
  return (
    <Card
      mt={'10%'} 
      w={'400px'} 
      background={'#141416'}
      borderRadius={'20px'}
    >
      <CardHeader>
        <Heading>
          <HStack justify={'center'} align={'center'}>
            <Text
              align={'center'} 
              color={'#ffffff'} 
              fontSize='2xl'
            >
              Registration
            </Text>

            <Popover>
              <PopoverTrigger>
                <Button 
                  background={'none'}
                  p={'0px 0px 0px 0px'}
                  m={'0px 0px 0px 0px'}
                  _hover=''
                >
                  <QuestionIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                fontSize={'16px'}
                fontWeight={'400'}
                background={"#1c1d22"}
                color={'#fff'}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Info</PopoverHeader>
                <PopoverBody>
                  If you are a user and you are a member of an organization, then you must log in
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        </Heading>
      </CardHeader>

      <Divider />

      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt='3' spacing='3'>
            <Input
              {...register('fullorgname', {
                required: 'Поле является обязательным!'
              })}
              variant={'flushed'} 
              placeholder={'Full organization name'}
              color={'#fff'}
            />

            <Text h={'15px'}>
              {errors?.fullorgname && <p style={{color: 'red'}}>{errors?.fullorgname?.message || 'Вы должны написать полное имя организации!'}</p>}
            </Text>

            <Input
              {...register('shortname', {
                required: 'Поле является обязательным!'
              })}
              variant={'flushed'} 
              placeholder={'Short name'}
              color={'#fff'}
            />

            <Text h={'15px'}>
              {errors?.shortname && <p style={{color: 'red'}}>{errors?.shortname?.message || 'Вы должны написать короткое имя организации!'}</p>}
            </Text>

            <Input
              {...register('email', {
                required: 'Поле является обязательным!'
              })}
              variant={'flushed'} 
              placeholder={'Email'}
              color={'#fff'}
            />

            <Text h={'15px'}>
              {errors?.email && <p style={{color: 'red'}}>{errors?.email?.message || 'Вы должны написать ваш email!'}</p>}
            </Text>

            <InputGroup size='md'>
              <Input
                {...register('newpass', {
                  required: 'Поле является обязательным!',
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов!'
                  }
                })}
                pr='4.5rem'
                color={'#fff'}
                variant={'flushed'} 
                type={showPas ? 'text' : 'password'}
                placeholder={'Enter new password'}
              />
              <InputRightElement width='4.5rem'>
                <FormButton h='1.75rem' size='sm' onClick={handleClickPassword}>
                  {showPas ? 'Hide' : 'Show'}
                </FormButton>
              </InputRightElement>
            </InputGroup>

            <Text h={'15px'}>
              {errors?.newpass && <p style={{color: 'red'}}>{errors?.newpass?.message || 'Вы должны написать новый пароль!'}</p>}
            </Text>

            <InputGroup size='md'>
              <Input
                {...register('reppass', {
                  required: 'Поле является обязательным!'
                })}
                pr='4.5rem'
                color={'#fff'}
                variant={'flushed'} 
                type={showRepPas ? 'text' : 'password'}
                placeholder={'Repeat password'}
              />
              <InputRightElement width='4.5rem'>
                <FormButton h='1.75rem' size='sm' onClick={handleClickRepPassword}>
                  {showRepPas ? 'Hide' : 'Show'}
                </FormButton>
              </InputRightElement>
            </InputGroup>

            <Text h={'15px'}>
              {errors?.reppass && <p style={{color: 'red'}}>{errors?.reppass?.message || 'Вы должны повторно написать пароль!'}</p>}
            </Text>
          </Stack>

          <Divider mt={'4px'}/>

          <HStack mt={'10px'} >
            <FormButton type={'submit'}>Sing Up</FormButton>
            <Divider orientation={'vertical'} />
            <Stack>
              <Text color={'#9d9d9d59'}>
                <Text as='ins'>
                  <CustomLink to='/auth'>Log In</CustomLink>
                </Text>
              </Text>
            </Stack>
          </HStack>
        </form>
      </CardBody>
    </Card>
  )
}

export default RegContent