// This is a placeholder file to prevent 404 errors
// The actual code is in the bundled JavaScript file
import React from 'react';
import ReactDOM from 'react-dom/client';

// Create a simple component
const PlaceholderComponent: React.FC = () => {
  React.useEffect(() => {
    // Redirect to the main application
    window.location.href = '/-Catering-Reservation-and-Ordering-System/';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Redirecting...</h1>
      <p>If you are not redirected automatically, please click <a href="/-Catering-Reservation-and-Ordering-System/">here</a>.</p>
    </div>
  );
};

// Render the component
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PlaceholderComponent />
  </React.StrictMode>
);