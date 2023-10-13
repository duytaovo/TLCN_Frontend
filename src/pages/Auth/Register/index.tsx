import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { useAppDispatch } from 'src/hooks/useRedux'
import { updateStatusLogin } from 'src/store/slices/auth'
import { RootState } from 'src/store/store'
import { Schema, schema } from 'src/utils/rules'

import omit from 'lodash/omit'
import { AppContext } from 'src/contexts/app.context'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../LoginWithFireBase/config'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

const Register = () => {
  const { setIsAuthenticated, setProfile, setOpenModal } = useContext(AppContext)
  const { isLogin } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const [value, setValue] = useState<any>()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const dispatch = useAppDispatch()

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        setOpenModal(false)
        toast.success('Tạo tài khoản thành công 😀😊😎')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
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
  const handleClickLoginWithGG = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem('email', value)
    })
  }
  return (
    <div>
      <div className='lg:col-span-2 lg:col-start-4'>
        <div className='flex items-center justify-center'>
          <img src='https://music.youtube.com/img/on_platform_logo_dark.svg' alt=''></img>
        </div>
        <form className='rounded p-10 shadow-sm' onSubmit={onSubmit} noValidate>
          <div className='flex items-center justify-center text-[25px] text-[#ffffff]'>Đăng ký</div>

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

          <Input
            name='confirm_password'
            register={register}
            type='password'
            className='mt-2'
            classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
            errorMessage={errors.confirm_password?.message}
            placeholder='Confirm Password'
            autoComplete='on'
          />

          <div className='mt-2'>
            <Button
              className='flex w-full items-center justify-center rounded-[30px] bg-[#75C2F6]  py-4 px-2 text-sm uppercase text-white hover:opacity-80'
              isLoading={registerAccountMutation.isLoading}
              disabled={registerAccountMutation.isLoading}
            >
              Đăng ký
            </Button>
          </div>
          <div className='mt-8 flex items-center justify-center'>
            <span className='text-[#000]'>Bạn đã có tài khoản?</span>
            <Link className='ml-1 text-[#fff]' to='' onClick={onChangeForm}>
              Đăng nhập
            </Link>
          </div>
          <span className='mt-3 flex items-center justify-center text-[#000]'>Hoặc</span>
          <div className='mt-3 flex items-center justify-center'>
            <Button
              className=' w-[50%] items-center justify-center rounded-[30px] bg-[#75C2F6]  py-4 px-2 text-sm uppercase text-white hover:opacity-80'
              onClick={handleClickLoginWithGG}
            >
              <div className='flex  items-center justify-center gap-3 hover:opacity-80'>
                <FcGoogle size={18} />
                Đăng nhập
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
