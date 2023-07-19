import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';
import Navbar from "../Navbar";
import Footer from "../Footer";

function Layout() {

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default Layout;