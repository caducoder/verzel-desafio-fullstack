import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import FormInput from '../components/FormInput';
import { useForm } from 'react-hook-form';
import FileInput from '../components/FileInput';
import useAuth from '../hooks/useAuth';
import { Carro } from '../types';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getCarById, updateCar } from '../api/CarroService';
import { useNavigate, useParams } from 'react-router-dom';

function CarEdit() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { control, handleSubmit, setValue } = useForm<Carro>()
  const isLessThan768px = useMediaQuery('(max-width:768px)')
  const [foto, setFoto] = useState<File>();
  const [fileDataUrl, setFileDataUrl] = useState<null | string | ArrayBuffer>(null);
  const { data: car } = useQuery("get-by-id", async () => {
    const res = await getCarById(Number(id))
    setValue('nome', res.nome)
    setValue('marca', res.marca)
    setValue('modelo', res.modelo)
    setValue('valor', res.valor)
    setFileDataUrl(res.foto)
    return res
  })

  const { mutate: updateCarr } = useMutation((carUpdated: Carro) => {
    return updateCar(car!.id!, carUpdated, token);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-all-cars"])
        .then(() => navigate("/"))
        .catch(err => console.log(err))
    }
  })

  const onSubmit = (data: Carro) => {
    updateCarr(data)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setFoto(file)
      const reader = new FileReader();

      reader.onload = function (event) {
        const result = event.target?.result;
        if (result) {
          setFileDataUrl(result)
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const goBack = () => navigate(-1);

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center" mt={2}>
        Edição do Carro
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            alignItems: isLessThan768px ? 'center' : 'flex-start',
            flexDirection: isLessThan768px ? 'column' : 'row',
            mb: 4
          }}
        >
          <FileInput fileDataUrl={fileDataUrl as string} handleFileChange={handleFileChange} />
          <Stack gap={2} width={300} >
            <FormInput
              name="nome"
              control={control}
              label="Nome"
              type='text'
              required
              errorText='Preencha o nome'
            />
            <FormInput
              name="marca"
              control={control}
              label="Marca"
              type='text'
              required
              errorText='Preencha a marca'
            />
            <FormInput
              name="modelo"
              control={control}
              label="Modelo"
              type='text'
              required
              errorText='Preencha o modelo'
            />
            <FormInput
              name="valor"
              control={control}
              label="Valor"
              type='number'
            />
            <Stack gap={2}>
              <Button
                type='submit'
                variant='contained'
                color='success'
                sx={{ justifySelf: 'center' }}
              >
                Salvar
              </Button>
              <Button
                variant='outlined'
                color='error'
                sx={{ justifySelf: 'center' }}
                onClick={goBack}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </div>
  );
}

export default CarEdit;

