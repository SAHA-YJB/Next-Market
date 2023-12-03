'use client';
import Button from '@/components/Button';
import Container from '@/components/Container';
import ProductHead from '@/components/products/ProductHead';
import ProductInfo from '@/components/products/ProductInfo';
import { Product, User } from '@prisma/client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

interface ProductClientProps {
  currentUser?: User | null;
  product: Product & { user: User };
}

const ProductClient = ({ product, currentUser }: ProductClientProps) => {
  const router = useRouter();
  const KakaoMap = dynamic(() => import('../../../components/KakaoMap'), {
    ssr: false,
  });
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ProductHead />
          <div className='grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10'>
            <ProductInfo />
            <div>
              <KakaoMap
                detailPage
                latitude={product.latitude}
                longitude={product.longitude}
              />
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <Button label='채팅하기' onClick={() => router.push('/chat')} />
        </div>
      </div>
    </Container>
  );
};

export default ProductClient;
