const selectionOptions = {
  Destination: [
    'Japan', 'South Korea', 'China', 'United States',
    'Spain', 'Boracay', 'Manila', 'Palawan'
  ],
  Package: [
    'The Wonders of Central Vietnam',
    'Jeju Island Spring Wonders',
    'Funtastic Nagoya Saver'
  ]
};

// Image mapping for Destinations and Packages
const destinationImages = {
  'Japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&h=600',
  'South Korea': 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&h=600',
  'China': 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&h=600',
  'United States': 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&h=600',
  'Spain': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&h=600',
  'Boracay': 'https://images.unsplash.com/photo-1553195029-754fbd369560?auto=format&fit=crop&w=800&h=600',
  'Manila': 'https://images.unsplash.com/photo-1598258710957-db8614c2881e?auto=format&fit=crop&w=800&h=600',
  'Palawan': 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&h=600'
};

const packageImages = {
  'The Wonders of Central Vietnam': 'https://image.vietnam.travel/sites/default/files/styles/top_banner/public/2019-02/Central%20Vietnam%20Travel%20Guide-2_0.jpg?itok=tkYt3Jqd',
  'Jeju Island Spring Wonders': 'https://www.foodandwine.com/thmb/sRu0hfyvMYCMFmS-pi7gYaOuzvQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Jeju-Island-Hawaii-of-Korea-FT-BLOG0723-8e127cbf94c048ffa2b59f12070af3fb.jpg',
  'Funtastic Nagoya Saver': 'https://a.cdn-hotels.com/gdcs/production35/d333/c8b7bf51-d93e-497c-ad33-a9928720ae85.jpg'
};

// Default fallback image
const defaultImage = 'https://via.placeholder.com/400x300?text=Select+a+Destination+or+Package';

function updateDynamicImage() {
  const type = document.getElementById('selectionType').value;
  const name = document.getElementById('selectionName').value;
  const imgElement = document.getElementById('dynamicImage');
  
  if (!imgElement) return;
  
  if (!name || name === 'Select a destination' || name === 'Select a package') {
    imgElement.src = defaultImage;
    return;
  }
  
  let imageUrl = defaultImage;
  if (type === 'Destination') {
    imageUrl = destinationImages[name] || defaultImage;
  } else if (type === 'Package') {
    imageUrl = packageImages[name] || defaultImage;
  }
  
  imgElement.src = imageUrl;
}

function populateSelectionName(type) {
  const select = document.getElementById('selectionName');
  const label = type === 'Package' ? 'Select a package' : 'Select a destination';
  select.innerHTML = `<option value="" disabled selected>${label}</option>`;
  selectionOptions[type].forEach(function(item) {
    const opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    select.appendChild(opt);
  });
  updateSummary();
}

function buildGuestBlock(index) {
  const label = index === 0 ? 'PRIMARY' : 'ADDITIONAL';
  return `
    <div class="guest-block" id="guest-block-${index}">
      <div class="guest-pill">[GUEST ${index + 1} — ${label}]</div>

      <div class="row g-2 mb-2">
        <div class="col-sm-3">
          <label class="field-label" style="font-size:12px;">First Name</label>
          <input type="text" class="form-control form-control-sm" placeholder="First Name" required>
        </div>
        <div class="col-sm-3">
          <label class="field-label" style="font-size:12px;">Last Name</label>
          <input type="text" class="form-control form-control-sm" placeholder="Last Name" required>
        </div>
        <div class="col-sm-3">
          <label class="field-label" style="font-size:12px;">Date of Birth</label>
          <input type="date" class="form-control form-control-sm" required>
        </div>
        <div class="col-sm-3">
          <label class="field-label" style="font-size:12px;">Guest Type:</label>
          <select class="form-select form-select-sm guest-type-select" data-index="${index}" required>
            <option value="Adult">Adult</option>
            <option value="Minor">Minor</option>
          </select>
        </div>
      </div>

      <div class="row g-2 mb-1">
        <div class="col-sm-6">
          <label class="field-label" style="font-size:12px;">Email Address</label>
          <input type="email" class="form-control form-control-sm" placeholder="Email" ${index === 0 ? 'required' : ''}>
        </div>
      </div>

      <div class="travel-docs-title">TRAVEL DOCUMENTS:</div>

      <div class="row g-2">
        <div class="col-sm-4">
          <label class="field-label" style="font-size:12px;">Passport Number</label>
          <input type="text" class="form-control form-control-sm" placeholder="Passport Number">
        </div>
        <div class="col-sm-4">
          <label class="field-label" style="font-size:12px;">Passport Expiry</label>
          <input type="date" class="form-control form-control-sm" placeholder="Passport Expiry">
        </div>
        <div class="col-sm-4">
          <label class="field-label" style="font-size:12px;">Nationality</label>
          <input type="text" class="form-control form-control-sm" placeholder="Nationality">
        </div>
      </div>
    </div>
  `;
}

function renderGuests(count) {
  const container = document.getElementById('guestContainer');
  if (!count || count < 1) {
    container.innerHTML = '<p class="text-muted" style="font-size:13px;">Enter number of guests to fill in passenger details.</p>';
    return;
  }
  let html = '';
  for (let i = 0; i < count; i++) {
    html += buildGuestBlock(i);
  }
  container.innerHTML = html;
  updateGuestSummary();

  document.querySelectorAll('.guest-type-select').forEach(sel => {
    sel.addEventListener('change', updateGuestSummary);
  });
}

function updateGuestSummary() {
  const selects = document.querySelectorAll('.guest-type-select');
  const counts = {};
  selects.forEach(s => {
    counts[s.value] = (counts[s.value] || 0) + 1;
  });
  const parts = Object.entries(counts).map(([type, n]) => `${n} ${type}${n > 1 ? 's' : ''}`);
  document.getElementById('summaryGuests').textContent = parts.length ? parts.join(', ') : '—';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

function calculateDuration(start, end) {
  if (!start || !end) return '—';
  const startDate = new Date(start + 'T00:00:00');
  const endDate = new Date(end + 'T00:00:00');
  const diffTime = endDate - startDate;
  if (diffTime < 0) return 'Invalid (end before start)';
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function updateSummary() {
  const type = document.getElementById('selectionType').value;
  const name = document.getElementById('selectionName').value || '—';
  document.getElementById('summaryType').textContent = type;
  document.getElementById('summaryName').textContent = name;

  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  document.getElementById('summaryStart').textContent = formatDate(startDate);
  document.getElementById('summaryEnd').textContent = formatDate(endDate);
  
  const duration = calculateDuration(startDate, endDate);
  document.getElementById('summaryDuration').textContent = duration;
}

function enforceDateConstraints() {
  const today = new Date().toISOString().split('T')[0];
  const startInput = document.getElementById('startDate');
  const endInput = document.getElementById('endDate');
  
  startInput.setAttribute('min', today);
  
  startInput.addEventListener('change', function() {
    if (this.value) {
      endInput.setAttribute('min', this.value);
    } else {
      endInput.setAttribute('min', today);
    }
    if (endInput.value && endInput.value < this.value) {
      endInput.value = '';
    }
    updateSummary();
  });
  
  endInput.addEventListener('change', function() {
    if (startInput.value && this.value < startInput.value) {
      alert('End date cannot be before start date.');
      this.value = '';
    }
    updateSummary();
  });
}

// Validation
function validateForm() {
  // Destination or Package validation
  const selectionName = document.getElementById('selectionName');
  if (!selectionName.value || selectionName.value === '') {
    alert('Please select a destination or package.');
    return false;
  }

  // Guest number validation
  const numGuestsInput = document.getElementById('numGuests');
  let numGuests = parseInt(numGuestsInput.value);
  if (isNaN(numGuests) || numGuests < 1) {
    alert('Please enter a valid number of guests (at least 1).');
    return false;
  }

  // Start date and end date validation
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  if (!startDate) {
    alert('Please select a start date.');
    return false;
  }
  if (!endDate) {
    alert('Please select an end date.');
    return false;
  }
  if (new Date(endDate) < new Date(startDate)) {
    alert('End date cannot be before start date.');
    return false;
  }

  // Guest blocks validation
  const guestBlocks = document.querySelectorAll('.guest-block');
  if (guestBlocks.length !== numGuests) {
    alert('Please enter the number of guests first, then fill in all guest details.');
    return false;
  }

  for (let i = 0; i < guestBlocks.length; i++) {
    const block = guestBlocks[i];
    const firstName = block.querySelector('input[placeholder="First Name"]').value.trim();
    const lastName = block.querySelector('input[placeholder="Last Name"]').value.trim();
    const dob = block.querySelector('input[type="date"]').value;
    const guestType = block.querySelector('.guest-type-select').value;
    const emailInput = block.querySelector('input[type="email"]');
    const passportNum = block.querySelector('input[placeholder="Passport Number"]').value.trim();
    const passportExpiry = block.querySelector('input[placeholder="Passport Expiry"]').value;
    const nationality = block.querySelector('input[placeholder="Nationality"]').value.trim();

    if (!firstName) {
      alert(`Guest ${i+1}: First name is required.`);
      return false;
    }
    if (!lastName) {
      alert(`Guest ${i+1}: Last name is required.`);
      return false;
    }
    if (!dob) {
      alert(`Guest ${i+1}: Date of birth is required.`);
      return false;
    }
    if (!guestType) {
      alert(`Guest ${i+1}: Guest type is required.`);
      return false;
    }
    // Primary guest (index 0) must have email
    if (i === 0 && (!emailInput || !emailInput.value.trim())) {
      alert(`Primary guest email address is required.`);
      return false;
    }
    // Validate passport details for all guests
    if (!passportNum) {
      alert(`Guest ${i+1}: Passport number is required.`);
      return false;
    }
    if (!passportExpiry) {
      alert(`Guest ${i+1}: Passport expiry date is required.`);
      return false;
    }
    if (!nationality) {
      alert(`Guest ${i+1}: Nationality is required.`);
      return false;
    }
    // Check passport expiry is not in the past
    const today = new Date().toISOString().split('T')[0];
    if (passportExpiry < today) {
      alert(`Guest ${i+1}: Passport expiry date cannot be in the past.`);
      return false;
    }
  }

  return true;
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Event listeners
  document.getElementById('selectionType').addEventListener('change', function() {
    populateSelectionName(this.value);
	updateDynamicImage();
  });
  document.getElementById('selectionName').addEventListener('change', function() {
    updateSummary();
    updateDynamicImage();
  });
  document.getElementById('numGuests').addEventListener('input', function () {
    const val = parseInt(this.value);
    renderGuests(val);
    updateGuestSummary();
    updateSummary();
  });

  enforceDateConstraints();
  populateSelectionName(document.getElementById('selectionType').value);
  updateSummary();
  updateDynamicImage();

  // Form submission with validation
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Validate all fields before showing success modal
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    
    const successModal = new bootstrap.Modal(document.getElementById('bookingSuccessModal'));
    successModal.show();
  });
  
  // Reset form when success modal is closed
  const successModalElement = document.getElementById('bookingSuccessModal');
  successModalElement.addEventListener('hidden.bs.modal', function() {
    resetBookingForm();
  });
});