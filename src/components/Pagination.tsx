'use client';
import Pagination from '@lucasmogari/react-pagination';
import PaginationLink from './PaginationLink';

interface PaginationProps {
  page: number;
  perPage: number;
  totalItems: number;
}

const PaginationComponent = ({
  page,
  perPage,
  totalItems,
}: PaginationProps) => {
  const { fromItem, toItem, getPageItem, totalPages } = Pagination({
    totalItems: totalItems,
    page: page,
    itemsPerPage: perPage,
    maxPageItems: 3,
  });

  const firstPage = 1;
  const nextPage = Math.min(page + 1, totalPages);
  const prevPage = Math.max(page - 1, firstPage);
  // 뒤< 앞>의 <> 화살표를 위해 + 2
  const arr = new Array(totalPages + 2);

  return (
    <div className='flex items-center justify-center gap-2 mt-4'>
      {/* <1 2 3> 이런 구조를 만들기 위한 값 */}
      {[...arr].map((_, i) => {
        // 스타일링을 위한 page, disabled, current 추출하기
        const { page, disabled, current } = getPageItem(i);

        if (page === 'previous') {
          return (
            <PaginationLink page={prevPage} disabled={disabled} key={i}>
              {'<'}
            </PaginationLink>
          );
        }

        if (page === 'next') {
          return (
            <PaginationLink page={nextPage} disabled={disabled} key={i}>
              {'>'}
            </PaginationLink>
          );
        }

        if (page === 'gap') {
          return <span key={i}>{'...'}</span>;
        }
        return (
          <PaginationLink page={page} active={current} key={i}>
            {page}
          </PaginationLink>
        );
      })}
    </div>
  );
};

export default PaginationComponent;
{
}
