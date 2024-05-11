import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../Features/UserSlice'

const SignInAndSignUp = () => {
  let navigate = useNavigate();
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  let { isSignIn } = useSelector((store) => store.user)

  useEffect(() => {
    if(isSignIn){
      navigate("/")
    }
  },[isSignIn])

  const dispatch = useDispatch();

  const handleSignIn = (name,password) => {
    dispatch(signIn({name,password}))
  }

  const handleSignUp = (name,password) => {
    dispatch(signUp({name,password}))
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-wide text-indigo-900">
            SignIn or SignUp your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center mb-4 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleSignIn(name,password)}
              >
                SignIn
              </button>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                onClick={() => handleSignUp(name,password)}
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mt-10 text-sm text-indigo-500 font-bold leading-9 tracking-wide text-justify">
            Password has at least 6 characters.And must contain at least one alphabet character and one numeric character.If you sign up,you will get $1000 for this account.
          </p>
        </div>
      </div>
  )
}

export default SignInAndSignUp