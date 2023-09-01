
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mt-5">Sign Up</h2>
          <SignupForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
