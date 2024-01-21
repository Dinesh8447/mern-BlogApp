import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signinfailure,signinstart,signinsuccess } from '../../redux/user/userSlice'


export default function Oauth() {
    const auth = getAuth(app)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handlegoogleauth = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultformgoogle = await signInWithPopup(auth, provider)
            axios.post('/auth/google', {
                name: resultformgoogle.user.displayName,
                email: resultformgoogle.user.email,
                photourl: resultformgoogle.user.photoURL,
            }).then(({ data }) => {
                dispatch(signinsuccess(data))
                navigate('/')
            })
                .catch(e => {
                    if (e.response.data.success === false) {
                        dispatch(signinfailure(e.response.data.message))
                    }
                })
            // console.log(resultformgoogle)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handlegoogleauth}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Countine with Google
        </Button>
    )
}
