import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    // Handles the state change for the form data (allow you to type in info)
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // On submit event
    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        }
        else {
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
    <section class="heading">
        <h1>
            <FaUser /> Register
        </h1>
        <p>Create your account today</p>
    </section>
    <section class="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your full name" onChange={onChange}/>
            </div>

            <div className="form-group">
            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email address" onChange={onChange}/>
            </div>

            <div className="form-group">
            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter a secure password" onChange={onChange}/>
            </div>

            <div className="form-group">
            <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirm your password" onChange={onChange}/>
            </div>
            
            <div className="form-group">
                <button type="submit" class="btn btn-block">Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Register