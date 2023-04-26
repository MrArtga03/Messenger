import { memo, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
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

import { regUrl } from '../../constants/urls'
import { useAuth } from '../../hook/useAuth'
import CustomLink from '../../components/CustomLink/CustomLink'
import FormButton from '../../components/UI/FormButton/FormButton'
import InfoPopover from '../../components/UI/InfoPopover/InfoPopover'

import styles from './AuthContent.module.scss'

const AuthContent = () => {
  const [formData, setFormData] = useState({ name: '', password: '' })
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { signin: signIn } = useAuth()

  const fromPage = location.state?.from?.pathname || '/'

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  })

  const errorsMemo = useMemo(() => errors, [errors])

  const onSubmit = useCallback(
    data => {
      const user = data.username
      const password = data.password
      signIn(user, password, () => {
        navigate(fromPage, { replace: true })
      })
    },
    [signIn, navigate, fromPage],
  )

  const onEnterSubmit = useCallback(
    e => {
      e.preventDefault()
      if (e.key === 'Enter') {
        const data = { username: formData.name, password: formData.password }
        signIn(data.username, data.password, () =>
          navigate('/home', { replace: true }),
        )
      }
    },
    [signIn, navigate, formData],
  )

  const handleChangeShow = useCallback(() => {
    setShow(show => !show)
  }, [])

  const handleSendData = useCallback(() => {
    console.log(formData.name)
    console.log(formData.password)
  }, [formData])

  return (
    <section className={styles.card}>
      <Card className={styles['card-container']}>
        <CardHeader>
          <Heading>
            <HStack className={styles['stack-header']}>
              <Text className={styles['stack-title']}>Авторизация</Text>
              <InfoPopover
                children1={'Информация'}
                children2={
                  'Вы должны войти в систему с учетной записью, предоставленной вам вашей организацией'
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
                {...register('username', {
                  required: 'Поле опязательно к заполнению!',
                })}
                defaultValue={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onKeyUp={onEnterSubmit}
                variant={'flushed'}
                placeholder={'Логин'}
                autoComplete='off'
              />

              <Text h={'20px'}>
                {errorsMemo?.username && (
                  <span style={{ color: 'red' }}>
                    {errorsMemo?.username?.message ||
                      'Вы должны написать ваше имя!'}
                  </span>
                )}
              </Text>

              <InputGroup size='md'>
                <Input
                  {...register('password', {
                    required: 'Поле опязательно к заполнению!',
                  })}
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onKeyUp={onEnterSubmit}
                  pr='4.5rem'
                  variant={'flushed'}
                  type={show ? 'text' : 'password'}
                  placeholder={'Пароль'}
                  autoComplete='off'
                />

                <InputRightElement width='4.5rem'>
                  <FormButton h='1.75rem' size='sm' onClick={handleChangeShow}>
                    {show ? 'Скрыть' : 'Показать'}
                  </FormButton>
                </InputRightElement>
              </InputGroup>

              <Text h={'20px'}>
                {errorsMemo?.password && (
                  <span style={{ color: 'red' }}>
                    {errorsMemo?.password?.message ||
                      'Вы должны написать ваше имя!'}
                  </span>
                )}
              </Text>
            </Stack>

            <Divider mt={'20px'} />

            <HStack mt={'5px'}>
              <FormButton type={'submit'} onClick={handleSendData}>
                Войти
              </FormButton>
              <Divider orientation={'vertical'} />

              <Stack>
                <Text>
                  Если вы не зарегистрированы, пройдите по ссылке-
                  <span>
                    <CustomLink to={regUrl}>Зарегистрироваться</CustomLink>
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

export default memo(AuthContent)
