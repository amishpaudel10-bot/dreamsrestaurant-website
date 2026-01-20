// Full 20 Item Menu for Dreams Restaurant
const items = [
    { id: 1, name: 'Chicken Khana Set', price: 300 },
    { id: 2, name: 'Mutton Khana Set', price: 450 },
    { id: 3, name: 'Buff Momo (Steam)', price: 150 },
    { id: 4, name: 'Chicken Momo (Steam)', price: 200 },
    { id: 5, name: 'C-Momo Special', price: 250 },
    { id: 6, name: 'Chicken Chawmin', price: 180 },
    { id: 7, name: 'Veg Chawmin', price: 120 },
    { id: 8, name: 'Family Combo Pack', price: 1500 },
    { id: 9, name: 'Local Dhido Set', price: 350 },
    { id: 10, name: 'Chicken Sekuwa Pack', price: 400 },
    { id: 11, name: 'Buff Chilli Pack', price: 220 },
    { id: 12, name: 'Sadeko Wai Wai Extra', price: 80 },
    { id: 13, name: 'Chicken Fried Rice', price: 200 },
    { id: 14, name: 'Veg Fried Rice', price: 150 },
    { id: 15, name: 'Egg Curry Rice Set', price: 250 },
    { id: 16, name: 'Full Roast Chicken', price: 850 },
    { id: 17, name: 'Sausage Fry (Small)', price: 100 },
    { id: 18, name: 'Mix Veg Curry Set', price: 220 },
    { id: 19, name: 'Cold Drink (Large)', price: 250 },
    { id: 20, name: 'Dreams Platter', price: 1250 }
];

let selectedItem = null;

// Display the menu when page loads
window.onload = () => {
    const grid = document.getElementById('menuGrid');
    if (grid) {
        grid.innerHTML = items.map(i => `
            <div style="background:white; margin:8px; padding:12px; width:140px; text-align:center; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1); border:1px solid #eee;">
                <h3 style="font-size:14px; margin:5px 0; height:35px; overflow:hidden;">${i.name}</h3>
                <p style="font-weight:bold; color:#d32f2f; margin:5px 0;">NPR ${i.price}</p>
                <button onclick="startOrder(${i.id})" style="background:#d32f2f; color:white; border:none; padding:7px 12px; border-radius:5px; cursor:pointer; font-size:12px;">Order Now</button>
            </div>
        `).join('');
    }
};

// Start the ordering process
function startOrder(id) {
    selectedItem = items.find(i => i.id === id);
    document.getElementById('orderTitle').innerText = "Ordering: " + selectedItem.name;
    document.getElementById('orderForm').style.display = 'block';
    // Scroll down smoothly to the form
    window.scrollTo({ top: document.getElementById('orderForm').offsetTop - 50, behavior: 'smooth' });
}

// WhatsApp Order Submission
function submitToWA() {
    const nameInput = document.getElementById('custName');
    const locInput = document.getElementById('custLoc');
    
    if(!nameInput.value) { 
        alert("Please enter your name"); 
        return; 
    }
    
    const msg = `*NEW ORDER - DREAMS RESTAURANT*%0A--------------------------%0AItem: ${selectedItem.name}%0APrice: NPR ${selectedItem.price}%0ACustomer: ${nameInput.value}%0ALocation: ${locInput.value}`;
    window.open(`https://wa.me/9779766627143?text=${msg}`);
}

// Show/Hide Admin Login Box
function toggleAdminBox() {
    const box = document.getElementById('adminLogin');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

// NEW FLEXIBLE ADMIN LOGIN
function checkAdmin() {
    // .trim() removes extra spaces, .toLowerCase() makes it ignore capitalization
    const user = document.getElementById('admU').value.trim().toLowerCase();
    const pass = document.getElementById('admP').value.trim().toLowerCase();

    const correctUser = "sapana paudel";
    const correctPass = "pukuli";

    if (user === correctUser && pass === correctPass) {
        // Success
        document.getElementById('mainSite').style.display = 'none';
        document.getElementById('adminDash').style.display = 'block';
        document.getElementById('adminLogin').style.display = 'none';
    } else {
        // Failure
        alert("Incorrect Username or Password. Please check for spelling mistakes.");
    }
}
