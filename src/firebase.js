import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const firebaseApp = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getFirestore(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)

const FirebaseAuthContext = createContext(undefined)

const FirebaseAuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const value = {user}

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (u) => {
            setUser(u)
            if (u && u.email) {
                const q = query(
                    collection(firebaseDb, 'premium-plan-members',),
                    where('email', '==', u.email)
                )
                const querySnapshot = await getDocs(q)
                let data = {}
                querySnapshot.forEach((doc) => {
                    const docData = doc.data()
                    data = {
                        id: doc.id,
                        ...docData
                    }
                })
                if (data && data.subscribed) {
                    setUser({...u, premiumSubscription: true})
                }
            }
        })
    }, [])

    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}

function useFirebaseAuth() {
    const context = useContext(FirebaseAuthContext)
    if (context === undefined) {
        throw new Error(
            'useFirebaseAuth must be used within a FirebaseAuthProvider'
        )
    }
    return context.user
}

export { FirebaseAuthProvider, useFirebaseAuth }