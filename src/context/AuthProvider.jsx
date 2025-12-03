import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    sendEmailVerification,
    GithubAuthProvider,
    sendPasswordResetEmail,
} from 'firebase/auth';

import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { authAPI } from '../services/api';


const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    console.log(user);



    const updateUser = (updateData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateData)
    }


    const provider = new GoogleAuthProvider();



    // inside AuthProvider
    const githubProvider = new GithubAuthProvider();

    const githubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };






    const createUser = async (email, password, name) => {
        setLoading(true);
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // update profile
        if (name) await updateProfile(cred.user, { displayName: name });
        // send verification email
        await sendEmailVerification(cred.user);
        return cred;
    };


    // update user profile
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        });
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            
            // Sync user to MongoDB when authenticated
            if (currentUser) {
                try {
                    await authAPI.syncUser(currentUser);
                } catch (error) {
                    console.error('Failed to sync user to MongoDB:', error);
                    // Don't block user if sync fails
                }
            }
            
            setLoading(false);
        });

        return () => {
            unsubscribe()
        }
    }, []);


    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)

    };


    const userInfo = {
        createUser,
        googleSignIn,
        loading,
        setLoading,
        user,
        setUser,
        updateUser,
        logInUser,
        githubSignIn,
        resetPassword,
        updateUserProfile





    }
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;