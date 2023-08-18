import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DishCard, { Dish } from '../components/DishCard';

describe('DishCard Component', () => {
  const mockDish: Dish = {
    name: 'Test Dish',
    location: 'Test Location',
    rating: 4.5,
    deliveryTime: '30 min',
  };

  it('renders correctly', () => {
    render(<DishCard dish={mockDish} index={0} />);

    const dishName = screen.getByText(mockDish.name);
    const dishLocation = screen.getByText(mockDish.location);
    const dishRating = screen.getByAltText('star');
    const dishDeliveryTime = screen.getByText(mockDish.deliveryTime);

    expect(dishName).toBeInTheDocument();
    expect(dishLocation).toBeInTheDocument();
    expect(dishRating).toBeInTheDocument();
    expect(dishDeliveryTime).toBeInTheDocument();
  });
});
