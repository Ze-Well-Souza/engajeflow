import React, { useState } from "react";
import { Link } from "react-router-dom";

// Versão simplificada da página de registro para diagnóstico
const RegisterPage: React.FC = () => {
  console.log("RegisterPage: Iniciando renderização");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [demoMode, setDemoMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  console.log("RegisterPage: Estado inicializado");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RegisterPage: Formulário submetido");
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Todos os campos são obrigatórios");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("As senhas não conferem");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage("");
    
    // Simulação de registro bem-sucedido no modo demo
    if (demoMode) {
      setTimeout(() => {
        setSuccessMessage("Conta criada com sucesso no modo de demonstração!");
        setIsSubmitting(false);
      }, 1500);
    } else {
      // Aqui iria a lógica real de registro com Supabase
      setTimeout(() => {
        setErrorMessage("Erro ao conectar com Supabase. Use o modo de demonstração.");
        setIsSubmitting(false);
      }, 1500);
    }
  };

  console.log("RegisterPage: Renderizando componente");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Seu nome"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirme a senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Registrar"}
          </button>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setDemoMode(!demoMode)}
              className="px-3 py-1 text-sm border rounded"
            >
              {demoMode ? "Desativar modo demo" : "Ativar modo demo"}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p>
              Já tem uma conta?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
