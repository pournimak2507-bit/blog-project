import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Expect backend login to return { user, token, message? }
  const login = (data) => {
    // data could be { user, token } or previously full res.data
    const u = data.user ? data.user : data;
    const token = data.token ? data.token : data.user?.token || null;

    // store combined object: { ...userFields, token }
    const userWithToken = token ? { ...u, token } : u;

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
