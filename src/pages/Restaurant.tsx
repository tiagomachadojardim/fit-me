import React, { useEffect, useState } from 'react';
import './Restaurant.scss';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { useLocation } from 'react-router-dom';
import DishItem from '../components/DishItem';
import axios from 'axios';

interface RestaurantPageProps {
  hideHeader: boolean;
  hideMenu: boolean;
}


interface Dish {
  price: number;
  name: string;
  description: string;
}


const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png"
];

const Restaurant: React.FC<RestaurantPageProps> = ({ hideHeader, hideMenu }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dishName = searchParams.get('dishName');
  const dishLocation = searchParams.get('dishLocation');
  const dishRating = searchParams.get('dishRating');
  const dishDeliveryTime = searchParams.get('dishDeliveryTime');
 


  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [cartItems, setCartItems] = useState<{ dish: Dish; quantity: number }[]>([]);


  const dishIndex = parseInt(searchParams.get('dishIndex') || '0', 10);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const dishImage = images[dishIndex];

  const [dishes, setDishes] = useState<Dish[]>([]);
  



  useEffect(() => {
    axios.get('https://parseapi.back4app.com/classes/Dish', {
      headers: {
        'X-Parse-Application-Id': 'DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL',
        'X-Parse-Master-Key': '0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9',
        'X-Parse-Client-Key': 'zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V',
       
      },
      params: {
        keys: JSON.stringify(['price', 'name', 'description']),
      },
    })
    .then(response => {
      const fetchedDishes: Dish[] = response.data.results;
      setDishes(fetchedDishes);
      

      
    })
    .catch(error => {
      console.error('Erro ao buscar pratos:', error);
    });
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };



  
  console.log('searchQuery:', searchQuery);

  const noDishesFound = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  ).length === 0;







const addToCart = (dish: Dish) => {
  const existingCartItem = cartItems.find((item) => item.dish === dish);
  if (existingCartItem) {
    increaseQuantity(cartItems.indexOf(existingCartItem));
  } else {
    setCartItems([...cartItems, { dish, quantity: 1 }]);
  }
};


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.dish.price * item.quantity, 0);
  };
  

  const increaseQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity++;
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
    } else {
      updatedCart.splice(index, 1); 
    }
    setCartItems(updatedCart);
  };
  
  



  return (
    <div className="restaurant">
      {hideHeader ? null : <Header pageTitle="Título Padrão Home" />}
      {hideMenu ? null : <Menu pageTitle="Home" />}

      <div className='restaurant-box'>
        <div className='restaurant-box-dish'>
        <img src={require(`../../public/img/dishes/${dishImage}`)} alt={dishImage} />
        <div className='container-center-restaurant'>
        <h2>{dishName}</h2>
        <p>{dishLocation}</p>
        
       
        <div className='restaurant-box-dish-container'>
        <div>
        <p><img src={require(`../img/star.png`)} alt='star' /> {dishRating}</p>
        <p>100+ ratings</p>
        </div>
       
        <div className='div-border-restaurant'>
        <p>{dishDeliveryTime}</p>
        <p>Delivery Time</p>
        </div>
        <div>
        <p>₹200</p>
        <p>Cost for two</p>
        </div>
        
        </div>

        
        

        </div>
       
        </div>
        <div className='restaurant-box-offers'>
          <h4>Offers</h4>
          <p> <img src={require('../img/offers.png')} alt="offers" />50% off up to ₹100 | Use code TRYNEW</p>
          <p><img src={require('../img/offers.png')} alt="offers" />20% off | Use code PARTY</p>

        </div>
     
       
      </div>
    <div className='restaurant-filtering'>
    <input 
  type="text"
  placeholder="Search for dish"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
<button className={`favorite-button ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
<img src={require('../img/Vector2.png')} alt="star2" />Favourite
        </button>
    </div>
    


      <div className='restaurant-items'>
        <div className='restaurant-items-select'>
        <ul className='vertical-menu'>
    <li><a href='#recommended'>Recommended</a></li>
    <li><a href='#breakfast'>Breakfast Box</a></li>
    <li><a href='#lunch'>Lunch Box</a></li>
    <li><a href='#combo'>Combo Box</a></li>
    <li><a href='#biriyani'>Biriyani Box</a></li>
  </ul>

        </div>

        <div className='restaurant-items-option'>
      
        {noDishesFound ? (
            <p>Nenhum prato encontrado.</p>
          ) : (
            dishes
              .filter((dish) =>
                dish.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .slice(0, 3)
              .map((dish, index) => (

               
        <DishItem
          name={dish.name}
          description={dish.description}
          price={dish.price}
          index={index}
          addToCart={addToCart} 
          
        />
       
     
                
              ))
          )}
        </div>
        <div className='restaurant-items-cart'>
          <div className='cart-top'> <h2>Cart</h2>
          <p>{cartItems.reduce((total, item) => total + item.quantity, 0)} Items</p>
          </div>
         

          {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-details">
              <div> 
              <p> from <span>{dishName}</span></p>
              <p>{item.dish.name}</p>
              <p>₹{item.dish.price * item.quantity}</p>
              </div>
           
              
              <div className="cart-item-buttons">
              <button className='button-item-card' onClick={() => decreaseQuantity(index)}> - </button>
              <p>{item.quantity}</p>
          <button className='button-item-card' onClick={() => increaseQuantity(index)}> + </button>
      </div>
            </div>
         

          </div>
        ))}
         <div className="cart-total">
          <div><h2>Subtotal: </h2> <h2>₹{calculateTotal()}</h2></div>
          
          <p>Extra charges may apply</p>
          <button className="checkout-button">Checkout</button>
        </div>
        </div>
    
      </div>
    </div>
  );
};

export default Restaurant;
