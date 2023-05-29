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
  Box,
  InputLeftElement,
  Select,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

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

        <CardBody className={styles.body}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack className={styles['form-data']}>
              <Stack className={styles['bio-block']}>
                <Box className={styles['full-name']}>
                  <Input
                    {...register('fullname', {
                      required: 'Поле обязательно к заполнению!',
                    })}
                    variant={'flushed'}
                    placeholder={'ФИО сотрудника'}
                    autoComplete='off'
                  />

                  <Text>
                    {errors?.fullname && (
                      <span>
                        {errors?.fullname?.message ||
                          'Вы должны ФИО сотрудника!'}
                      </span>
                    )}
                  </Text>
                </Box>

                <Box className={styles['birthday']}>
                  <Input
                    {...register('birthday', {
                      required: 'Поле обязательно к заполнению!',
                    })}
                    variant={'flushed'}
                    autoComplete='off'
                    type='date'
                  />

                  <Text>
                    {errors?.birthday && (
                      <span>
                        {errors?.birthday?.message ||
                          'Вы должны указать д/р сотрудника!'}
                      </span>
                    )}
                  </Text>
                </Box>
              </Stack>

              <Stack className={styles['contact-block']}>
                <Box className={styles.email}>
                  <Input
                    {...register('email', {
                      required: 'Поле обязательно к заполнению!',
                    })}
                    variant={'flushed'}
                    placeholder={'Email'}
                    autoComplete='off'
                  />

                  <Text>
                    {errors?.email && (
                      <span>
                        {errors?.email?.message ||
                          'Вы должны написать ваш email!'}
                      </span>
                    )}
                  </Text>
                </Box>

                <Box className={styles['contact-number']}>
                  <InputGroup>
                    <InputLeftElement
                      className={styles['format-number']}
                      children='+7'
                    />
                    <Input
                      type='tel'
                      placeholder='Контакный номер'
                      {...register('number', {
                        required: 'Поле обязательно к заполнению!',
                      })}
                      variant={'flushed'}
                      autoComplete='off'
                    />
                  </InputGroup>

                  <Text>
                    {errors?.number && (
                      <span>
                        {errors?.number?.message ||
                          'Вы должны написать номер телефона сотрудника!'}
                      </span>
                    )}
                  </Text>
                </Box>
              </Stack>

              <Stack className={styles['corporate-block']}>
                <Box className={styles.organization}>
                  <Input
                    {...register('organization', {
                      required: 'Поле обязательно к заполнению!',
                    })}
                    variant={'flushed'}
                    placeholder={'Имя организации'}
                    autoComplete='off'
                  />

                  <Text>
                    {errors?.organization && (
                      <span>
                        {errors?.organization?.message ||
                          'Вы должны написать имя организации!'}
                      </span>
                    )}
                  </Text>
                </Box>

                <Box className={styles.role}>
                  <Select
                    {...register('role', {
                      required: 'Поле обязательно к заполнению!',
                    })}
                    className={styles['select-role']}
                  >
                    <option value='Администратор'>Администратор</option>
                    <option value='Сотрудник'>Сотрудник</option>
                  </Select>

                  <Text>
                    {errors?.role && (
                      <span>
                        {errors?.role?.message ||
                          'Вы должны написать номер телефона сотрудника!'}
                      </span>
                    )}
                  </Text>
                </Box>
              </Stack>

              <InputGroup>
                <Input
                  {...register('newpass', {
                    required: 'Поле обязательно к заполнению!',
                    minLength: {
                      value: 5,
                      message: 'Минимум 5 символов!',
                    },
                  })}
                  variant={'flushed'}
                  type={showPas ? 'text' : 'password'}
                  placeholder={'Введите новый пароль'}
                  autoComplete='off'
                />
                <InputRightElement>
                  <FormButton
                    className={styles['button-show-password']}
                    onClick={handleClickPassword}
                  >
                    {showPas ? <ViewOffIcon /> : <ViewIcon />}
                  </FormButton>
                </InputRightElement>
              </InputGroup>

              <Text>
                {errors?.newpass && (
                  <span>
                    {errors?.newpass?.message ||
                      'Вы должны написать новый пароль!'}
                  </span>
                )}
              </Text>

              <InputGroup>
                <Input
                  {...register('repass', {
                    required: 'Поле обязательно к заполнению!',
                  })}
                  variant={'flushed'}
                  type={showRepPas ? 'text' : 'password'}
                  placeholder={'Повторите пароль'}
                  autoComplete='off'
                />
                <InputRightElement>
                  <FormButton
                    className={styles['button-show-password']}
                    onClick={handleClickRepPassword}
                  >
                    {showRepPas ? <ViewOffIcon /> : <ViewIcon />}
                  </FormButton>
                </InputRightElement>
              </InputGroup>

              <Text>
                {errors?.reppass && (
                  <span>
                    {errors?.reppass?.message ||
                      'Вы должны повторно написать пароль!'}
                  </span>
                )}
              </Text>
            </Stack>

            <HStack>
              <FormButton className={styles['button-enter']} type={'submit'}>
                Зарегистрировать
              </FormButton>
            </HStack>
          </form>
        </CardBody>
      </Card>
    </section>
  )
}

export default RegContent
