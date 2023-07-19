import { useEffect, useState } from "react";
import { getAllCars } from "../api/CarroService";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import CarList from "../components/CarList";
import useAuth from "../hooks/useAuth";

function Home() {
  // const [carros, setCarros] = useState();
  const { token } = useAuth()
  const isLogged = !!token
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, settotalPages] = useState<number>();
  const { data, isFetching } = useQuery(["get-all-cars", page, pageSize], async () => {
    const res = await getAllCars(page, pageSize)
    setPage(res.number)
    setPageSize(res.size)
    settotalPages(res.totalPages)
    return res.content
  })

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value))
  }


  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>Carros Disponíveis</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant='body1'>Carros por página:</Typography>

          <Select
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            size='small'
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </Box>
        <Button variant="contained">Adicionar</Button>
      </Box>
      <CarList carros={data!} handlePageChange={handlePageChange} isLoading={isFetching} page={page} totalPages={totalPages} />
    </div >
  );
}

export default Home;