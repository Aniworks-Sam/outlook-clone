import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthForm from './components/Auth/AuthForm';
import StartPage from './components/pages/StartPage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AuthForm/> } />
        <Route path="/start" element={<StartPage/> } />
      </Routes>
    </Layout>
  );
};

export default App;
