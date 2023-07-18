import { Box } from "@mui/material"

function Footer() {
  return (
    <footer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#232323',
          color: '#fff',
          height: '10vh',
          textAlign: 'center'
        }}
      >
        <p>Copyright © {new Date().getFullYear()} Caducoder, Todos os Direitos Reservados</p>
      </Box>
    </footer>
  );
}

export default Footer;