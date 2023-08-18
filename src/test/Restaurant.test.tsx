import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Restaurant from '../pages/Restaurant';

describe('Restaurant Component', () => {
  const mockDishes = [
    {
      name: 'Veggie Stir Fry',
      description: 'Colorful vegetables stir-fried with tofu and sauce.',
      price: 11.99,
    },
    {
      name: 'Green Smoothie',
      description: 'Refreshing blend of spinach, banana, pineapple, and almond milk.',
      price: 6.99,
    },
    
  ];

  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: { results: mockDishes },
    });
  });

  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <Restaurant hideHeader={false} hideMenu={false} />
      </BrowserRouter>
    );

    const dishNames = mockDishes.map(dish => dish.name);
    const dishDescriptions = mockDishes.map(dish => dish.description);
    const dishPrices = mockDishes.map(dish => `₹${dish.price}`);

    dishNames.forEach(name => expect(screen.getByText(name)).toBeInTheDocument());
    dishDescriptions.forEach(description => expect(screen.getByText(description)).toBeInTheDocument());
    dishPrices.forEach(price => expect(screen.getByText(price)).toBeInTheDocument());
  });
});
