import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

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
      <section className='heading'>
        <h1 class="welcomeMHeader">Welcome, {user && user.name}</h1>
        {/* <p class="loginDesc">Goals Dashboard</p> */}
      </section>

      <GoalForm />

      <section className='goalContent content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3 class="noGoalsLabel">You have not set any goals</h3>
        )}
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

export default Dashboard
