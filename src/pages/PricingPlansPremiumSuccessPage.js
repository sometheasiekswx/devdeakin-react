import React, { useEffect } from 'react'

import { createSearchParams, useNavigate } from 'react-router-dom'

import { firebaseDb, useFirebaseAuth } from '../firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

import { checkIfCustomerExists } from '../api'

import Box from '@mui/material/Box'


const PricingPlansPremiumSuccessPage = () => {
    const user = useFirebaseAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.email) {
                const q = query(
                    collection(firebaseDb, 'premium-plan-members',),
                    where('email', '==', user.email)
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
                    setTimeout(() => {
                        navigate({
                            pathname: '/',
                            search: createSearchParams({
                                newuser: true
                            }).toString()
                        })
                    }, 500)
                }

                const result = await checkIfCustomerExists(user.email)
                if (result.data) {
                    const docRef = await addDoc(collection(firebaseDb, 'premium-plan-members'), {
                        email: user.email,
                        'subscribed': result.data,
                    })
                }
            }
        }

        fetchData()
    }, [user])

    return (
        <Box sx={{p: 4, m: 4, border: 2, borderColor: 'primary.main', color: 'primary.main', backgroundColor: 'white'}}>
            <h1>Thanks for your order!</h1>
            <p>
                We appreciate your business!
            </p>
            <p>
                If you have any questions, please email <a href='mailto:ssiek@deakin.edu.au'>ssiek@deakin.edu.au</a>
            </p>
        </Box>
    )
}

export default PricingPlansPremiumSuccessPage
