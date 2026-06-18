import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import EventsPage from './pages/EventsPage';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const EventFormPage = lazy(() => import('./pages/EventFormPage'));
const MyRegistrationsPage = lazy(() => import('./pages/MyRegistrationsPage'));
const loadPage = (page) => <Suspense fallback={null}>{page}</Suspense>;

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<EventsPage />} />
      <Route path="/events/:id" element={loadPage(<EventDetailsPage />)} />
      <Route path="/login" element={loadPage(<AuthPage mode="login" />)} />
      <Route path="/register" element={loadPage(<AuthPage mode="register" />)} />
      <Route element={<ProtectedRoute />}>
        <Route path="/my-registrations" element={loadPage(<MyRegistrationsPage />)} />
      </Route>
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="/events/new" element={loadPage(<EventFormPage />)} />
        <Route path="/events/:id/edit" element={loadPage(<EventFormPage />)} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Route>
  </Routes>
);

export default App;
