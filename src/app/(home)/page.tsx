import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import FloatingButton from '@/components/FloatingButton';
import MyPagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import Categories from '@/components/categories/Categories';
import { PRODUCTS_PER_PAGE } from '@/constants';
import getCurrentUser from '../actions/getCurrentUser';
import getProducts, { ProductsParams } from '../actions/getProducts';

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  const currentUser = await getCurrentUser();

  const page = searchParams?.page;
  const pageNum = typeof page === 'string' ? Number(page) : 1;

  console.log('pagenum', pageNum);
  return (
    <Container>
      {/* 카테고리 */}
      <Categories />

      {products?.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>
            {products.data.map((product) => (
              <ProductCard
                currentUser={currentUser}
                key={product.id}
                data={product}
              />
            ))}
          </div>
        </>
      )}

      <MyPagination
        page={pageNum}
        totalItems={products.totalItems}
        perPage={PRODUCTS_PER_PAGE}
      />

      <div className='text-4xl font-semibold text-center'>
        <FloatingButton href='/products/upload'>+</FloatingButton>
      </div>
    </Container>
  );
}
