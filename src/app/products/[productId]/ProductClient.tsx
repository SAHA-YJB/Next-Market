'use client';
import { Product, User } from '@prisma/client';

interface ProductClientProps {
  currentUser?: User | null;
  product: Product & { user: User };
}

const ProductClient = ({ product, currentUser }: ProductClientProps) => {
  return <div>ProductClient</div>;
};

export default ProductClient;
