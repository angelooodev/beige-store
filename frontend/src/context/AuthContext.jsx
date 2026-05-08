import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check if a user is already logged in when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('coffee_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('coffee_token', userData.token);
    localStorage.setItem('coffee_user', JSON.stringify(userData));
    setUser(userData); // Instantly updates the whole app
  };

  const logout = () => {
    localStorage.removeItem('coffee_token');
    localStorage.removeItem('coffee_user');
    setUser(null); // Instantly logs them out globally
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}