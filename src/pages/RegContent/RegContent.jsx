import { useState } from 'react'
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
  Divider,
  HStack,
} from '@chakra-ui/react'

import { authUrl } from '../../constants/urls'
import CustomLink from '../../components/CustomLink/CustomLink'
import FormButton from '../../components/UI/FormButton/FormButton'
import InfoPopover from '../../components/UI/InfoPopover/InfoPopover'

import styles from './RegContent.module.scss'

const RegContent = () => {
  const [showPas, setPasShow] = useState(false)
  const [showRepPas, setRepPasShow] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = data => {
    console.log(JSON.stringify(data))
  }

  const handleClickPassword = () => {
    setPasShow(!showPas)
  }
  const handleClickRepPassword = () => {
    setRepPasShow(!showRepPas)
  }

  return (
    <section className={styles.container}>
      <Card className={styles['card-container']}>
        <CardHeader>
          <Heading>
            <HStack className={styles['title-wrapper']}>
              <Text className={styles['title']}>Регистрация</Text>

              <InfoPopover
                children1={'Информация'}
                children2={
                  'Если вы являетесь пользователем и являетесь членом организации, то вы должны войти в систему'
                }
              />
            </HStack>
          </Heading>
        </CardHeader>

        <Divider />

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack mt='3' spacing='3'>
              <Input
                {...register('fullorgname', {
                  required: 'Поле является обязательным!',
                })}
                variant={'flushed'}
                placeholder={'Полное имя организации'}
                autoComplete='off'
              />

              <Text h={'15px'}>
                {errors?.fullorgname && (
                  <p style={{ color: 'red' }}>
                    {errors?.fullorgname?.message ||
                      'Вы должны написать полное имя организации!'}
                  </p>
                )}
              </Text>

              <Input
                {...register('shortname', {
                  required: 'Поле является обязательным!',
                })}
                variant={'flushed'}
                placeholder={'Короткое имя организации'}
                autoComplete='off'
              />

              <Text h={'15px'}>
                {errors?.shortname && (
                  <p style={{ color: 'red' }}>
                    {errors?.shortname?.message ||
                      'Вы должны написать короткое имя организации!'}
                  </p>
                )}
              </Text>

              <Input
                {...register('email', {
                  required: 'Поле является обязательным!',
                })}
                variant={'flushed'}
                placeholder={'Email'}
                autoComplete='off'
              />

              <Text h={'15px'}>
                {errors?.email && (
                  <p style={{ color: 'red' }}>
                    {errors?.email?.message || 'Вы должны написать ваш email!'}
                  </p>
                )}
              </Text>

              <InputGroup size='md'>
                <Input
                  {...register('newpass', {
                    required: 'Поле является обязательным!',
                    minLength: {
                      value: 5,
                      message: 'Минимум 5 символов!',
                    },
                  })}
                  pr='4.5rem'
                  variant={'flushed'}
                  type={showPas ? 'text' : 'password'}
                  placeholder={'Введите новый пароль'}
                  autoComplete='off'
                />
                <InputRightElement width='4.5rem'>
                  <FormButton
                    h='1.75rem'
                    size='sm'
                    onClick={handleClickPassword}
                  >
                    {showPas ? 'Показать' : 'Скрыть'}
                  </FormButton>
                </InputRightElement>
              </InputGroup>

              <Text h={'15px'}>
                {errors?.newpass && (
                  <p style={{ color: 'red' }}>
                    {errors?.newpass?.message ||
                      'Вы должны написать новый пароль!'}
                  </p>
                )}
              </Text>

              <InputGroup size='md'>
                <Input
                  {...register('repass', {
                    required: 'Поле является обязательным!',
                  })}
                  pr='4.5rem'
                  variant={'flushed'}
                  type={showRepPas ? 'text' : 'password'}
                  placeholder={'Повторите пароль'}
                  autoComplete='off'
                />
                <InputRightElement width='4.5rem'>
                  <FormButton
                    h='1.75rem'
                    size='sm'
                    onClick={handleClickRepPassword}
                  >
                    {showRepPas ? 'Показать' : 'Скрыть'}
                  </FormButton>
                </InputRightElement>
              </InputGroup>

              <Text h={'15px'}>
                {errors?.reppass && (
                  <p style={{ color: 'red' }}>
                    {errors?.reppass?.message ||
                      'Вы должны повторно написать пароль!'}
                  </p>
                )}
              </Text>
            </Stack>

            <Divider mt={'4px'} />

            <HStack mt={'10px'}>
              <FormButton type={'submit'}>Зарегистрироваться</FormButton>
              <Divider orientation={'vertical'} />
              <Stack>
                <Text>
                  <span>
                    <CustomLink to={authUrl}>Войти</CustomLink>
                  </span>
                </Text>
              </Stack>
            </HStack>
          </form>
        </CardBody>
      </Card>
    </section>
  )
}

export default RegContent
