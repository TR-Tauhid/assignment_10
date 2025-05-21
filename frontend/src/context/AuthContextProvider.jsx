
import { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { toast, Zoom } from "react-toastify";


import AuthContext from './AuthContext'; 

export const AuthProvider = ({ children }) => {

    const [theme, setTheme] = useState("light");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            setTheme("dark");
            document.documentElement.setAttribute("data-theme", "dark");
        }
    };

    const notify = (msg, type) => {
        toast[type](msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme,
            transition: Zoom,
        });
    };

    const createUserWithEmailPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithEmailPass = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const facebookProvider = new FacebookAuthProvider();
    const facebookSignIn = () => {
        return signInWithPopup(auth, facebookProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); 
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const logOut = () => {
        return signOut(auth);
    };

    const authInfo = {
        createUserWithEmailPass,
        signInWithEmailPass,
        googleSignIn,
        facebookSignIn,
        user,
        logOut,
        notify,
        theme,
        toggleTheme,
        loading, 
        setLoading,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};


export default AuthProvider;