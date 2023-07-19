import React from "react";
import { createContext, useState } from "react";

export interface IContext {
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>
}

// contexto que permite que o token possa ser acessado de qualquer lugar da aplicação
const AuthContext = createContext({} as IContext)

// função que fornece o contexto de autenticação
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string>('');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {/* o componente que for colocado dentro do AuthProvider, vai ter acesso ao token */}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;