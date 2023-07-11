import React, { useEffect, useState } from 'react'
import HomeComponent from '../Components/HomeComponent'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import Loader from '../Components/common/Loader'

export function Home() {
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if(!res?.accessToken){
                navigate('/login')
              }
            else{
                setLoading(false)
            }
        } )
    }, [])
  return loading ? <Loader /> : <HomeComponent />
}

export default Home