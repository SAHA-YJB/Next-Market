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
    const { category, latitude, longitude, skip } = params;

    let query: any = {};

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
        createdAt: 'desc',
      },
      skip: skip ? Number(skip) : 0,
      take: PRODUCTS_PER_PAGE,
    });

    return { data: products, totalItems };
  } catch (error: any) {
    throw new Error(error);
  }
}
