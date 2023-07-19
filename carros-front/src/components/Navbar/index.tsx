import { Box, AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { token, setToken } = useAuth()
  const isLogged = !!token
  const navigate = useNavigate()

  const handleLoginButtonClick = () => {
    navigate("/login")
  }

  const handleLogoutButtonClick = () => {
    setToken("")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ bgcolor: "#232323" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", height: '10vh' }}>
          <Box sx={{ width: "1200px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              <Link component={RouterLink} to="/" underline="none" color="#fff">
                Verzel Carros
              </Link>
            </Typography>
            {
              isLogged
                ? <Button color="inherit" onClick={handleLogoutButtonClick}>Sair</Button>
                : <Button color="inherit" onClick={handleLoginButtonClick}>Entrar</Button>
            }
          </Box>
        </Toolbar>
      </AppBar >
    </Box >
  );
}

export default Navbar;