import { AuthProvider } from './providers/AuthProvider';
import Router from './routes/Router';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
