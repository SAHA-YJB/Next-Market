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
      // hasFavoite(좋아요가 되어 있다면) 트루라면 삭제, 아니라면 추가
      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${productId}`);
      } else {
        request = () => axios.post(`/api/favorites/${productId}`);
      }

      await request();
      // 업데이트가 되면 화면에서 바로 보여주기 위한 넥스트의 권장 방법
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
