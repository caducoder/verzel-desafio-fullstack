import { Box, AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()

  const handleLoginButtonClick = () => {
    navigate("/login")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#232323" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            <Link component={RouterLink} to="/" underline="none" color="#fff">
              Verzel Carros
            </Link>
          </Typography>
          <Button color="inherit" onClick={handleLoginButtonClick}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;