import React from 'react'
import Button from './Button'
import authService from '../appwrite/auth'

function AnonymousLogin() {
    const createAnonymous = ()=>{
        authService.loginAnonymous()
          .then((session)=>{
            console.log(session);
          })
          .catch((error)=>{
            console.log(error);
          })
    }
    const getuser = ()=>{
      authService.getCurrentUser().then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    }
  return (<>
     <Button
    className=''
    onClick = {createAnonymous}
    >
        Anonymous
    </Button>
    <Button
    className=''
    onClick = {getuser}
    >
        GetUser
    </Button>
  </>
   
  )
}

export default AnonymousLogin