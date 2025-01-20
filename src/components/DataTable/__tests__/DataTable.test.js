import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from '../DataTable';

// Mock fetch API
global.fetch = jest.fn();

const mockData = [
    {
      "s.no": 1,
      "amt.pledged": 15823,
      "percentage.funded": 186,
    },
    {
      "s.no": 2,
      "amt.pledged": 25000,
      "percentage.funded": 125,
    }
];

beforeEach(() => {
    fetch.mockClear();
  });

  describe('DataTable Component', () => {
    test('displays loader while fetching data', ()=>{

    })
  })