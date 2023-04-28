import React from 'react';
import {
  fireEvent, waitFor,
} from '@testing-library/react';
import Notifications from '../../src/components/Notification';
import { renderComponent } from '../jest.setup';
import 'setimmediate';

describe('Notifications', () => {
  it('renders the component', async () => {
    const renderer = renderComponent(<Notifications />);
    fireEvent.click(renderer.getByText('notifications'));
    await waitFor(() => {
      expect(renderer.getByTestId('notifications-list')).toBeDefined();
    });
    const notice = renderer.findAllByText(/\bJordan has been expired\b/);
    expect(notice).toBeDefined();
    expect(renderer.findAllByText('Mark all as read')).toBeDefined();
  });

  it('handles "Mark all as read" button click', async () => {
    const renderer = renderComponent(<Notifications />);
    fireEvent.click(renderer.getByText('notifications'));
    await waitFor(() => {
      expect(renderer.getByTestId('notifications-list')).toBeDefined();
    });
    const markBtn = await renderer.findAllByText(/\bMark all as read\b/);
    fireEvent.click(markBtn[0]);
    expect(renderer.getAllByAltText('Loader Spinner')).toBeDefined();
  });

  // it('handles "Mark one as read" button click', async () => {
  //   const renderer = renderComponent(<Notifications />);
  //   fireEvent.click(renderer.getByText('notifications'));
  //   await waitFor(() => {
  //     expect(renderer.getByTestId('notifications-list')).toBeDefined();
  //   });
  //   const markOneBtn = renderer.getAllByTestId('markOneButton');
  //   fireEvent.click(markOneBtn[0]);
  //   expect(renderer.getByTestId('Loading')).toBeDefined();
  // });

  it('handles "Load More" button click', async () => {
    const renderer = renderComponent(<Notifications />);
    fireEvent.click(renderer.getByText('notifications'));
    await waitFor(() => {
      expect(renderer.getByTestId('notifications-list')).toBeDefined();
    });
    const loadBtn = await renderer.findAllByText(/\bLOAD MORE\b/);
    fireEvent.click(loadBtn[0]);
    expect(renderer.getAllByAltText('Loader Spinner')).toBeDefined();
  });
});
