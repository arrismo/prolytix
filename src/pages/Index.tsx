
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Login...</h1>
      </div>
    </div>
  );
};

export default Index;
