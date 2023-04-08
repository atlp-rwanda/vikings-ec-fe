import { create } from 'react-test-renderer';
import * as React from 'react';
import { BrowserRouter, MemoryRouter, Routes } from 'react-router-dom';
import { beforeAll, afterEach, afterAll } from '@jest/globals';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { getRoutes } from '../src/routes/AppRoutes';
import MainWrapper from '../src/MainWrapper';
import server from './mocks/server';
import 'regenerator-runtime/runtime';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const jestStore = mockStore({});

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
const renderRoute = (path) => create(
  <MainWrapper>
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        {getRoutes()}
      </Routes>
    </MemoryRouter>
  </MainWrapper>,
);
export const renderPath = (path) => render(
  <MainWrapper>
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        {getRoutes()}
      </Routes>
    </MemoryRouter>
  </MainWrapper>,
);
const Wrapper = ({ children }) => (
  <MainWrapper>
    <BrowserRouter>
      <>{children}</>
    </BrowserRouter>
  </MainWrapper>
);
export const renderComponent = (component) => render(component, { wrapper: Wrapper });
export const simpleRender = (component) => create(
  <MainWrapper>
    <BrowserRouter>
      {component}
    </BrowserRouter>
  </MainWrapper>,
);
afterAll(() => {
  server.close();
});

export default renderRoute;
