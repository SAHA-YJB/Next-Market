import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface UseFavorite {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
  const router = useRouter();
  const hasFavoite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(productId);
  }, [productId, currentUser]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    try {
      let request;
      // hasFavoite 트루라면 삭제, 아니라면 추가 트루라면 이미 되어있는 것임
      if (hasFavoite) {
        request = () => axios.delete(`/api/favorites/${productId}`);
      } else {
        request = () => axios.post(`/api/favorites/${productId}`);
      }

      await request();
      router.refresh();
    } catch (error) {
      console.error('좋아요 에러', error);
    }
  };

  return { hasFavoite, toggleFavorite };
};
export default useFavorite;
