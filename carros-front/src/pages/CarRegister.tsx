
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Carro } from '../types';
import FormInput from '../components/FormInput';
import { addCar } from '../api/CarroService';
import useAuth from '../hooks/useAuth';
import FileInput from '../components/FileInput';

function CarRegister() {
  const { token } = useAuth()
  const isLessThan768px = useMediaQuery('(max-width:768px)')
  const { control, handleSubmit, reset } = useForm<Carro>()
  const [foto, setFoto] = useState<File>();
  const [fileDataUrl, setFileDataUrl] = useState<null | string | ArrayBuffer>(null);

  const onSubmit = async (data: Carro) => {
    const formData = new FormData()

    formData.append("car", new Blob([JSON.stringify(data)], {
      type: "application/json"
    }))

    formData.append("image", foto!)

    await addCar(formData, token)

    reset()
    setFoto(undefined)
    setFileDataUrl(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      console.log(file);
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

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center" mt={2}>Registrar Carro</Typography>
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
            <Button type='submit' variant='contained' sx={{ justifySelf: 'center' }}>Cadastrar</Button>
          </Stack>
        </Box>
      </form>
    </>
  );
}

export default CarRegister;