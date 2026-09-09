import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'ANALYST' | 'INTERVIEWER' | 'OPERATOR';
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Demo user
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin Agepe (DEMONSTRATIVO)',
    role: 'ADMIN'
  });

  const login = () => setUser({ id: '1', name: 'Admin Agepe (DEMONSTRATIVO)', role: 'ADMIN' });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};\n