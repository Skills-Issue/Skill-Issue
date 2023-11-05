import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import Outline from '@/components/ui/Button';
import Filter from '@/components/ui/Filter/FilterButton';
import DismissableModal from '@/components/ui/Filter/Modal';

test('renders the Filter button and triggers openModal on click', () => {
  const openModal = jest.fn();
  render(<Filter openModal={openModal} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(openModal).toHaveBeenCalledTimes(1);
});

