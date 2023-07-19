import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

/* 
   função que verifica se o usuário esta logado quando visita uma rota
   protegida. Caso não esteja, é redirecionado para tela de login.
*/
function RequireAuth() {
  const { token } = useAuth()
  const isLogged = !!token
  const location = useLocation();

  return (
    //<Outlet />
    isLogged
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default RequireAuth;