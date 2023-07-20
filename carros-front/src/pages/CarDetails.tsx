import { useParams } from "react-router-dom";
import { getCarById } from "../api/CarroService";
import Loading from "../components/Loading";
import { Box, Typography } from '@mui/material'
import { useQuery } from "react-query";

function CardDetails() {
  const routeParams = useParams();
  const { data, isFetching } = useQuery("get-by-id", async () => {
    const res = await getCarById(Number(routeParams.id))
    return res
  })
  if (isFetching) return <Loading />
  return (
    <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom mt={2}>Detalhes do carro</Typography>
      <Box>
        <img src={data?.foto || "https://fakeimg.pl/250x250/"} width={250} />
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Nome:</span> {data?.nome}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Marca:</span> {data?.marca}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Modelo:</span> {data?.modelo}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Valor:</span> R${new Intl.NumberFormat().format(Number(data?.valor))}
        </Typography>
      </Box>
    </Box>
  );
}

export default CardDetails;