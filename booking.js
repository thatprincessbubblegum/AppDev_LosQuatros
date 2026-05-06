// booking.js - All JavaScript functionality for the booking page

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

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Event listeners
  document.getElementById('selectionType').addEventListener('change', updateSummary);
  document.getElementById('selectionName').addEventListener('input', updateSummary);
  document.getElementById('numGuests').addEventListener('input', function () {
    const val = parseInt(this.value);
    renderGuests(val);
    updateGuestSummary();
    updateSummary();
  });

  enforceDateConstraints();
  updateSummary();

  // Form submission
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const ticketID = 'AB-' + Date.now().toString().slice(-6);
    alert('Booking Submitted Successfully!\nTicket ID: ' + ticketID);
  });
});