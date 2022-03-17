import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function Add() {

    let arr = []
    let navigate = useNavigate()

    let dateOption=React.createRef();
    let dateInput=React.createRef();
    let titleInput=React.createRef();
    let detailsInput=React.createRef();

    useEffect(() => {
        let currentNotes = localStorage.getItem("list");
        if(currentNotes != null){
            arr = JSON.parse(currentNotes);
        }
      }, [])


    const SubmitHandler = () => {
        let addListItems = {
        sortpos : arr.length,
        title : titleInput.current.value,
        details : detailsInput.current.value,
        date : dateInput.current.value,
        id:new Date().getTime(),
        status : "to-do"
    }
        //console.log(addListItems.date)
        arr.push(addListItems);
        localStorage.setItem("list", JSON.stringify(arr))

        titleInput.current.value = ""
        detailsInput.current.value = ""

        navigate('/list')

        toast('Note Saved Sucessfully',{
          position: "top-right",
          type:"success",
          autoClose: 2500,
          theme:"colored",
          hideProgressBar: true
        })
        // setTimeout(() => {
        //   navigate('/list')  
        //   }, 2000);

    } // close submitHandler

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
        dateInput.current.value = date
        //console.log(date);
    }  //close dateHandler

    const cancelHandler = () => {
        navigate('/')
    }

    return (
        <div>
            <form class="border border-primary m-5">
                <div>
                    <h3 class = "mb-5">Add a task</h3>
                    <input class = "p-2" ref={titleInput} type="text"  placeholder="Title" /> <br></br> <br></br>
                    <input class = "p-5" ref={detailsInput} type="text"   placeholder="Details" /> <br></br><br></br>
                    <p>Task Deadline</p>
                    <input class = "mr-3 p-1" ref={dateInput} type="date" />
                    <select class = "p-2" onChange = {() => dateHandler()} ref={dateOption} > 
                        <option>Select date</option>
                        <option value="today" >By Today</option>
                        <option value="tomorrow" >By Tomorrow</option>
                        <option value="week" >By Next Week</option>
                        <option value="month" >By Next Month</option>
                    </select>
                </div> 
                <br></br><br></br>
                <button class="btn btn-success m-4" type="button" onClick={SubmitHandler}>Save</button>
                <button class="btn btn-danger m-4"  type="button" onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
    )
}

export default Add
