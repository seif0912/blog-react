import React from 'react'
import { useParams } from 'react-router-dom'
const ProfilePage = () => {
  let { profileId } = useParams();
  console.log(profileId)
  return (
    <div>
      <h1>ProfilePage: {profileId}</h1>
    </div>
  )
}

export default ProfilePage
