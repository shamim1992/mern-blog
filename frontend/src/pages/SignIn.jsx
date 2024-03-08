import { data } from 'autoprefixer'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../app/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
function SignIn() {
    const [formData, setFormData] = useState({})
    const { loading, error: errorMessage } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.password || !formData.email) {

            return dispatch(signInFailure('Please enter all the required fields'))
        }
        console.log(formData)
        try {
            dispatch(signInStart())
            const res = await fetch(`/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (data.success === false) {
                dispatch(signInFailure(data.message))
            }

            if (res.ok === true) {
                dispatch(signInSuccess())
                navigate('/')
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    }
    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* Left side div */}
                <div className='flex-1'>
                    <Link
                        to='/'
                        className=' font-bold dark:text-white text-4xl'
                    >
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            NE
                        </span>
                        Sportz
                    </Link>
                    <p className='text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, tenetur!</p>
                </div>


                {/* Right side div */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                        <div className='mb-3'>
                            <Label value='Your Email'></Label>
                            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
                        </div>
                        <div className='mb-3'>
                            <Label value='Your Password'></Label>
                            <TextInput type='password' placeholder='*********' id='password' onChange={handleChange} />
                        </div>
                        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {loading ? (<><Spinner size='sm' /> <span className='pl-3'>Loading</span></>) : 'Sign In'}
                        </Button>
                    </form>

                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Don't have an account? </span><Link to={'/signup'} className='text-blue-500'>Sign up</Link>
                    </div>
                    {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>}
                </div>
            </div>
        </div>
    )
}

export default SignIn