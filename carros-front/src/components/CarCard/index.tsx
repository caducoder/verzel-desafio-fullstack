import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Carro } from '../../types';

function CarCard({ nome, marca, modelo, valor, foto }: Carro) {
  return (
    <Card sx={{ width: 250 }}>
      <CardActionArea sx={{}}>
        <CardMedia
          component="img"
          height="140"
          image={foto}
          alt="carro"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {marca} | {modelo} | R${valor},00
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CarCard;