// This is a JavaScript file that will be served for main.tsx requests
// It simply redirects to the main application

// Create a div element to show a message
const div = document.createElement('div');
div.style.display = 'flex';
div.style.justifyContent = 'center';
div.style.alignItems = 'center';
div.style.height = '100vh';
div.style.flexDirection = 'column';
div.style.fontFamily = 'Arial, sans-serif';

// Create a heading
const heading = document.createElement('h1');
heading.textContent = 'Redirecting...';
div.appendChild(heading);

// Create a paragraph with a link
const paragraph = document.createElement('p');
paragraph.innerHTML = 'If you are not redirected automatically, please click <a href="/-Catering-Reservation-and-Ordering-System/">here</a>.';
div.appendChild(paragraph);

// Add the div to the body
document.body.appendChild(div);

// Redirect to the main application after a short delay
setTimeout(function() {
  window.location.href = '/-Catering-Reservation-and-Ordering-System/';
}, 1000);