import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import Outline from '@/components/ui/Button';
import Filter from '@/components/ui/Filter/FilterButton';
import DismissableModal from '@/components/ui/Filter/Modal';
import ProfileCard from '@/components/ui/ProfileCard';
import 'jest-localstorage-mock';

test('renders the Filter button and triggers openModal on click', () => {
  const openModal = jest.fn();
  render(<Filter openModal={openModal} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(openModal).toHaveBeenCalledTimes(1);
});


  it('renders the user profile information', () => {
    localStorage.setItem('user', JSON.stringify({
      access_role_id:4,
      country:"Singapore",
      dept: "HR",
      email: "Test.Loh@allinone.com.sg",
      staff_fname:"Test",
      staff_id:121005,
      staff_lname:"Loh"
    }));

    render(<ProfileCard />);

    expect(screen.getByText('Test Loh')).toBeInTheDocument();
    expect(screen.getByText('Test.Loh@allinone.com.sg')).toBeInTheDocument();
    expect(screen.getByText('HR')).toBeInTheDocument();
  });

  