import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import CarRegister from './pages/CarRegister';
import RequireAuth from './components/RequireAuth';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="/cadastrar-carro" element={<CarRegister />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
