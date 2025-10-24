import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import Reviews from './components/Reviews.jsx';
import Books from './components/Books.jsx';
import BookDetail from './components/BookDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/reviews', element: <Reviews /> },
      { path: '/books', element: <Books /> },
      { path: '/books/:bookId', element: <BookDetail /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
