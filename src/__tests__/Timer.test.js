
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import App from "../App";
import React from 'react';

describe("Timer", () => {

  it("Starts and reverses sucessfully", () => {
    jest.useFakeTimers();
    const { container } = render(<App />);
    // checking for initial classes
    expect(container.querySelector('#timer_svg')).toHaveClass('clockWiseTransform');
    expect(container.querySelector('.path-elapsed')).toHaveClass('strokeBlack');
    expect(container.querySelector('.path-remaining')).toHaveClass('gray');
    // click the timer
    fireEvent.click(container.querySelector('.timer-wrapper'));
    act(() => {
      jest.advanceTimersByTime(5000); // trigger setTimeout
    });
    expect(container.querySelector('.path-remaining')).toHaveClass('black');
    // click the timer again to set off reverse
    fireEvent.click(container.querySelector('.timer-wrapper'));
    expect(container.querySelector('#timer_svg')).toHaveClass('antiClockWiseTransform');
    expect(container.querySelector('.path-elapsed')).toHaveClass('strokeGray');
    expect(container.querySelector('.path-remaining')).not.toHaveAttribute('stroke-dasharray');
    act(() => {
      jest.advanceTimersByTime(300); // trigger setTimeout
    });
    // reset the classes after reverse is done
    expect(container.querySelector('#timer_svg')).toHaveClass('clockWiseTransform');
    expect(container.querySelector('.path-elapsed')).toHaveClass('strokeBlack');
    expect(container.querySelector('.path-remaining')).toHaveClass('gray transition-anticlockwise');
    expect(container.querySelector('.path-remaining')).toHaveAttribute('stroke-dasharray', expect.stringContaining('251.33, 251.33'))
  });

  it("pauses and resumes as expected", () => {
    jest.useFakeTimers();
    const { container } = render(<App />);
    // click the timer
    fireEvent.click(container.querySelector('.timer-wrapper'));
    act(() => {
      jest.advanceTimersByTime(2000); // trigger setTimeout
    });
    // after 2 secs, click to pause the timer
    fireEvent.click(container.querySelector('.timer-wrapper'));
    expect(container.querySelector('.path-remaining')).toHaveClass('gray', 'transition-clockwise');
    // now check after 3 secs if the timer has stopped or not
    act(() => {
      jest.advanceTimersByTime(3000); // trigger setTimeout
    });
    expect(container.querySelector('.path-elapsed')).toHaveClass('strokeBlack');
    expect(container.querySelector('.path-remaining')).toHaveClass('gray', 'transition-clockwise');
  })

});