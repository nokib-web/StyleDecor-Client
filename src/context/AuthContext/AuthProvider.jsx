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

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register User
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign In User
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign In with Google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Update User Profile
    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    };

    // Sign Out User
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
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

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
