
import React from 'react';
import './DishCard.scss';



const images = [
  
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png"

]





export interface Dish {

 
  name: string;
  location: string;
  rating: number;
  deliveryTime: string;

}

interface DishCardProps {
  dish: Dish;
  index: number;
}

const DishCard: React.FC<DishCardProps> = ({ dish,index  }) => {

  const currentImage = images[index];
 

  return (
    <div className="dish-card">
       <img src={`/img/dishes/${currentImage}`} alt={dish.name} />
      <h3>{dish.name}</h3>
      <div>
      <p>{dish.location} </p>
       <p> <img src={require(`../img/star.png`)} alt='star' />{dish.rating}</p>
      </div>
      
      <p><img src={require(`../img/Group.png`)} alt='group' /> {dish.deliveryTime}</p>
      
  
    </div>
  );
};

export default DishCard;
