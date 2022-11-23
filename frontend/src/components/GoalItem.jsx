import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div class='goal'>
      <div class="goalDate">{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2 class="goalText">{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} class='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem
