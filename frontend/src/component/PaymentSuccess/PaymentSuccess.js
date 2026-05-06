import React, { useEffect, useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation slightly after mount for a smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen px-5 flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#121212] to-black">
      <div 
        className={`transition-all duration-1000 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'} w-full max-w-md`}
      >
        <Card className="box-border w-full flex flex-col items-center relative overflow-hidden" sx={{
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.7)',
          p: 6,
          bgcolor: 'rgba(30, 30, 30, 0.65)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '1.5rem',
        }}>
          {/* Decorative glowing gradient effect behind the icon */}
          <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
          
          {/* Animated Icon Container */}
          <div className="relative z-10 w-24 h-24 mb-8 rounded-full bg-green-500/10 flex items-center justify-center group cursor-default">
            <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping opacity-75"></div>
            <TaskAltIcon 
              sx={{ fontSize: '4.5rem', color: '#4ade80' }} 
              className={`transition-transform duration-700 ${isLoaded ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'}`} 
            />
          </div>

          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-3 tracking-tight text-center">
            Payment Successful!
          </h1>
          
          <div className="w-12 h-1 bg-green-500/50 rounded-full mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/50 animate-pulse"></div>
          </div>

          <p className="text-center text-gray-200 text-lg mb-2 font-medium">
            Your order is confirmed.
          </p>
          <p className="text-center text-gray-400 text-sm mb-10 leading-relaxed px-4">
            Thank you for choosing our restaurant! Your order is currently being prepared and will be on its way shortly.
          </p>
          
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            startIcon={<HomeIcon />}
            className="w-full relative overflow-hidden transition-all duration-500 ease-in-out transform hover:-translate-y-[2px] active:scale-[0.98] active:translate-y-0"
            sx={{
              padding: '14px 32px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.5px',
              textTransform: 'none',
              bgcolor: '#e91e63',
              boxShadow: '0 4px 14px 0 rgba(233, 30, 99, 0.3)',
              '&:hover': {
                bgcolor: '#d81b60',
                boxShadow: '0 8px 25px -4px rgba(233, 30, 99, 0.5)',
              },
            }}
          >
            Back to Home
          </Button>
        </Card>
      </div>
    </div>
  );
};
