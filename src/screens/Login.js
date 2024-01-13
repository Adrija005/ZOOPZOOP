import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setcredentials] = useState({email:"",password:""})
  
  let navigate = useNavigate();
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
    const response = await fetch("http://localhost:3000/api/loginuser",{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json()
    console.log(json);

    if(!json.success){
      alert("Enter Valid Credentials");
    }

    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }

    // Access form data here and perform the necessary actions
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    // Do something with the form data (e.g., send it to the server)
    console.log('Form submitted:', { name, email, password });
  };

  const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
  }
  
  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
          </div>
        

          <button type="submit" className=" m-3 btn btn-success">Submit</button>
          <Link to="/CreateUser" className='m-3 btn btn-danger'>I am a new user</Link>
        </form>
      </div>
    </div>
  )
}

export default Login;