import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

export const uploadImage = (
  file,
  userID,
  setProgress,
  setModalOpen,
  setCurrentImage,
  setNewImagePresent
) => {
  const profilePicsRef = ref(storage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
      if (progress === 100)
        setModalOpen(false),
          setCurrentImage({}),
          setProgress(0),
          setNewImagePresent(false);
    },
    (error) => {
      console.error(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        editProfile(userID, { imageLink: response });
      });
    }
  );
};

export const uploadPostImage = (file, setPostImage, setProgress) => {
  const postPicsRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postPicsRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress)
      if(progress===100){
        setTimeout(() => {
            setProgress(0)
        }, 1000)
      }
    },
    (error) => {
      console.error(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {setPostImage(response)});
    }
  );
};
