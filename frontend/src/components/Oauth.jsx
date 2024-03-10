import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../app/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Oauth = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const auth = getAuth(app);
    const handleGoogleClick = async () => {

        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultFromGoogle);

            const res = await fetch(`/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    photoURL: resultFromGoogle.user.photoURL
                })
            });
            const data = await res.json();
            if (res.ok === true) {
                dispatch(signInSuccess(data));
                navigate('/');
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />Continue with Google
        </Button>
    )
}

export default Oauth