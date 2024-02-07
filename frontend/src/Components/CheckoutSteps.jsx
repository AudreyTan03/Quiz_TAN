import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';

function PlaceOrderScreen() {
  const cart = useSelector(state => state.cart);

  return (
    <>
      <CheckoutSteps step1 step2 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              {/* Shipping details content */}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* Order items content */}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
