

  const bookButton = document.querySelector('a[href="book.html"]');
  const curtain = document.querySelector('.page-transition');

  if(bookButton) {
    bookButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      curtain.classList.add('active');
      

      setTimeout(() => {
        window.location.href = "book.html";
      }, 1000);
    });
  }
