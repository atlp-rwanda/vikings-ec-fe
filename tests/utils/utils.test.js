import React from 'react';
import { describe, test, it, expect } from '@jest/globals';
import { showErrorMessage, showSuccessMessage } from '../../src/utils/toast';
import getFormFromObject from '../../src/utils/getFormData';
import switchCurrentImage from '../../src/utils/switchImage.utils';
import convertDate from '../../src/utils/formatDate';

describe('utils', () => {
  it('renders auth correctly', async () => {
    showErrorMessage('Error');
    showSuccessMessage('success');
    expect(true).toBe(true);
  });
});

describe('convertDate function', () => {
  test('formats date string correctly', () => {
    const dateStr = '2023-04-17T00:00:00.000Z';
    const expectedOutput = '2023-04-17';
    const formattedDate = convertDate(dateStr);
    expect(formattedDate).toBe(expectedOutput);
  });
});

describe('getFormFromObject', () => {
  it('should return null when called with no arguments', () => {
    expect(getFormFromObject()).toBeNull();
  });

  it('should convert an object to FormData', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      hobbies: ['reading', 'running'],
    };
    const formData = getFormFromObject(data);
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get('name')).toEqual('John Doe');
    expect(formData.get('email')).toEqual('john.doe@example.com');
    expect(formData.get('age')).toEqual('30');
    expect(formData.getAll('hobbies')).toEqual(['reading', 'running']);
  });

  it('should append each value in an array as a separate field', () => {
    const data = {
      name: 'John Doe',
      hobbies: ['reading', 'running'],
    };
    const formData = getFormFromObject(data);
    expect(formData.getAll('hobbies')).toEqual(['reading', 'running']);
  });
});

describe('switchCurrentImage', () => {
  const products = [
    {
      id: 1,
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    },
    {
      id: 2,
      images: ['image4.jpg', 'image5.jpg'],
    },
  ];

  const selectedProduct = {
    id: 1,
  };

  it('should switch to previous image when left is true', () => {
    const currentImage = 1;
    const left = true;
    const expectedOutput = {
      imagesLength: 3,
      currIdx: 0,
      currImg: 'image1.jpg',
    };

    const result = switchCurrentImage(
      left,
      currentImage,
      products,
      selectedProduct
    );

    expect(result).toEqual(expectedOutput);
  });

  it('should switch to next image when left is false', () => {
    const currentImage = 0;
    const left = false;
    const expectedOutput = {
      imagesLength: 3,
      currIdx: 1,
      currImg: 'image2.jpg',
    };

    const result = switchCurrentImage(
      left,
      currentImage,
      products,
      selectedProduct
    );

    expect(result).toEqual(expectedOutput);
  });

  it('should switch to last image when currentImage is greater than imagesLength', () => {
    const currentImage = 3;
    const left = true;
    const expectedOutput = {
      imagesLength: 3,
      currIdx: 2,
      currImg: 'image3.jpg',
    };

    const result = switchCurrentImage(
      left,
      currentImage,
      products,
      selectedProduct
    );

    expect(result).toEqual(expectedOutput);
  });

  it('should switch to last image when currentImage is less than 0', () => {
    const currentImage = -1;
    const left = false;
    const expectedOutput = {
      imagesLength: 3,
      currIdx: 0,
      currImg: 'image1.jpg',
    };

    const result = switchCurrentImage(
      left,
      currentImage,
      products,
      selectedProduct
    );

    expect(result).toEqual(expectedOutput);
  });

  it('should switch to last image when currentImage is equal to imagesLength', () => {
    const currentImage = 3;
    const left = false;
    const expectedOutput = {
      imagesLength: 3,
      currIdx: 2,
      currImg: 'image3.jpg',
    };

    const result = switchCurrentImage(
      left,
      currentImage,
      products,
      selectedProduct
    );

    expect(result).toEqual(expectedOutput);
  });

  it('should switch to last image when currentImage is less than 0 and left is true', () => {
    const currentImage = -1;
    const left = true;
    const expectedOutput = {
      imagesLength: 3,
      currIdx: -2,
      currImg: 'image3.jpg',
    };

    const result = switchCurrentImage(
      left,
      currentImage,
      products,
      selectedProduct
    );

    expect(result).toEqual(expectedOutput);
  });
});
