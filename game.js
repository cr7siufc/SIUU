let entries = [];
let currentTicketNumber = 0;

function register() {
    const email = document.getElementById('email').value;
    if (email) {
        document.getElementById('registration').classList.remove('active');
        document.getElementById('menu').classList.add('active');
    } else {
        alert('Please enter an email to register.');
    }
}

function createNew() {
    document.getElementById('menu').classList.remove('active');
    document.getElementById('newEntry').classList.add('active');
}

function findEntry() {
    const ticketNumber = prompt("Enter Ticket Number:");
    const entry = entries.find(e => e.ticketNumber === ticketNumber);
    if (entry) {
        displayEntry(entry, false);
    } else {
        alert("Entry not found!");
    }
}

function editEntry() {
    const ticketNumber = prompt("Enter Ticket Number:");
    const entry = entries.find(e => e.ticketNumber === ticketNumber);
    if (entry) {
        displayEntry(entry, true);
    } else {
        alert("Entry not found!");
    }
}

function addCPT() {
    const cptTemplate = `
        <div class="cpt-entry">
            <input type="text" placeholder="CPT Code">
            <input type="number" placeholder="Billed Amount">
            <input type="number" placeholder="Allowed Amount">
            <input type="number" placeholder="Paid Amount">
            <input type="number" placeholder="Copay">
            <input type="number" placeholder="Coinsurance">
            <input type="number" placeholder="Deductible">
            <select>
                <option value="Check">Check</option>
                <option value="EFT">EFT</option>
            </select>
            <input type="text" placeholder="Check Number/EFT">
            <input type="date" placeholder="Issued on">
            <input type="date" placeholder="Check cashed Date">
            <input type="date" placeholder="Received on">
            <input type="date" placeholder="Processed on">
            <input type="text" placeholder="Call Reference">
        </div>
    `;
    document.getElementById('cptEntries').insertAdjacentHTML('beforeend', cptTemplate);
}

function saveEntry() {
    const form = document.getElementById('entryForm');
    let entryData = {
        ticketNumber: ++currentTicketNumber,
        denialReasons: Array.from(document.getElementById('denialReasons').selectedOptions).map(option => option.value),
        cptEntries: []
    };

    // Collect form data
    ['patientAccountNumber', 'insurance', 'providerName', 'memberDOB', 'claimNumber', 'totalChargeAmount', 'totalPaidAmount', 'isDenial'].forEach(field => {
        entryData[field] = form[field].value;
    });

    // Collect CPT entries
    const cptEntries = document.querySelectorAll('.cpt-entry');
    cptEntries.forEach(cpt => {
        let cptData = {};
        cpt.querySelectorAll('input, select').forEach(input => {
            cptData[input.placeholder || input.options[input.selectedIndex].text] = input.value;
        });
        entryData.cptEntries.push(cptData);
    });

    entries.push(entryData);
    alert("Your entry is saved successfully. Refer to the generated Ticket Number: " + entryData.ticketNumber);
    backToMenu();
}

function displayEntry(entry, editable) {
    document.getElementById('menu').classList.remove('active');
    const viewDiv = document.getElementById('viewEditEntry');
    viewDiv.innerHTML = `<h3>Ticket Number: ${entry.ticketNumber}</h3>`;
    
    // Dynamically populate the form with entry data
    let html = '';
    for (let key in entry) {
        if (key === 'cptEntries') {
            html += '<h4>CPT Entries:</h4>';
            entry[key].forEach(cpt => {
                html += '<div class="cpt-entry">';
                for (let cptKey in cpt) {
                    html += `<p>${cptKey}: ${cpt[cptKey]}</p>`;
                }
                html += '</div>';
            });
        } else if (key !== 'ticketNumber') {
            html += `<p>${key}: ${entry[key]}</p>`;
        }
    }
    
    viewDiv.innerHTML += html;

    if (editable) {
        // Here you would add logic to make fields editable for editing
    } else {
        // Make all elements read-only or disabled if not editable
        viewDiv.querySelectorAll('input, select').forEach(el => {
            el.disabled = true;
        });
    }
    viewDiv.classList.add('active');
}

function backToMenu() {
    document.getElementById('newEntry').classList.remove('active');
    document.getElementById('viewEditEntry').classList.remove('active');
    document.getElementById('menu').classList.add('active');
}