import { PRODUCTS_PER_PAGE } from '@/constants';
import prisma from '@/helpers/prismadb';

export interface ProductsParams {
  category: string;
  latitude?: number;
  longitude?: number;
  page?: number;
  skip?: number;
}

export default async function getProducts(params: ProductsParams) {
  try {
    // 프로덕트의 데이터들 중에 뽑아낼 데이터들
    const { category, latitude, longitude, skip } = params;

    let query: any = {};

    // 카테고리가 있으면 쿼리에 카테고리 키에 카테고리 값 넣기
    if (category) {
      query.category = category;
    }
    if (latitude) {
      query.latitude = {
        gte: Number(latitude) - 0.01,
        lte: Number(latitude) + 0.01,
      };
    }
    if (longitude) {
      query.longitude = {
        gte: Number(longitude) - 0.01,
        lte: Number(longitude) + 0.01,
      };
    }

    // 모든 아이템 가져오기 페이지네이션 용
    const totalItems = await prisma.product.count({
      where: query,
    });

    const products = await prisma.product.findMany({
      where: query,
      orderBy: {
        //내림차순
        createdAt: 'desc',
      },
      // 실제 페이지 수대로 가져오기
      skip: skip ? Number(skip) : 0,
      take: PRODUCTS_PER_PAGE,
    });

    return { data: products, totalItems };
  } catch (error: any) {
    throw new Error(error);
  }
}
