import { render, screen } from '@testing-library/react';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import CategoriesPage from './pages/CategoriesPage';
import UsersPage from './pages/UsersPage';

test('renders home page content', () => {
  render(<Home />);
  
  // Check for the dashboard title
  const dashboardTitle = screen.getByText(/لوحة التحكم/i);
  expect(dashboardTitle).toBeInTheDocument();
});

test('renders products page content', () => {
  render(<ProductsPage />);
  
  // Check for the products page title
  const productsTitle = screen.getByText(/المنتجات/i);
  expect(productsTitle).toBeInTheDocument();
});

test('renders orders page content', () => {
  render(<OrdersPage />);
  
  // Check for the orders page title using a more specific selector
  const ordersTitle = screen.getByRole('heading', { name: /الطلبات/i });
  expect(ordersTitle).toBeInTheDocument();
});

test('renders categories page content', () => {
  render(<CategoriesPage />);
  
  // Check for the categories page title
  const categoriesTitle = screen.getByText(/الفئات/i);
  expect(categoriesTitle).toBeInTheDocument();
});

test('renders users page content', () => {
  render(<UsersPage />);
  
  // Check for the users page title
  const usersTitle = screen.getByText(/المستخدمين/i);
  expect(usersTitle).toBeInTheDocument();
});
