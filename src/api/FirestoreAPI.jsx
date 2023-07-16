import { firestore } from "../firebaseConfig"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { toast } from "react-toastify"

let postsRef = collection(firestore, "posts")
let userRef = collection(firestore, "users")

export const postStatus = (object) =>{
    addDoc(postsRef, object)
    .then((res) =>{
        toast.success('Successfully posted')
    })
    .catch((err) => {
        console.log(err)
    })

}

export const getStatus = ( setAllStatuses) => {
    onSnapshot(postsRef, (response) =>{
        setAllStatuses(response.docs.map((docs) =>{
            return { ...docs.data(), id: docs.id }
        }))     
    })
}

export const postUserData = (object) => {
    addDoc(userRef, object)
    .then(() => {})
    .catch((err) =>{
        console.log(err)
    })
}

export const getCurrentUser = (setCurrentUser) =>{
    let currEmail = localStorage.getItem("userEmail")
    onSnapshot(userRef, (response) =>{
        setCurrentUser(
            response.docs.map((docs) => {
                return {...docs.data(), userID:docs.id}
            }).filter((item) => {
                return item.email === currEmail
            })[0]
        )
    })
}