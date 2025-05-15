import { useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from './AuthContext';
  
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    const createUserWithEmailPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signInWithEmailPass = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const facebookProvider = new FacebookAuthProvider();
    const facebookSignIn = () => {
        return signInWithPopup(auth, facebookProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const logOut = () => {
        return signOut(auth);
    }

const authInfo = {
    createUserWithEmailPass,
    signInWithEmailPass,
    googleSignIn,
    facebookSignIn,
    user,
    logOut,
}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;