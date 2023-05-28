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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { useAuth } from '../../hook/useAuth'
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

        <CardBody className={styles.body}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack className={styles['form-data']}>
              <Input
                {...register('username', {
                  required: 'Поле обязательно к заполнению!',
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

              <Text>
                {errorsMemo?.username && (
                  <span>
                    {errorsMemo?.username?.message ||
                      'Вы должны написать ваше имя!'}
                  </span>
                )}
              </Text>

              <InputGroup>
                <Input
                  {...register('password', {
                    required: 'Поле обязательно к заполнению!',
                  })}
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onKeyUp={onEnterSubmit}
                  variant={'flushed'}
                  type={show ? 'text' : 'password'}
                  placeholder={'Пароль'}
                  autoComplete='off'
                />

                <InputRightElement>
                  <FormButton className={styles['button-show-password']} onClick={handleChangeShow}>
                    {show ? <ViewOffIcon/> : <ViewIcon/>}
                  </FormButton>
                </InputRightElement>
              </InputGroup>

              <Text>
                {errorsMemo?.password && (
                  <span>
                    {errorsMemo?.password?.message ||
                      'Вы должны написать ваше имя!'}
                  </span>
                )}
              </Text>
            </Stack>

            <HStack>
              <FormButton className={styles['button-enter']} type={'submit'} onClick={handleSendData}>
                Войти
              </FormButton>
            </HStack>
          </form>
        </CardBody>
      </Card>
    </section>
  )
}

export default memo(AuthContent)
