import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppFunctional from './AppFunctional';

describe('Component tests', () => {
  beforeEach(() => {
    render(<AppFunctional />);
  });

  afterEach(() => {
    cleanup();
  });

  test('text on screen', async () => {
    await waitFor(() => {
      expect(screen.getByText("You Moved", { exact: false })).toBeVisible();
    });
  });
  
  test('updates coordinates and steps on button click', async () => {
    userEvent.click(screen.getByText('LEFT'));
    await waitFor(() => {
      expect(screen.getByText('Coordinates (1, 2)')).toBeVisible();
      expect(screen.getByText('You moved 1 time')).toBeVisible();
    });
  });

  test('displays message on invalid email submit', async () => {
    userEvent.type(screen.getByPlaceholderText('type email'), 'invalid-email@hh');
    userEvent.click(screen.getByTestId('Submit'));
    await waitFor(() => {
      expect(screen.getByText('Ouch: email must be a valid email')).toBeVisible();
    });
  });
});
