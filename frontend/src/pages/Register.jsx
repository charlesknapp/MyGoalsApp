import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.dark(message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }

    if (isSuccess ^ user) {
      navigate('/')
      toast.dark("Account created", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.dark("Passwords do not match", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
  <div class="mainContainer">
    <div class="adContainer">
      <div class="AdvertisementImage">
      <p class="advertisementInfo">Sponsored Advertisement</p>
        <img src="https://s3.envato.com/files/60224096/PNG/Marketing%20Banner%20ad%202%20250x250.png" alt="Advertisement" />
      </div>
    </div>

    <section class="AuthContainer">
      <section class='heading'>
        {/* <h1 class="loginHeader">
          <FaUser /> Register
        </h1> */}
        <p class="loginDesc">Please create an account</p>
      </section>

      <section class='form'>
        <form autocomplete="off" onSubmit={onSubmit}>
          <div class='form-group'>
            <input
              type='text'
              class='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
              autocomplete="off"
            />
          </div>
          <div class='form-group'>
            <input
              type='email'
              class='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
              autocomplete="off"
            />
          </div>
          <div class='form-group'>
            <input
              type='password'
              class='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
              autocomplete="off"
            />
          </div>
          <div class='form-group'>
            <input
              type='password'
              class='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
              autocomplete="off"
            />
          </div>
          <div class='form-group'>
            <button type='submit' class='btn btn-block'>
              Create your account
            </button>
          </div>
        </form>
      </section>
    </section>
    <div class="adContainer">
      <div class="AdvertisementImage">
      <p class="advertisementInfo">Sponsored Advertisement</p>
        <img src="https://blog.photoadking.com/wp-content/uploads/2021/01/1610011693867-1.png" alt="Advertisement" />
      </div>
    </div>
  </div>
    </>
  )
}

export default Register
