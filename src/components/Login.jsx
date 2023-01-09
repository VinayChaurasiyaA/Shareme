import {useEffect} from 'react'
import logo from '../assets/logo.jpg'
import GoogleLogin from "react-google-login";
import {FcGoogle} from 'react-icons/fc'
import { json, useNavigate } from "react-router-dom";
import {gapi} from 'gapi-script'
import {client} from '../client'
import sharedVideo from '../assets/example.mp4';

const Login = () => {
  const naviagte = useNavigate();
  // useEffect(() => {
  //   gapi.load("client:auth2" , () => {
  //     gapi.auth2.init({clientId :process.env.REACT_APP_GOOGLE_API_TOKEN})
  //   })
  // } , [])
  const responseGoogle = (response) => {
   // console.log(response);
   localStorage.setItem('user' , JSON.stringify(response.profileObj));

   const {name , googleId , imageUrl} = response.profileObj;
   const doc = {
    _id: googleId ,
    _type : 'user' ,
    username : name,
    image : imageUrl,
   } 
   client.createIfNotExists(doc).then(()=> {
    naviagte('/' , {replace: true})
   });
  console.log(response);
  }
  
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className="relative w-full h-full">
        <video src={sharedVideo}
        type = "video/mp4"
        controls = {false}
        loop
        autoPlay
        muted
        className='w-full h-full object-cover'
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay" >
          <div className="p-5">
            <img src={logo} width='130px' alt="logo" />
          </div>
          <div>
            <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps)=> (
              <button
              type='button'
              className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              >
                <FcGoogle className='mr-4'/> Sign up with google
              </button>
            )}
            onSuccess = {responseGoogle}
            onFailure = {responseGoogle}
            cookiePolicy = "single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
