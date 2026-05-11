document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  function validateContactForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!firstName) {
      alert('First name is required.');
      return false;
    }
    if (!lastName) {
      alert('Last name is required.');
      return false;
    }
    if (!email) {
      alert('Email address is required.');
      return false;
    }
    if (!comment) {
      alert('Comment is required.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    return true;
  }

  // Run validation
  if (validateContactForm()) {
    const successModal = new bootstrap.Modal(document.getElementById('contactSuccessModal'));
    successModal.show();
    this.reset(); // Clear the form after successful submission
  }
});