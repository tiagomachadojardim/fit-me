import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Menu from '../components/Menu';
import './Home.scss'; 
import DishCard, { Dish } from '../components/DishCard';
import { Link } from 'react-router-dom';

interface HomePageProps {
  
  hideHeader: boolean; 
  hideMenu: boolean;
}

const HomePage: React.FC<HomePageProps> = ({  hideHeader,hideMenu}) => {
  
 

  const [dishes, setDishes] = useState<Dish[]>([]);




  useEffect(() => {
    fetch('https://parseapi.back4app.com/classes/FitMe', {
      headers: {
        'X-Parse-Application-Id': 'DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL',
        'X-Parse-Master-Key': '0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9',
        'X-Parse-Client-Key': 'zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V',
        'X-Parse-Revocable-Session': '1',
      },
    })
      .then(response => response.json())
      .then(data => {
        const results: any[] = data.results;
        setDishes(results);
      });
  }, []);



  

  return (
    <div className='home-menu'>
      {hideHeader ? null : <Header pageTitle="Título Padrão Home" />}
      {hideMenu ? null : <Menu pageTitle="Home" />}

      <div className="home-content">
        <div>
        <img className="home-img1" src={require("../img/Union.png")} alt="home img"/>
        </div>
      
        
        <div className='home-text'>
        <h4>Premium <span> quality </span> </h4>
        <h4>Food for your <img className="home-img-text" src={require("../img/Component4.png")} alt="home img"/> <span>healthy</span></h4>
        <h4><img className="home-img-text" src={require("../img/Component5.png")} alt="home img"/> <span>& Daily Life</span></h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.</p>
        </div>
        <div className='container-img'>
        <img className="img-1" src={require("../img/Component.png")} alt="home img"/>
        <img className="img-2" src={require("../img/Union2.png")} alt="home img"/>
        </div>
       
      
      </div>


      <div className='home-restaurants'>
      <h4>Restaurants</h4>
      </div>
      <div className="dish-container">
      {dishes.map((dish, index) => (
        
        <Link key={index}  to={`/Restaurant?dishName=${encodeURIComponent(dish.name)}
        &dishIndex=${index}
        &dishLocation=${dish.location}
        &dishRating=${dish.rating}
        &dishDeliveryTime=${dish.deliveryTime}
        
        
        `}>
        <DishCard dish={dish} index={index} />
      </Link>
        ))}
      </div>

     
    </div>
  );
};

export default HomePage;
