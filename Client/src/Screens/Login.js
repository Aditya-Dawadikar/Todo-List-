import axios from 'axios';
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap'

const Login = () => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [cpassword, setcpassword] = useState("")

  function resetForm() {
    setusername("")
    setpassword("")
    setcpassword("")
  }

  function login() {
    if (username !== "" && password !== "") {
      axios.post("http://localhost:5000/api/user/login", {
        username: username,
        password: password
      }).then(res => {
        if (res.status === 200) {
          sessionStorage.setItem("token",String(res.data.token))
          window.location.href = '/todo?userid=' + res.data.userid
        }
        resetForm()
      }).catch(err => {
        if (err.response.status === 400) {
          alert("username and password doesnt match")
        } else if (err.response.status === 500) {
          alert("internal server error occured")
        }
        resetForm()
      })
    } else {
      alert("username and password is required")
    }
  }

  function signup() {
    if (username !== "" && password !== "" && cpassword !== "") {
      if (cpassword === password) {
        axios.post("http://localhost:5000/api/user/signup", {
          username: username,
          password: password,
          todo: []
        }).then(res => {
          if (res.status === 200) {
            sessionStorage.setItem("token",String(res.data.token))
            window.location.href = '/todo?userid=' + res.data.userid
          }
          resetForm()
        }).catch(err => {
          if (err.response.status === 500) {
            alert("internal server error occured")
          }
          resetForm()
        })
      } else {
        alert("password and confirm password doesnt match")
      }
    } else {
      alert("all fields are required")
    }
  }

  const [activetab, setactivetab] = useState("Login")

  function changeTab(k) {
    resetForm()
    setactivetab(k)
  }

  return <div>
    <div style={{ width: "300px" }} className="content shadow p-3">
      <Tabs activeKey={activetab} onSelect={(k) => changeTab(k)} id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="Signup" title="Signup">
          <div className='container'>
            <form>
              <label>Username</label>
              <input type='text' className='form-control' placeholder='john_doe' value={username} onChange={(e) => { setusername(e.target.value) }} required={true}></input>
              <label>Password</label>
              <input type='password' className='form-control' placeholder='********' value={password} onChange={(e) => { setpassword(e.target.value) }} required={true}></input>

              <label>Confirm Password</label>
              <input type='password' className='form-control' placeholder='********' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} required={true}></input>

              <br />
              <div className='btn btn-primary' onClick={() => { signup() }}>Signup</div>
            </form>
          </div>
        </Tab>
        <Tab eventKey="Login" title="Login">
          <div className='container'>
            <form>
              <label>Username</label>
              <input type='text' className='form-control' value={username} onChange={(e) => { setusername(e.target.value) }} placeholder='john_doe' required={true}></input>
              <div className='row'>
                <div className='col'>
                  <label>Password</label>
                  <input className='form-control' type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder='********' required={true}></input>
                </div>
              </div>
              <br />
              <div className='btn btn-primary' onClick={() => { login() }}>Login</div>
            </form>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>;
};

export default Login;
