import axios from 'axios';
import React, { useState } from 'react';

const AddTodo = (props) => {
    const {newTodo,addActiveTodo} = props

    const [tasklist, settasklist] = useState([])
    const priority = ["#2bffaa", "#95ff2b", "#ffd12b", "#ff722b", "#ff2b2b"]
    const status = ["Incomplete", "Complete"]

    const [todotitle,settodotitle] = useState()
    const [tododesc,settododesc] = useState()
    const [taskname,settaskname] = useState()
    const [taskpriority,settaskpriority] = useState(1)


    function addTodo(){
        let todoObject = {
            title: todotitle,
            desc: tododesc,
            tasks:tasklist
        }
        newTodo(todoObject)
        addActiveTodo(todoObject)
         
        let url = new URL(window.location.href);
        let userid = url.searchParams.get("userid");
        axios.post("http://localhost:5000/api/todo?userid="+userid,todoObject)
        .then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    function addTask(){
        let taskObject = {
            title: taskname,
            priority: taskpriority,
            status: 0
        }
        settasklist((tasklist)=>[...tasklist,taskObject])
        settaskname("")
        settaskpriority(1)
    }

    function deleteTask(index){
        settasklist(tasklist.filter((task,id)=>{return index!==id}))
    }

    return <div className='card shadow p-5'>
        <h2>Make new Todo</h2>
        <form>
            <label>Todo Name</label>
            <input className='form-control' placeholder='Get Groceries' onChange={(e)=>{settodotitle(e.target.value)}}></input>
            <br />
            <label>Description</label>
            <input className='form-control' placeholder='Weekly groceries' onChange={(e)=>{settododesc(e.target.value)}}></input>
            <br />
            <label>Add Tasks</label>
            <div className='input-group'>
                <input className='form-control' value={taskname} onChange={(e)=>{settaskname(e.target.value)}} placeholder='Get Groceries'></input>
                <input className='form-control' type='number' value={taskpriority} min={1} max={5} placeholder="set task priority" onChange={(e)=>{settaskpriority(parseInt(e.target.value))}}></input>
                <div className='btn btn-primary' onClick={()=>{addTask()}}>+</div>
            </div>
            <br />
            {
                tasklist.length === 0 ? <></> : <div>
                    <label>Added Tasks</label>
                    <ul className='list-group'>
                        {
                            tasklist.map((task, index) => {
                                return <li key={index} className='list-group-item'>
                                    <div className='row'>
                                        <div className='col'>
                                            <div>{task.title}</div>
                                            <div>Priority:<div className='btn' style={{ background: priority[task.priority-1], margin: "3px" }}>{task.priority}</div></div>
                                            <div>Status: {status[task.status]}</div>
                                        </div>
                                        <div className="col">
                                            <div className='d-flex'>
                                                <div className='btn btn-danger m-1' onClick={()=>{deleteTask(index)}}>Delete</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            }
            <div className='btn btn-primary' onClick={()=>{addTodo()}}>Save</div>
        </form>
    </div>
};

export default AddTodo;
