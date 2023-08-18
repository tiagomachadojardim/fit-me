
import React from 'react';
import './DishItem.scss';


interface DishItemProps {
  name: string;
  description: string;
  price: number;
  index: number;
  addToCart: (dish: { name: string; description: string; price: number }) => void;
}

const DishItem: React.FC<DishItemProps> = ({ name, description, price, index, addToCart   }) => {


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

     
      const currentImage = images[index % images.length];
      console.log("currentImage:", currentImage);

     

  return (
    <div className="dish-item">
     
      <div>
      <h5>{name}</h5>
      <h5>₹ {price}</h5>
      <p>{description}</p>
      
      </div>
      <div>
      <img src={`/img/dishes/${currentImage}`} alt={name} />
      <button className='dish-item-button' onClick={() => addToCart({ name, description, price })}>Add +</button>
      </div>
      
    </div>
  );
};

export default DishItem;
