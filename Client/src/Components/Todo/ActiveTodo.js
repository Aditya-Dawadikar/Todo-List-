import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';

const ActiveTodo = (props) => {

    const priority = ["#2bffaa", "#95ff2b", "#ffd12b", "#ff722b", "#ff2b2b"]
    const status = ["Incomplete", "Complete"]

    const [currtodo, setcurrtodo] = useState(props.todo)

    const [collapse, setcollapse] = useState(false);
    const [newtask,setnewtask] = useState("")
    const [newpriority,setnewpriority] = useState(1)

    useEffect(() => {
        setcurrtodo(props.todo)
    }, [props.todo])

    function updateDBTodoList(newtodolist) {
        let userid = new URL(window.location.href).searchParams.get("userid")
        let endpoint = "http://localhost:5000/api/todo?userid=" + userid
        axios.patch(endpoint, newtodolist)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

    function markDone(index) {
        let newtaskList = currtodo.tasks
        let newtask = currtodo.tasks[index]
        newtask.status = 1
        newtaskList[index] = newtask

        let newtodoObject = currtodo
        newtodoObject.tasks = newtaskList

        setcurrtodo({ ...currtodo, tasks: newtaskList })
        updateDBTodoList(newtodoObject)
    }

    function deleteTodo() {
        props.removeTodo(currtodo)
        let userid = new URL(window.location.href).searchParams.get("userid")
        let endpoint = "http://localhost:5000/api/todo?userid=" + userid
        axios.delete(endpoint, {
            data: {
                title: currtodo.title
            }
        })
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

    function addTask(){
        let newtaskobject = {
            title: newtask,
            priority: newpriority,
            status:0
        }
        let newtasklist = currtodo.tasks
        newtasklist.push(newtaskobject)

        let todoObject = currtodo
        todoObject.tasks = newtasklist

        setcurrtodo({ ...currtodo, tasks: newtasklist })
        updateDBTodoList(todoObject)
    }

    function deleteTask(task) {
        let newtasklist = currtodo.tasks.filter((t) => {
            return task.title !== t.title
        })
        let newtodoObject = currtodo
        newtodoObject.tasks = newtasklist

        setcurrtodo({ ...currtodo, tasks: newtasklist })
        updateDBTodoList(newtodoObject)
    }

    return <div className='card shadow p-5'>
        <div className='row'>
            <div className='col'>
                <div className='h2'>{currtodo.title}</div>
                <div className='h5 text-secondary'>{currtodo.desc}</div>
            </div>
            <div className='col'>
                <div className="d-flex">
                    <div className='btn btn-primary m-1'
                        onClick={() => setcollapse(!collapse)}
                        aria-controls="add-task"
                        aria-expanded={collapse}
                    >Add task</div>
                    <div className='btn btn-danger m-1' onClick={() => { deleteTodo() }}>Delete list</div>
                </div>
            </div>
        </div>
        <Collapse in={collapse}>
            <div id="add-task">
                <div className='input-group'>
                    <input className='form-control' onChange={(e) => { setnewtask(e.target.value) }} placeholder='Get Groceries'></input>
                    <input className='form-control' type='number' min={1} max={5} placeholder="set task priority" onChange={(e) => { setnewpriority(parseInt(e.target.value)) }}></input>
                    <div className='btn btn-primary' onClick={() => { addTask() }}>+</div>
                </div>
            </div>
        </Collapse>
        <br />
        <ul className='list-group'>
            {
                currtodo.tasks.map((task, index) => {
                    return <li className='list-group-item' key={index}>
                        <div className='row'>
                            <div className='col'>
                                <div>{task.title}</div>
                                <div>Priority:<div className='btn' style={{ margin: "0px 5px 0px 5px", background: priority[task.priority-1] }}>{task.priority}</div></div>
                                <div>Status: {status[task.status]}</div>
                            </div>
                            <div className="col">
                                <div className='d-flex'>
                                    {task.status===1?<></>:<div className='btn btn-primary m-1' onClick={() => { markDone(index) }}>Mark as Done</div>}
                                    <div className='btn btn-danger m-1' onClick={() => { deleteTask(task) }}>Delete task</div>
                                </div>
                            </div>
                        </div>

                    </li>
                })
            }

        </ul>
    </div>;
};

export default ActiveTodo;
