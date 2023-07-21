import { Paper, Typography, Button, Stack, Snackbar } from '@mui/material'
import { useForm } from "react-hook-form";
import FormInput from '../components/FormInput';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AlertMessage } from '../components/AlertMessage';

export interface ILoginProps {
  email: string,
  senha: string
}

interface ILoginResponse {
  token: string
}

function Login() {
  const navigate = useNavigate()
  const { setToken } = useAuth()
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | unknown>("");
  const { handleSubmit, control } = useForm<ILoginProps>()

  const onSubmit = async ({ email, senha }: ILoginProps) => {
    try {
      const { data } = await api.post<ILoginResponse>('/login',
        JSON.stringify({ email, senha }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )

      setToken(data.token)
      navigate("/")
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMsg(error.response?.data)
        setOpenAlert(true)
      }
    }
  }

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <section
      style={{
        backgroundImage: "url(/carros-vitrine.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: '80vh',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper sx={{ p: 2, textAlign: 'center', width: '400px', mx: 2 }}>
        <Typography variant='h5' gutterBottom>Entrar</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormInput
              name="email"
              control={control}
              label="Email"
              type='email'
              required
              errorText='Preencha o email'
            />
            <FormInput
              name='senha'
              control={control}
              label="Senha"
              type='password'
              required
              errorText='Preencha a senha'
            />
            <Button type='submit' variant='contained' sx={{ fontWeight: 'bold' }}>Login</Button>
          </Stack>
        </form>
      </Paper>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <AlertMessage severity='error'>{errorMsg as string}</AlertMessage>
      </Snackbar>
    </section>
  );
}

export default Login;