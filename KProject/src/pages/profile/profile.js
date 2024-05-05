import './profile.css';
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import { upload } from '../../firebase'

const ProfilePage = () => {
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");



  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update the user's profile information in Firestore
      await db.collection("userProfiles").doc(currentUser.uid).set(
        {
          name,
          address,
          contactNumber,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  };


  function handleChange(e) {
    if (e.target.files[0]) {
      setPhotoURL(e.target.files[0])
    }
  }

  async function handleClick() {
    if (photoURL) {
      const uploadedUrl = await upload(photoURL, currentUser, setLoading);
      if (uploadedUrl) {
        setPhotoURL(uploadedUrl);
        await currentUser.updateProfile({ photoURL: uploadedUrl });
      }
    }
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])

  // ... (the rest of the code remains the same)

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

      <div className="profile-container">
      <div className="profile-header">
        <h1>{name}</h1>
        <img src={photoURL} alt="Profile Picture" / >
      </div>
      <div className="profile-body">
        <p>Email: {currentUser.email}</p>
        <p>Phone: {contactNumber}</p>
        <p>Address: {address}</p>
        
      </div>
    </div>

        <div className="profile-body" >

    <div className='p'>
    <h2>
        Update Profile
      </h2>
    <form onSubmit={handleFormSubmit}>

      
      <div >

        <label htmlFor="name">Name:&nbsp;&nbsp;&nbsp;</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <p></p>



      
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <p></p>
      <div>
        <label htmlFor="contactNumber">Contact:&nbsp;</label>
        
        
        <input
          type="number"
          maxlength="10"
          //max="9999999999"
          id="contactNumber"
          value={contactNumber}
          onChange={(event) => setContactNumber(event.target.value)}
        />
      </div>
      <div>
        <p></p>

<label htmlFor="photo">Profile Picture:&nbsp;</label>
<input
  type="file"
  id="photo"
  accept="image/*"
  onChange={handleChange}
/>
<p></p>
<button type="button" onClick={handleClick}>
  Upload Image
</button>
<p></p>


</div>

        
        <button type="submit">Save Changes</button>
      </form>
      </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
