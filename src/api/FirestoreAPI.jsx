import { firestore } from "../firebaseConfig"
import { addDoc, collection, onSnapshot, doc, updateDoc } from "firebase/firestore"
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

export const getPostUser = (setPostUser,postEmail) =>{
    let currEmail = localStorage.getItem("userEmail")
    onSnapshot(userRef, (response) =>{
        setPostUser(
            response.docs.map((docs) => {
                return {...docs.data(), userID:docs.id}
            }).filter((item) => {
                return item.email === postEmail
            })[0]
        )
    })
}

export const editProfile = (userID, payload) =>{
    let userToEdit = doc(userRef, userID)

    updateDoc(userToEdit, payload)
    .then(() => {
        toast.success('Successfully updated')
    })
    .catch((err) =>{
        console.log(err)
    })
}