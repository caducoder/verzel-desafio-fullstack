import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import CarRegister from './pages/CarRegister';
import RequireAuth from './components/RequireAuth';
import CardDetails from './pages/CarDetails';
import CarEdit from './pages/CarEdit';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 min
      cacheTime: 5 * (60 * 1000), // 5 mins
    },
  },
})

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carro/:id" element={<CardDetails />} />

            <Route element={<RequireAuth />}>
              <Route path="/cadastrar-carro" element={<CarRegister />} />
              <Route path="/edicao/:id" element={<CarEdit />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
