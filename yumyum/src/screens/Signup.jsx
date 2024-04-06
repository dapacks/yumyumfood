import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', geolocation: '' });
  const [loading, setLoading] = useState(false); // State for loading status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on form submission

    const response = await fetch('https://deepak-fqpy.onrender.com/api/createuser', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert('Enter valid credentials');
    } else {
      setCredentials({
        name: '',
        email: '',
        password: '',
        geolocation: '',
      });
      alert('Registration successful!');
    }

    setLoading(false); // Set loading back to false after form submission
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        {/* Your Navbar code */}
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              id="exampleInputPassword1"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              id="exampleInputPassword1"
              onChange={onChange}
            />
          </div>

          {/* Conditionally render loading icon */}
          {loading ? (
            <div className="d-flex align-items-center mb-3">
              <span className="me-2">Loading...</span>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : null}

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
