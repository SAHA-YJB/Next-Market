'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //로그인 로직 넥스트어스 signIn함수 사용
  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
      const data = await signIn('credentials', body);
    } catch (error) {
      console.log(error);
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
        <h1 className='text-2xl'>로그인</h1>

        <Input
          id='email'
          label='Email'
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

        <Button label='로그인' />

        <div className='text-center'>
          <p className='text-gray-500 text-sm'>
            회원이 아니신가요?{' '}
            <Link
              href='/auth/register'
              className='text-sm text-green-700 hover:underline'
            >
              회원가입하러 가기
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
