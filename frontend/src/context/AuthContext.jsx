import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Expect backend login to return { user, token, message? }
  const login = ({ user, token }) => {
    if (!user || !token) return;

    const userWithToken = { ...user, token };

    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
