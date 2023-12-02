import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import FloatingButton from '@/components/FloatingButton';
import PaginationComponent from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import Categories from '@/components/categories/Categories';
import { PRODUCTS_PER_PAGE } from '@/constants';
import getCurrentUser from '../actions/getCurrentUser';
import getProducts, { ProductsParams } from '../actions/getProducts';

interface HomeProps {
  searchParams: ProductsParams;
}
// searchParams는 일반적으로 사용자의 입력을 기반으로 생성
// 사용자가 웹 사이트의 검색 폼에 검색어를 입력
// 카테고리를 선택
// 정렬 방식을 선택하는 등의 동작을 통해
// searchParams에 반영
export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  const currentUser = await getCurrentUser();

  // searchParams가 존재하고 그 안에 page 키가 있다면 해당 값이 page에 할당
  // 만약 searchParams는 존재하지만 page 키가 없다면, page는 undefined
  const page = searchParams?.page;
  // 페이지가 undefined라도 1로 기본 할당
  const pageNum = typeof page === 'string' ? Number(page) : 1;

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

      <PaginationComponent
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
