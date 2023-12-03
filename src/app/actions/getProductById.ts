import { Params } from '../products/[productId]/page';
import prisma from '@/helpers/prismadb';

export default async function getProductById(params: Params) {
  try {
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      // 유저정보도 포함시키기
      include: {
        user: true,
      },
    });

    if (!product) {
      throw new Error('상품이 존재하지 않습니다.');
    }
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
