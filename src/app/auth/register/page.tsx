'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 리액트훅폼에서 제공하는 함수
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  //리액트훅폼에서 제공하는 함수에 들어갈 함수
  //회원가입 로직
  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/register', body);
      console.log('data', data);
      router.push('/auth/login');
    } catch (error) {
      console.log('회원가입 섭밋 에러', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 중앙 맞추기
    <section className='grid h-[calc(100vh_-_56px)] place-items-center'>
      <form
        className='flex flex-col justify-center gap-4 min-w-[350px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-2xl'>회원가입</h1>

        <Input
          id='email'
          label='Email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='name'
          label='Name'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='password'
          label='Password'
          type='password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Button label='회원가입' />

        <div className='text-center'>
          <p className='text-gray-400 text-sm'>
            이미 회원이신가요?{' '}
            <Link
              href='/auth/login'
              className='text-sm text-green-700 hover:underline'
            >
              로그인하러 가기
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
