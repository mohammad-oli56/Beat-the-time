import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [userprofile, setUserprofile] = useState(null);
    const [loding, setLoding] = useState(true);
    

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const google = () => signInWithPopup(auth, provider);
    const uselogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const handelLogout = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            console.log(error)
        });
    }

    const handelForgetpass = (email) => {
       return sendPasswordResetEmail(auth, email)
            // .then(() => toast.success("Reset password email sent!"))
            // .catch(() => toast.error("Failed to send reset email."));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userprofile) => {
            setUserprofile(userprofile);
            setLoding(false);
        });
        return () => unsubscribe();
    }, []);


    const authinfo = {
        signup,
        userprofile,
        loding,
        handelLogout,
        google,
        uselogin,
        handelForgetpass,
       
    };

    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
