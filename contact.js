document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const successModal = new bootstrap.Modal(document.getElementById('contactSuccessModal'));
  successModal.show();
  this.reset();
});
