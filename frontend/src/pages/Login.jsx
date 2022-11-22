import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData
    // Handles the state change for the form data (allow you to type in info)
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // On submit event
    const onSubmit = (e) => {

    }

  return (
    <>
    <section class="heading">
        <h1>
            <FaSignInAlt /> Login
        </h1>
        <p>Login to start setting goals</p>
    </section>
    <section class="form">
        <form onSubmit={onSubmit}>

            <div className="form-group">
            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email address" onChange={onChange}/>
            </div>

            <div className="form-group">
            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter a secure password" onChange={onChange}/>
            </div>
            
            <div className="form-group">
                <button type="submit" class="btn btn-block">Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Login