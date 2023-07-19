import { useState } from "react";
import { getAllCars } from "../api/CarroService";
import { useQuery } from "react-query";
import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import CarList from "../components/CarList";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
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

  const handleAddCarButtonClick = () => {
    navigate("/cadastrar-carro")
  }

  return (
    <Box mb={2}>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center" mt={2}>Carros Disponíveis</Typography>
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
        {isLogged &&
          <Button variant="contained" onClick={handleAddCarButtonClick}>Adicionar</Button>
        }
      </Box>
      <CarList
        carros={data!}
        handlePageChange={handlePageChange}
        isLoading={isFetching}
        page={page}
        totalPages={totalPages}
      />
    </Box>
  );
}

export default Home;