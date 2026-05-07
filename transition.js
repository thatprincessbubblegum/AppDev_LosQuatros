
  // "Book" button in navbar
  const bookButton = document.querySelector('a[href="book.html"]');
  const curtain = document.querySelector('.page-transition');

  if(bookButton) { // Check if the button exists on this page
    bookButton.addEventListener('click', function(e) {
      e.preventDefault(); // Stop the browser from leaving immediately
      
      curtain.classList.add('active'); // Slide curtain 
      
      // Wait 1.5 seconds, then actually go to the booking page
      setTimeout(() => {
        window.location.href = "book.html";
      }, 1000);
    });
  }
