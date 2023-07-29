import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then((res) => {
      toast.success("Successfully posted");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatus = (setAllStatuses) => {
  onSnapshot(postsRef, (response) => {
    setAllStatuses(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  let currEmail = localStorage.getItem("userEmail");
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), userID: docs.id };
        })
        .filter((item) => {
          return item.email === currEmail;
        })[0]
    );
  });
};

export const getPostUser = (setPostUser, postEmail) => {
  let currEmail = localStorage.getItem("userEmail");
  onSnapshot(userRef, (response) => {
    setPostUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), userID: docs.id };
        })
        .filter((item) => {
          return item.email === postEmail;
        })[0]
    );
  });
};

export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Successfully updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const likePost = (userID, postID, liked) => {
  try {
    let docToLike = doc(likeRef, `${userID}_${postID}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userID, postID });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLikesByUser = (userID, postID, setLikesCount, setLiked) => {
  try {
    let likeQuery = query(likeRef, where("postID", "==", postID));
    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes.length;
      const isLiked = likes.some((like) => like.userID === userID);
      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (postID, comment, timestamp,email) => {
  try {
    addDoc(commentsRef, {
      postID,
      comment,
      timestamp,
      email
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComments = (postID, setComments) => {
    try{
        let singlePostQuery = query(commentsRef, where('postID', '==', postID))
        onSnapshot(singlePostQuery, (response) =>{
          const comments = response.docs.map((doc) => {
            return{
              id: doc.id,
              ...doc.data(),
            }
          })
          setComments(comments)
        })
    }catch(err){
        console.log(err)
    }
}

export const updatePost = (postID, status) => {
  let docToUpdate = doc(postsRef, postID)

  try{
    updateDoc(docToUpdate,  {status} )
    toast.success("Post has been updated")
  }
  catch(err){
    console.log(err)
  }
} 

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id)
  try{
    deleteDoc(docToDelete)
    toast.success("Post has been deleted")
  }catch(err){
    console.log(err)
  }
}