import React, {  useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { useAppDispatch } from 'src/hooks/useRedux'
import { updateStatusLogin } from 'src/store/slices/auth'
import { RootState } from 'src/store/store'
import { FcGoogle } from 'react-icons/fc'
import { AppContext } from 'src/contexts/app.context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { toast } from 'react-toastify'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../LoginWithFireBase/config'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

const Login = () => {
  const { isLogin } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile, setProfileWithGG, setOpenModal } = useContext(AppContext)
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        setOpenModal(false)
        toast.success('Đăng nhập thành công 😍😋😙')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  const onChangeForm = () => {
    dispatch(updateStatusLogin(!isLogin))
  }

  const handleClickLoginWithGG = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    signInWithPopup(auth, provider).then((data) => {
      setProfileWithGG(data.user.email)
      localStorage.setItem('email', String(data.user.email))
      setIsAuthenticated(true)
      setOpenModal(false)
      toast.success('Đăng nhập thành công 😍😋😙!!!')
    })
  }
  return (
    <div className='lg:col-span-2 lg:col-start-4 '>
      <div className='flex items-center justify-center'>
        <img src='https://music.youtube.com/img/on_platform_logo_dark.svg' alt=''></img>
      </div>
      <form className='rounded p-10 shadow-sm' onSubmit={onSubmit} noValidate>
        <div className=' flex items-center justify-center text-[25px] text-[#ffffff]'>Đăng nhập</div>

        <Input
          name='email'
          register={register}
          type='email'
          className='mt-8'
          errorMessage={errors.email?.message}
          placeholder='Email'
        />
        <Input
          name='password'
          register={register}
          type='password'
          className='mt-2'
          classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
          errorMessage={errors.password?.message}
          placeholder='Password'
          autoComplete='on'
        />
        <div className='mt-3'>
          <Button
            type='submit'
            className='flex w-full items-center justify-center rounded-[30px] bg-[#75C2F6] py-4 px-2 text-sm uppercase text-white hover:opacity-80'
            isLoading={loginMutation.isLoading}
            disabled={loginMutation.isLoading}
          >
            Đăng nhập
          </Button>
        </div>
        <div className='mt-8 flex items-center justify-center'>
          <span className='text-[#000]'>Bạn chưa có tài khoản?</span>
          <Link className='ml-1  text-[#ffffff]' to='' onClick={onChangeForm}>
            Đăng ký
          </Link>
        </div>
        <span className='mt-3 flex items-center justify-center text-[#000]'>Hoặc</span>
        <div className='mt-3 flex items-center justify-center'>
          <Button
            className='w-[50%] items-center justify-center rounded-[30px] bg-[#75C2F6]  py-4 px-2 text-sm uppercase text-white hover:opacity-80'
            onClick={handleClickLoginWithGG}
          >
            <div className='flex items-center  justify-center gap-3 hover:opacity-80'>
              <FcGoogle size={18} />
              Đăng nhập
            </div>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
