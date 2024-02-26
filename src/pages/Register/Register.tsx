import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input/Input'
import { omit } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import { schena, Schena } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

type FormData = Pick<Schena, 'email' | 'password' | 'confirm_password'>
const regiterSchema = schena.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(regiterSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data?.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  console.log('errors', errors)
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <div className='mt-2'>
                <Input
                  name='password'
                  register={register}
                  type='password'
                  className='mt-8'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                  autoComplete='on'
                />
              </div>
              <div className='mt-2'>
                <Input
                  name='confirm_password'
                  register={register}
                  type='password'
                  className='mt-8'
                  errorMessage={errors.confirm_password?.message}
                  placeholder='Confirm Password'
                  autoComplete='on'
                />
              </div>
              <div className='mt-2'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  ĐĂNG KÝ
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
