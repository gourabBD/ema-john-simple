import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './shop.css'
const Shop = () => {
    const [products,setProducts]=useState([])
    const [cart,setCart]=useState([])
   
   
    
    useEffect(()=>{
        
     fetch('products.json')
     .then(res=>res.json())
     .then(data=>setProducts(data))
    },[]);

    useEffect(()=>{
      
       const storedCart= getStoredCart();
        const savedCart=[];
        for(const id in storedCart){
        const addedProduct=products.find(product=> product.id === id);
        if(addedProduct)
       { 
        const quantity=storedCart[id];
       addedProduct.quantity=quantity;
    //    console.log( addedProduct);
       savedCart.push(addedProduct)
    }
       }
       setCart(savedCart);
    },[products])

    const handleAddToCart=(product)=>{
        let newCart=[];
        //selected product quantity management
        const exists= cart.find(selected=>selected.id===product.id);
        if(!exists){
            product.quantity=1;
             newCart=[...cart,product]
        }
        else{
            const rest=cart.filter(selected=>selected.id!==product.id)
            exists.quantity=exists.quantity+1;
            newCart=[...rest,exists]
        }
       
        setCart(newCart)
        addToDb(product.id)
       }

            
         
    return (
        <div className='shop-container'>
           <div className="products-container">
            {
                products.map(product=>{
                    return(
                       <Product key={product.id}
                       product={product}
                       handleAddToCart={handleAddToCart}
                       >

                       </Product> 
                    )
                })
            }
           </div>
          
           <div className="cart-container">
             <Cart cart={cart}></Cart>
           </div>
        </div>
    );
};

export default Shop;