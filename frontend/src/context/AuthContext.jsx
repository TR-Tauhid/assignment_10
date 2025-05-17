// src/context/AuthContext.js
import { createContext, useContext } from "react";

// Create the context object ONCE outside of any component
const AuthContext = createContext(null);

// Custom hook to consume the context, making it easy to use elsewhere
export const useAuth = () => useContext(AuthContext);

// Export the context object itself, so AuthProvider can use it
export default AuthContext;