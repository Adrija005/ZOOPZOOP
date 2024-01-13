import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  // State to store user input for registration
  const [credentials, setcredentials] = useState({name:"", email:"", password:"", geolocation:""});

  // Function to handle form submission
  const handleSubmit = async(event) => {
    event.preventDefault();

    // Log form data as a JSON string
    console.log(JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation}));

    // Fetch request to create a new user with the provided credentials
    const response = await fetch("http://localhost:3000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation})
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }

    // Access form data here and perform the necessary actions
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    // Do something with the form data (e.g., send it to the server)
    console.log('Form submitted:', { name, email, password });
  };

  // Function to handle input changes and update state
  const onChange = (event) => {
    setcredentials({...credentials, [event.target.name]: event.target.value});
  }

  return (
    <>
      {/* Registration form */}
      <div className='container'>
        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
          </div>
          {/* Email input */}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          {/* Password input */}
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" placeholder="Password" />
          </div>
          {/* Geolocation input */}
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} />
          </div>

          {/* Submit button */}
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          {/* Link to login page */}
          <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
