// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
import axios from "axios";

interface LoginResponse {
  token: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      login(token);

      alert("Zalogowano pomyślnie!");
      navigate("/search");
    } catch (error: any) {
      console.error('Login error: ', error);

      if (error.response) {
        alert(`Błąd logowania: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        alert("Brak odpowiedzi z serwera.");
      } else {
        alert("Wystąpił błąd podczas logowania.");
      }
    }
  };


  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl mb-4">Logowanie</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
