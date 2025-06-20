import { AuthProvider } from './AuthContext';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
