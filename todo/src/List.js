import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip";


function List() {
    let localData = []
    let incompletedTasks = []
    localData = JSON.parse(localStorage.getItem('list'))
    let navigate = useNavigate()
    let dd=React.createRef(); //dropUp List

    for(let i = 0; i < localData.length; i++) {
        if(localData[i].status === 'to-do') {
            incompletedTasks.push(localData[i])
        }
    }

    let [localList, updatelocalList] = useState([])
    //let [showHoverContent, setshowHoverContent] = useState(false)

    // useEffect(() => {
    //     setLocalList(localData)
    // },[])

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        localList= JSON.parse(localStorage.getItem('list'))
        const items = Array.from(localList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updatelocalList(items);
        for(let i=0;i<items.length;i++)
        {
            items[i].sortpos = i
        }
        localStorage.setItem("list",JSON.stringify(items))
    } //close handleOnDragEnd

    const deleteItem = (key) => {
    let res=localData.filter((data)=> data.id!==key);

        if(res.length > 0)
     {
        for(let i=0;i<res.length;i++)
        {
            res[i].sortpos = i
        }
    }
    localStorage.setItem("list",JSON.stringify(res));

    toast.error("Task Deleted")

    setTimeout(()=> {
        navigate('/list')
    })
    
    } //close deleteItem

    const editItem = (key) => {
         navigate('/edit', {state:key})
    }

    const updateStatus = (key) => {
        localData.map((data,index)=>data.id===key?data.status="done":data )
        
         localStorage.setItem("list",JSON.stringify(localData));
         
        toast.success("Task Completed!!")

         setTimeout(() => {
            navigate('/list')
        }, 1000);
         
        
    } //close updateStatus

    const clearLocal = () => {
        localStorage.clear()
        toast.error('Local storage cleared')
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }  //close clearLocal

    const dropDown = () => {
        if(dd.current.style.display === 'block')
        {
            dd.current.style.display = 'none'

        }
        else {
        dd.current.style.display = 'block'
        }
    }

    return (
        <div class="m-5 mr-5">
            <h3>Tasks</h3>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="localList">
                    {(provided) => (
                <table class="table bg-info" {...provided.droppableProps} ref={provided.innerRef}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Details</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                     {localData? localData.filter(localData => localData.status === 'to-do').map((data,index) => (
                       <Draggable key={data.id} draggableId = {""+data.id} index={index}>
                           {(provided) => (
                             <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <td>{data.title}</td>
                                <td>{data.details}</td>
                                <td>{data.date}</td> 
                                <td className="icons">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" onClick = {() => updateStatus(data.id)}  data-tip data-for="completed"/> 
                                        <FontAwesomeIcon style = {{marginRight: 30}} id={index} icon={faEdit} onClick={() => editItem(data)}  data-tip data-for="edit"/>
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => {if (window.confirm('Are you sure you want to delete this task?'))  deleteItem(data.id)}} data-tip data-for="delete"/>
                                        <ReactTooltip id="completed" place="top" effect="solid">Mark Completed</ReactTooltip>
                                        <ReactTooltip id="edit" place="top" effect="solid">Edit Task</ReactTooltip>
                                        <ReactTooltip id="delete" place="top" effect="solid">Delete Task</ReactTooltip>
                                    </div>
                                </td> 
                        
                             </tr>
                        )}
                                                    
                     </Draggable>
                        )
                        ) : navigate('/')}
                     </tbody>        
                      {provided.placeholder}
                </table>
                )}
                
                </Droppable>
                </DragDropContext>
                <button  class="btn btn-primary mb-5"  onClick={() => navigate('/add')}>Add task</button>
                <button  class="btn btn-danger mb-5"  onClick={clearLocal} data-tip data-for="clear">Clear All</button>
                <ReactTooltip id="clear" place="top" effect="solid">Delete all tasks and clear Local Storage</ReactTooltip> <br />
                <div class="btn-group dropup">
                <button type="button"  onClick={dropDown} class="btn btn-success dropdown-toggle mt-5" databstoggle="dropdown" aria-expanded="false">Show completed tasks</button>
                </div>
                <div class = "ml-5">
                <table class="table table-info mt-5" ref={dd}>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Details</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                    {localData? localData.filter(localData => localData.status === 'done').map((data,index) => (
                      <tr>
                        <td style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', width:'333px'}}>{data.title}</td>
                        <td style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', width:'333px'}}>{data.details}</td>
                        <td style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', width:'333px'}}>{data.date}</td>
                       </tr>
                    )) : <p>No completed Tasks</p>}
                    </tbody>
                </table>
                </div>
                <ToastContainer />
        </div>
    )
}

export default List




// {showHoverContent && (
//     <td>
//          <div class="form-check" onMouseEnter={() => setshowHoverContent(true)} onMouseLeave={() => setshowHoverContent(false)} >
//             <input class="form-check-input" type="checkbox" value="" onClick = {() => updateStatus(data.id)}  data-tip data-for="completed"/> 
//             <FontAwesomeIcon id={index} icon={faEdit} onClick={() => editItem(data)}  data-tip data-for="edit"/>
//             <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteItem(data.id)} data-tip data-for="delete"/>
//             <ReactTooltip id="completed" place="top" effect="solid">Mark Completed</ReactTooltip>
//             <ReactTooltip id="edit" place="top" effect="solid">Edit Task</ReactTooltip>
//             <ReactTooltip id="delete" place="top" effect="solid">Delete Task</ReactTooltip>
//          </div>
//     </td> 
// )}
//  </tr>
// )} 


