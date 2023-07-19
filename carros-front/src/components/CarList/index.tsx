import {
  Box,
  Pagination,
  useMediaQuery
} from '@mui/material';
import { Carro } from '../../types';
import Loading from '../Loading';
import CarCard from '../CarCard';

function CarList({
  carros,
  page,
  totalPages,
  handlePageChange,
  isLoading
}: {
  carros: Carro[],
  page: number,
  totalPages: number | undefined,
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void,
  isLoading: boolean
}) {
  const isLessThan768px = useMediaQuery('(min-width:768px)')

  if (isLoading) return <Loading />
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: isLessThan768px ? 'space-between' : 'center' }}>
        {
          carros.map(c => <CarCard key={c.id} {...c} />)
        }
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page + 1}
          siblingCount={1}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

export default CarList;