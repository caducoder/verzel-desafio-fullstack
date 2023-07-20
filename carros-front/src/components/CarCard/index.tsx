import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Carro } from '../../types';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function CarCard({ carro, handleClickDeleteIcon }: { carro: Carro, handleClickDeleteIcon: (id: number) => void },) {
  const { token } = useAuth()
  const navigate = useNavigate()
  const isLogged = !!token

  const handleCardClick = () => {
    navigate(`/carro/${carro.id!}`)
  }

  const handleClickEditIcon = () => {
    navigate(`/edicao/${carro.id!}`)
  }

  return (
    <Card sx={{ width: 250 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          image={carro.foto}
          alt="carro"
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', minHeight: 150, justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="body1" component="div">
            {carro.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {carro.marca} {carro.modelo}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            R${new Intl.NumberFormat().format(carro.valor)}
          </Typography>
        </CardContent>
      </CardActionArea>
      {isLogged &&
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton aria-label="delete" color='info' onClick={handleClickEditIcon}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color='error' onClick={() => handleClickDeleteIcon(carro.id!)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      }
    </Card>
  );
}

export default CarCard;