import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

interface UseFavorite {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
  const router = useRouter();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(productId);
  }, [productId, currentUser]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      toast.warn('먼저 로그인부터 슝~!');
      router.push('/auth/login');
      return;
    }
    try {
      let request;
      // hasFavoite 트루라면 삭제, 아니라면 추가 트루라면 이미 되어있는 것임
      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${productId}`);
      } else {
        request = () => axios.post(`/api/favorites/${productId}`);
      }

      await request();
      router.refresh();
      toast.success('이 게시글 좋아요!');
    } catch (error) {
      console.error('좋아요 에러', error);
      toast.error('다시 시도해주세요!');
    }
  };

  return { hasFavorite, toggleFavorite };
};
export default useFavorite;
