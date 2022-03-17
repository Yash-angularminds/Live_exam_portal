import React,{useState} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
    let localData = []
    localData = JSON.parse(localStorage.getItem('list'))
    let navigate = useNavigate()

    let dateOption=React.createRef();

    const {state} = useLocation();
    
    let [date, setDate] = useState(state.date)
    let [title, setTitle] = useState(state.title)
    let [details, setDetails] = useState(state.details)


    const SubmitHandler = (e) => {
        e.preventDefault()

        const obj={
            sortpos : state.sortpos,
            title: title,
            details : details,
            date: date,
            status: state.status,
            id: state.id
        };
        const update = localData.map((data,index) => data.id === state.id?localData[index] = obj:data)
        localStorage.setItem("list", JSON.stringify(update));

        toast.success('Task Updated')

        setTimeout(() => {
            navigate('/list')
        }, 1000);
        
    }
    

    let dateHandler = () => {
        let selectedDayOption = dateOption.current.value
     //console.log(selectedDayOption);       
    var today = new Date()
    var day
    var month
    var year
    var date
    var newdate

    if(selectedDayOption==="today")
    {
      day = today.getDate()
      month = today.getMonth()+1
      year = today.getFullYear()
      if(day<=9)
      {
        day ="0"+day
      }
         date = year+"-"+month+"-"+day
      //dateOption.current.value = date
    }
    else if(selectedDayOption==="tomorrow"){
      month = today.getMonth()+1
      year = today.getFullYear()

      newdate = new Date(today.getTime()+24*60*60*1000)
      day = newdate.getDate()
      if(day<=9)
      {
        day ="0"+day
      }
       date = year+"-"+month+"-"+day
      //dateOption.current.value = date
    }
    else if(selectedDayOption==="week"){
      month = today.getMonth()+1
      year = today.getFullYear()

      newdate = new Date(today.getTime()+7*24*60*60*1000)
      day = newdate.getDate()
      if(day<=9)
      {
        day ="0"+day
      }
       date = year+"-"+month+"-"+day
      //dateOption = date
    }
    else{
      day = today.getDate()
      month = today.getMonth()+2
      year = today.getFullYear()

      if(day<=9)
      {
        day ="0"+day
      }
       date = year+"-"+month+"-"+day
      //dateOption.current.value = date
    }
            setDate(date)
        //dateInput.current.value = date
        //console.log(date);
    }  //close dateHandler

    const cancelHandler = () => {
        navigate('/list')
    }


    return (
        <div>
            <form class="border border-primary m-5">
                <div>
                    <h3 class = "mb-5">Edit task</h3>
                    <input class = "p-2" value = {title} onChange = {e => setTitle(e.target.value)} type="text" placeholder="Title" /> <br></br> <br></br>
                    <input class = "p-5" value = {details} onChange = {e => setDetails(e.target.value)} type="text" placeholder="Details" /> <br></br><br></br>
                    <p>Task Deadline</p>
                    <input class = "mr-3 p-1" value = {date} onChange = {e => setDate(e.target.value)} type="date" /> 
                    <select class = "p-2" onChange = {() => dateHandler()} ref={dateOption} > 
                        <option value="today" >By Today</option>
                        <option value="tomorrow" >By Tomorrow</option>
                        <option value="week" >By Next Week</option>
                        <option value="month" >By Next Month</option>
                    </select>
                </div> 
                <br></br><br></br>
                <button class="btn btn-success m-4" type="button" onClick={SubmitHandler}>Update</button>
                <button class="btn btn-danger m-4"  type="button" onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default Edit
