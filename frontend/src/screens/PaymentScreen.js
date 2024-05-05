import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from "../actions/cartActions"

const PaymentScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [paymentMethod, setPaymentMethod] = useState("Paypal")
    


    const submitHandler = (e) => {
        e.preventDefault()
        if(!shippingAddress){
            navigate('/shipping')
        }else{
            dispatch(savePaymentMethod(paymentMethod))
            navigate('/placeorder')
        }
    
  }

  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
            <h1>Shipping</h1>
            <CheckoutSteps step1 step2 step3 />
            <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
        </Form.Group>

        <Col>
            <Form.Check type='radio' label="Paypal or Credit Card" id="paypal" value='Paypal' name='paymentMethod' checked onChange={(e) => setPaymentMethod(e.target.value)}>

            </Form.Check>
        </Col>
        <Button type='submit' variant='primary' >Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen