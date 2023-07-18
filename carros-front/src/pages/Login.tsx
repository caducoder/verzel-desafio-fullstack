import { Paper, Typography, Button, Stack } from '@mui/material'
import { useForm } from "react-hook-form";
import FormInput from '../components/FormInput';

export interface ILoginProps {
  email: string,
  senha: string
}

function Login() {
  const { handleSubmit, control } = useForm<ILoginProps>()

  const onSubmit = (data: ILoginProps) => {
    console.log(data)
  }

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
    </section>
  );
}

export default Login;