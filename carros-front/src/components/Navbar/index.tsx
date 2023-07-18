import { Box, AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()

  const handleLoginButtonClick = () => {
    navigate("/login")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ bgcolor: "#232323" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
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
            <Button color="inherit" onClick={handleLoginButtonClick}>Login</Button>
          </Box>
        </Toolbar>
      </AppBar >
    </Box >
  );
}

export default Navbar;