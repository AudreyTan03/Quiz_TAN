import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { register } from '../actions/userActions'; // Import the register action
import FormContainer from '../Components/FormContainer';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('Name:', name);
    // console.log('Email:', email);
    // console.log('Password:', password);
    // console.log('User Type:', userType);
    // console.log('Confirm Password:', confirmPassword); // pang test
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      dispatch(register(name, email, password, userType, confirmPassword)); // Dispatch the register action
      navigate('/login');
    }
  };
  

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='userType'>
          <Form.Label>User Type</Form.Label>
          <Form.Control
            as='select'
            value={userType}
            onChange={(e) => setUserType(e.target.value)} // Update userType state
          >
            <option value='student'>Student</option>
            <option value='instructor'>Instructor</option>
          </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already registered? <Link to='/login'>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
