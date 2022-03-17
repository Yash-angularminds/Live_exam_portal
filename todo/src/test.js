import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../components/Todolist.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TestIndex from "./TestIndex";
import { FaEdit,FaTrashAlt,FaRegCircle,FaCheckCircle} from "../../node_modules/react-icons/fa"
import Edit from "./Edit";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {ToastContainer,toast} from 'react-toastify'
import "../../node_modules/react-toastify/dist/ReactToastify.css"

function Todolist() {
  let currentNotes = localStorage.getItem("notes");
  let history = useHistory();
  let notes = [];
  let tempnotes = [];
  let completedarr = []
  notes = JSON.parse(currentNotes);
  notes == null ? (notes = []) : (notes = notes);

  for(let i=0;i<notes.length;i++)
{
  if(notes[i].status=="todo")
  {
   tempnotes.push(notes[i])
  }
  else{
    completedarr.push(notes[i])
  }
}

console.log(tempnotes)
const [characters, updateCharacters] = useState(tempnotes);


  function handleOnDragEnd(result) {
    if (!result.destination) return;
     console.log(result)
    const items = Array.from(characters);
  
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    for(let i=0;i<items.length;i++)
    {
      items[i].sortposi = i
    }

    const addarr = items.concat(completedarr); 
    localStorage.setItem("notes",JSON.stringify(addarr));
    updateCharacters(items);
  }




  
  let deletenote=(key) =>{
    notes.splice(key,1)
    if(notes.length > 0)
    {
      for(let i=0;i<notes.length;i++)
      {
        notes[i].id = i
      }
    localStorage.setItem("notes",JSON.stringify(notes));
    }
    else{
      localStorage.clear()
    }
    history.push("/list");
  }


  let setstatus=(key) =>{
    console.log(notes)
    console.log(key)
    notes[key].status = "done"
    notes[key].sortposi ="-"
    localStorage.setItem("notes",JSON.stringify(notes));
    history.push("/list");
  }

  history.push("/default-route");



  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
       <ol class="characters" {...provided.droppableProps} ref={provided.innerRef}>
      {characters.filter(function (note) 
      {
       return note.status === "todo";
      }).map((note,index) => (
        <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                      {(provided) => (
        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={index} class="list-group-item d-flex justify-content-between align-items-start mt-3 prntlist">
          <div class="ms-2 me-auto">
          <div class="row">
            <div class="col-2 prntcpmlt" style={{width:40}}>
            <button class="compbtn1" style={{borderStyle:'none',backgroundColor:'rgb(137, 255, 216)'}}><FaRegCircle/></button>
            <button class="compbtn2" style={{borderStyle:'none',backgroundColor:'rgb(137, 255, 216)',color:"rgb(8, 97, 0)"}} onClick={()=>setstatus(note.sortposi)}><FaCheckCircle/></button>
             </div> 
          <div class="col-8">
            <div class="fw-bold">{note.title}</div>
            </div>
            <div class="col-2">
          <div class="badge bg-primary rounded-pill ms-5">{note.date}</div>
          </div>
          </div>
          <div class="row">
          <div class="col-8">
            <div class="fst-italic">{note.detail}</div>
            </div>
            <div class="col-2 pt-2 icon">
            <button class="editbtn" style={{borderStyle:'none',backgroundColor:'rgb(137, 255, 216)'}}><a style={{color:"darkslateblue"}} href={"/edit/"+note.id}><FaEdit/></a></button>
             </div>
             <div class="col-2 pt-2 icon">
            <button class="deltbtn" style={{borderStyle:'none',backgroundColor:'rgb(137, 255, 216)',color:"red"}} onClick={()=>deletenote(index)}><FaTrashAlt/></button>
             </div>
          </div>
        </div>
        </li>
         )}
         </Draggable>
      ))}
      </ol>
      )}
      </Droppable>
    </DragDropContext>
    <ToastContainer />
    </div>
  );
}

export default Todolist