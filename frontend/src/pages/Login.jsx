import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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
      toast.dark("Logged in successfully", {
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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
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
        <img src="https://newspaperads.ads2publish.com/wp-content/uploads/2021/07/tata-motors-commercial-vehicles-esay-emi-from-sbi-ad-eenadu-hyderabad-5-7-2021-250x250.jpg" alt="Advertisement" />
      </div>
    </div>

    <section class="AuthContainer">
    <section class='heading'>
        {/* <h1 class="loginHeader">
          <FaSignInAlt /> Login
        </h1> */}
        <p class="loginDesc">Conquer Your Goals</p>
      </section>

      <section class='form'>
        <form id="loginForm" onSubmit={onSubmit} autocomplete="off">
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
            <button type='submit' class='btn btn-block'>
              Login
            </button>
          </div>
        </form>
      </section>
    </section>

    <div class="adContainer">
      <div class="AdvertisementImage">
      <p class="advertisementInfo">Sponsored Advertisement</p>
        <img src="https://www.whatcanyoudocampaign.org/wp-content/uploads/2017/08/web-ad-cheryl-collier-250x250.jpg?twigforcedownload" alt="Advertisement" />
      </div>
    </div>
  </div>
      <ToastContainer />
    </>
  )
}

export default Login
