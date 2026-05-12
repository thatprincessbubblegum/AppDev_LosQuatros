
function preventNumbers(input) {
  input.addEventListener('input', function () {
    const pos = this.selectionStart;
    const cleaned = this.value.replace(/[0-9]/g, '');
    if (cleaned !== this.value) {
      this.value = cleaned;
      this.setSelectionRange(pos - 1, pos - 1);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
    const entryDateInput = document.getElementById("entryDate");
    const numApplicantsInput = document.getElementById("numApplicants");
    const applicantsContainer = document.getElementById("applicantsContainer");
    const visaForm = document.getElementById("visaForm");

    
    const today = new Date().toISOString().split("T")[0];
    entryDateInput.setAttribute("min", today);


    window.updateUI = function () {
        const select = document.getElementById("entryCountry");
        const selectedOption = select.options[select.selectedIndex];
        const flag = selectedOption.getAttribute("data-flag");
        const header = document.getElementById("destHeader");

    
        const backgrounds = {
            "China": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1000",
            "South Korea": "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1000",
            "Japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000",
            "USA": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1000",
            "Australia": "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1000",
            "Schengen": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000",
            "UK": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000",
            "Dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000",
            "Canada": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000",
            "New Zealand": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000"
        };

        if (select.value) {
            header.classList.remove("d-none");
            document.getElementById("displayDestName").textContent = select.value;
            document.getElementById("displayFlag").textContent = flag;

            // Change the background image dynamically
            const imageUrl = backgrounds[select.value] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000";
            header.style.backgroundImage = `url('${imageUrl}')`;
        }
    };


    numApplicantsInput.addEventListener("input", function () {
        applicantsContainer.innerHTML = "";
        const count = parseInt(this.value);

        if (isNaN(count) || count <= 0) return;

        for (let i = 0; i < count; i++) {
            const div = document.createElement("div");
            div.classList.add("applicant-block");
            div.innerHTML = `
                <div class="field-label text-primary mb-3">APPLICANT #${i + 1} DETAILS</div>
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="field-label">First Name</div>
                        <input type="text" class="form-control-custom firstName" required>
                    </div>
                    <div class="col-md-6">
                        <div class="field-label">Last Name</div>
                        <input type="text" class="form-control-custom lastName" required>
                    </div>
                    <div class="col-md-4">
                        <div class="field-label">Age</div>
                        <input type="number" class="form-control-custom age" min="0" max="120" required>
                    </div>
                    <div class="col-md-4">
                        <div class="field-label">Passport Holder?</div>
                        <select class="filter-select passport">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <div class="field-label">Traveled Abroad?</div>
                        <select class="filter-select travelHistory">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            `;
            applicantsContainer.appendChild(div);


            div.querySelectorAll('.firstName, .lastName').forEach(preventNumbers);
        }
    });


    visaForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const applicants = [];
        const blocks = document.querySelectorAll(".applicant-block");

        blocks.forEach((block) => {
            applicants.push({
                firstName: block.querySelector(".firstName").value,
                lastName: block.querySelector(".lastName").value,
                age: block.querySelector(".age").value,
                passport: block.querySelector(".passport").value,
                travelHistory: block.querySelector(".travelHistory").value
            });
        });

        const submissionData = {
            ticketID: "AV-" + Date.now().toString().slice(-6),
            destination: document.getElementById("entryCountry").value,
            dateOfEntry: entryDateInput.value,
            applicants: applicants
        };

        const successModal = new bootstrap.Modal(document.getElementById('visaSuccessModal'));
        successModal.show();

 
        let inquiries = JSON.parse(localStorage.getItem("aerostarInquiries")) || [];
        inquiries.push(submissionData);
        localStorage.setItem("aerostarInquiries", JSON.stringify(inquiries));

    
        visaForm.reset();
        applicantsContainer.innerHTML = "";
        document.getElementById("destHeader").classList.add("d-none");

    });
});
