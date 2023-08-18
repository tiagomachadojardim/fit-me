import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../pages/Home';

describe('HomePage Component', () => {
  const mockDishes = [
    {
      name: 'Dish 1',
      location: 'Location 1',
      rating: 4.5,
      deliveryTime: '30 min',
    },
    {
      name: 'Dish 2',
      location: 'Location 2',
      rating: 4.2,
      deliveryTime: '25 min',
    },
  
  ];

  it('renders correctly', () => {
   
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ results: mockDishes }),
    });

    render(<HomePage hideHeader={false} hideMenu={false} />);

    const dishNames = mockDishes.map(dish => dish.name);
    const dishLocations = mockDishes.map(dish => dish.location);
    const dishRatings = mockDishes.map(dish => `${dish.rating}`);
    const dishDeliveryTimes = mockDishes.map(dish => dish.deliveryTime);

    dishNames.forEach(name => expect(screen.getByText(name)).toBeInTheDocument());
    dishLocations.forEach(location => expect(screen.getByText(location)).toBeInTheDocument());
    dishRatings.forEach(rating => expect(screen.getByText(rating)).toBeInTheDocument());
    dishDeliveryTimes.forEach(deliveryTime => expect(screen.getByText(deliveryTime)).toBeInTheDocument());
  });
});
