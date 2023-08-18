import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DishItem from '../components/DishItem';

describe('DishItem Component', () => {
  const mockDish = {
    name: 'Test Dish',
    description: 'Test Description',
    price: 10,
  };
  const mockAddToCart = jest.fn();

  it('renders correctly', () => {
    render(
      <DishItem
        name={mockDish.name}
        description={mockDish.description}
        price={mockDish.price}
        index={0}
        addToCart={mockAddToCart}
      />
    );

    const dishName = screen.getByText(mockDish.name);
    const dishPrice = screen.getByText(`₹ ${mockDish.price}`);
    const dishDescription = screen.getByText(mockDish.description);
    const addButton = screen.getByRole('button', { name: 'Add +' });

    expect(dishName).toBeInTheDocument();
    expect(dishPrice).toBeInTheDocument();
    expect(dishDescription).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('calls addToCart when Add button is clicked', () => {
    render(
      <DishItem
        name={mockDish.name}
        description={mockDish.description}
        price={mockDish.price}
        index={0}
        addToCart={mockAddToCart}
      />
    );

    const addButton = screen.getByRole('button', { name: 'Add +' });

    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockDish);
  });
});
