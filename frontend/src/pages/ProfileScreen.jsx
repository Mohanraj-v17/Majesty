import React from 'react'
import { useNavigate } from "react-router-dom";



const ProfileScreen = () => {

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  return (
   <div className="flex items-center justify-center 
                py-48 my-20 h-96 mx-48 
                bg-base-200 rounded-xl">

  <div className="text-center">
    <h1 className="text-3xl font-bold text-base-content mb-2">
      {userInfo?.name}
    </h1>

    <p className="text-lg opacity-70">
      {userInfo?.email}
    </p>
    <button 
    onClick={() => navigate("/profile/edit")}
     className="btn btn-primary bg-base-content mt-4">
  Edit Profile
</button>
  </div>
</div>
  )
}

export default ProfileScreen