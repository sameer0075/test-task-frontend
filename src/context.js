import React, { createContext, useState } from "react";
export const MyContext = createContext();

const AuthState = ({ children }) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState({});
  return (
    <MyContext.Provider value={{ count, setCount, setValue, value }}>
      {children}
    </MyContext.Provider>
  );
};

export default AuthState;
