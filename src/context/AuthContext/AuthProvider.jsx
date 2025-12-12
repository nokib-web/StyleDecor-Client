// src/contexts/AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    sendEmailVerification
} from 'firebase/auth';
import { auth } from './firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register User (firebase create)
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign In User (email/password) and mint cookies
    const signInUser = async (email, password) => {
        setLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await result.user.getIdToken();
        // Send to backend to mint cookies
        await axios.post('https://style-decor-server-mkbq.onrender.com/auth/firebase-login', { idToken }, { withCredentials: true });
        setLoading(false);
        return result;
    };

    // Sign In with Google + mint cookies
    const signInWithGoogle = async () => {
        setLoading(true);
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        await axios.post('https://style-decor-server-mkbq.onrender.com/auth/firebase-login', { idToken }, { withCredentials: true });
        setLoading(false);
        return result;
    };

    // Update User Profile
    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    };

    // Sign Out User: notify backend to clear refresh token and clear firebase
    const signOutUser = async () => {
        setLoading(true);
        await axios.post('https://style-decor-server-mkbq.onrender.com/auth/logout', {}, { withCredentials: true });
        await signOut(auth);
        setLoading(false);
    };

    // Forgot Password
    const forgotPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    // Verify Email
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    };

    // Observe Auth State Change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser || null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        registerUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateUserProfile,
        forgotPassword,
        verifyEmail,
        user,
        loading,
    };

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;

