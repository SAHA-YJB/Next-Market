'use client';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import { categories } from '@/components/categories/Categories';
import CategoryInput from '@/components/categories/CategoryInput';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // 현재 위치를 가져오기 위한 스테이트와 useEffect
  // 찾고 프랍으로 전달
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  // react-hook-form 함수들
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
    // FieldValues는 제네릭 타입으로, 레지스터 타입오류 제거
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: 1,
      imageSrc: '',
      latitude,
      longitude,
    },
  });

  // 다이나믹 임폴트 런타임에 모듈을 가져올 수 있게 해줌
  const KakaoMap = dynamic(() => import('../../../components/KakaoMap'), {
    ssr: false,
  });

  // watch 함수는 특정 입력 필드의 상태를 실시간으로 관찰하고 그 값을 반환하는 역할
  // useState의 0번쨰 인덱스 같은 역할
  const imgSrc = watch('imageSrc');
  const category = watch('category');
  // const latitude = watch('latitude');
  // const longitude = watch('longitude');

  // 밸류는 여러가지가 될 수 있다
  // 레지스터로 등록 안되어 있어서 setValue로 등록
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };

  //각 인풋에 대한 입력값을 data매개변수가 받음
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/products', data)
      .then((res) => {
        router.push(`/products/${res.data.id}`);
      })
      .catch((err) => console.log('프로덕트 생성 에러', err))
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <Heading title='Product Upload' subtitle='Upload Your Product' />
          <ImageUpload
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imgSrc}
          />
          <Input
            id='title'
            label='Title'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id='price'
            label='Price'
            formatPrice
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          {/* 카테고리 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
            {categories.map((item) => (
              <div key={item.label} className='col-span-1'>
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />

          {/* 카카오맵 */}
          <KakaoMap
            setCustomValue={setCustomValue}
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          <Button label='상품 생성하기' disabled={isLoading} />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
