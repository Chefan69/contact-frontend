/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Implement sign-up logic here
    // For demonstration, just redirecting to the sign-in page
    navigate('/signin');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
 */
/* 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function SignUpPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Sign-up was successful, you can redirect to the sign-in page or any other page
        navigate('/signin');
      } else {
        // Handle sign-up failure, display an error message to the user
        console.error('Sign Up failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

 
 */



  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Button from 'react-bootstrap/Button';
  
  function SignUpPage() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true); // State to track username availability
    const navigate = useNavigate();
  
    useEffect(() => {
      // Function to check username availability
      const checkUsernameAvailability = async () => {
        try {
          const response = await fetch(`http://localhost:8080/check-username/${username}`);
          if (response.ok) {
            const data = await response.json();
            setIsUsernameAvailable(data.available);
          } else {
            // Handle errors
            setIsUsernameAvailable(false);
          }
        } catch (error) {
          console.error('An error occurred:', error);
          setIsUsernameAvailable(false);
        }
      };
  
      // Check username availability when username changes
      if (username) {
        checkUsernameAvailability();
      } else {
        setIsUsernameAvailable(true);
      }
    }, [username]);
  
    const handleSignUp = async () => {


      // Überprüfen, ob alle Felder ausgefüllt sind
      if (!name || !username || !email || !password) {
        alert('Bitte füllen Sie alle Felder aus.');
        return;
    }
      // Check if the username is available
      if (!isUsernameAvailable) {
        alert('Username is not available. Please choose a different username.');
        return;
      }
  
      // Implement the sign-up logic here
      try {
        const response = await fetch('http://localhost:8080/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, username, email, password }),
        });
  
        if (response.ok) {
          navigate('/signin');
        } else {
          console.error('Sign Up failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  variant="success"
                  type="button"
                  onClick={handleSignUp}
                  block
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
