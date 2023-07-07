import {signInWithEmailAndPassword, getAuth} from 'firebase/auth'
import { auth } from '../firebaseConfig'

export const LoginAPI = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
};