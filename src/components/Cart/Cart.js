import React from 'react';
import './cart.css'

const Cart = (props) => {
    const {cart}=props;
    // console.log(cart)
    let total=0;
    let shipping=0;
    let quantity=0;
   
    for(const element of cart){
   quantity=quantity+element.quantity
    total= total+element.price *element.quantity;
    shipping=shipping+element.shipping;
    }
    const tax=parseFloat((total*0.1).toFixed(2));
    let grandTotal= total+shipping+tax;
    return (
        <div className='cart'>
            <h4>Order Summery</h4>
           <p>Selected items: {quantity}</p>
           <p>Total Price: $ {total}</p>
           <p>Total Shipping: $ {shipping}</p>
           <p> Tax: $ {tax} </p>
           <h4>Grand Total: $ {grandTotal.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;