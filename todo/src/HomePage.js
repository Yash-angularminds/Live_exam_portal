import React from 'react'
import taskImg from './task.png'
import {useNavigate} from 'react-router-dom'

function HomePage() {

    let navigate = useNavigate()

    const handleClick = () => {
        navigate('/add')
    }

    return (
        <div>
            <h2 class="text-primary mt-4">Note Application</h2>
            <img src= {taskImg} alt="Task"/> <br></br>
            <button  class="btn btn-primary"  onClick={handleClick}>Add Task</button>
 </div>
    )
}

export default HomePage