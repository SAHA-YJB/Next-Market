import getProducts, { ProductsParams } from '../actions/getProducts';

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  console.log(products);

  return <main>누구나 볼 수 있는 페이지 변경사항 적용</main>;
}