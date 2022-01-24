import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ActiveTodo from '../Components/Todo/ActiveTodo';
import AddTodo from '../Components/Todo/AddTodo'

const Todo = () => {

  const [userid, setuserid] = useState()

  const [todolist, settodolist] = useState([])
  const [querylist, setquerylist] = useState([])

  const [activelist, setactivelist] = useState()

  const [flag, setflag] = useState(0)

  const [querystring, setquerystring] = useState("")

  useEffect(() => {
    function handleLoad() {
      let url = new URL(window.location.href)
      let id = url.searchParams.get("userid")
      setuserid(id)
    }

    window.addEventListener('load', handleLoad())
    return () => {
      window.removeEventListener('load', handleLoad())
    }
  }, [])

  useEffect(() => {
    if (typeof userid !== 'undefined') {

      let token = sessionStorage.getItem("token")
      axios.get("http://localhost:5000/api/todo?userid=" + userid,{headers:{Authorization:"Bearer "+token}})
        .then((resobj) => {
          settodolist(resobj.data)
        }).catch(err => {
          console.log(err)
        })
    }

  }, [userid])

  useEffect(() => {
    function query() {
      if (querystring !== "") {
        let filter = querystring.toUpperCase()
        let temp = []
        for (let i=0;i<todolist.length;i++) {
          if (todolist[i].title.toUpperCase().indexOf(filter) > -1) {
            // show this
            temp.push(todolist[i])
          }
        }
        setquerylist(temp)
      }else{
        setquerylist([])
      }
    }

    query()

  }, [querystring])


  function addTodo(todo) {
    settodolist((todolist) => [...todolist, todo])
  }

  function addActiveTodo(todo) {
    setactivelist(todo)
    setflag(1)
  }

  function deleteTodo(todo) {
    settodolist(todolist.filter((list) => {
      return todo.title !== list.title
    }))
    setflag(0)
  }

  const GetComponent = (props) => {
    if (flag === 0) {
      return <AddTodo newTodo={addTodo} addActiveTodo={addActiveTodo} />
    } else {
      return <ActiveTodo todo={activelist} removeTodo={props.deleteTodo}></ActiveTodo>
    }
  }

  return <div>
    <div 
      className='btn btn-primary m-2' 
      style={{borderRadius:"20px",position:"absolute",right:"10px"}}
      onClick={()=>{
        window.location.href = "http://localhost:3000/"
      }}
      >Logout</div>
    <br /><br />
    {/* Search bar */}
    <div className='container'>
      <div className='text-center'>
        <div className='input-group' style={{ width: "500px" }}>
          <div className='btn btn-primary'>Q</div>
          <input className='form-control' value={querystring} placeholder='search todos...' onChangeCapture={(e) => { setquerystring(e.target.value) }}></input>
          <div className={querystring===""?'btn btn-secondary':'btn btn-primary'} 
            onClick={()=>{
              setquerylist([])
              setquerystring("")  
            }}>Clear</div>
        </div>
      </div>
      <br />

      <div className='row'>
        {/* TodoLists */}
        <div className='col'>
          <div className='d-flex flex-wrap'>
            <div className="card m-1 shadow" style={{ minWidth: "300px", cursor: "pointer" }} onClick={() => { }}>
              <div className="card-body" style={{ opacity: "50%" }} onClick={() => { setflag(0) }}>
                <h1>+ Add</h1>
              </div>
            </div>
            {
              querylist.map((card, index) => {
                return <div key={index} className="card m-1 shadow" style={{ minWidth: "300px" }}>
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.desc}</p>
                    <div className="btn btn-primary" onClick={() => { addActiveTodo(todolist[index]) }}>Show</div>
                  </div>
                </div>
              })
            }
            {
              querylist.length===0?todolist.map((card, index) => {
                return <div key={index} className="card m-1 shadow" style={{ minWidth: "300px" }}>
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.desc}</p>
                    <div className="btn btn-primary" onClick={() => { addActiveTodo(todolist[index]) }}>Show</div>
                  </div>
                </div>
              }):<></>
            }
          </div>
        </div>

        {/* ActiveList */}
        <div className='col'>
          <GetComponent deleteTodo={deleteTodo} />
        </div>
      </div>

    </div>
  </div>;
};

export default Todo;
