// This is a special version of main.tsx that handles 404 errors
console.log("main.tsx loaded successfully");

// Simple JavaScript version that doesn't require React
(function() {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Log that main.tsx was loaded
    console.log('main.tsx loaded successfully');
    
    // Create a message element
    var messageElement = document.createElement('div');
    messageElement.style.display = 'none';
    messageElement.id = 'main-tsx-loaded';
    messageElement.textContent = 'main.tsx loaded successfully';
    
    // Add the message element to the body when it's available
    if (document.body) {
      document.body.appendChild(messageElement);
    } else {
      window.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(messageElement);
      });
    }
    
    // Redirect to the main application after a short delay
    setTimeout(function() {
      window.location.href = '/-Catering-Reservation-and-Ordering-System/';
    }, 100);
  }
})();