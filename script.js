// Pre-loaded Nepali Menu Data
let menu = JSON.parse(localStorage.getItem('myMenu')) || [
    { name: 'Chicken Khana Set', price: 300 },
    { name: 'Mutton Khana Set', price: 450 },
    { name: 'Buff Momo (Steam)', price: 150 },
    { name: 'Chicken Momo', price: 200 },
    { name: 'Veg Chawmin', price: 120 },
    { name: 'Chicken Chawmin', price: 180 },
    { name: 'Dhido Set (Local)', price: 350 },
    { name: 'Sekuwa (Per Plate)', price: 250 },
    { name: 'Sel Roti with Tarkari', price: 100 },
    { name: 'Lassi', price: 80 }
];

function render() {
    const grid = document.getElementById('menuGrid');
    if(!grid) return;
    grid.innerHTML = menu.map(item => `
        <div style="border:1px solid #ddd; margin:10px; padding:15px; width:160px; text-align:center; border-radius:10px; background:white; box-shadow: 2px 2px 5px #ccc;">
            <h3 style="color:#d32f2f; margin:5px 0;">${item.name}</h3>
            <p style="font-weight:bold;">NPR ${item.price}</p>
            <button onclick="alert('Order for ${item.name} placed!')" style="background:#d32f2f; color:white; border:none; padding:5px; cursor:pointer;">Order Now</button>
        </div>
    `).join('');
}

function login() {
    const u = document.getElementById('adminUser').value;
    const p = document.getElementById('adminPass').value;
    // Using your specific credentials
    if(u === "Amish Paudel" && p === "amishff") {
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('menuGrid').style.display = 'none';
        document.getElementById('adminLoginForm').style.display = 'none';
        updateAdmin();
    } else {
        alert("Invalid Admin Credentials");
    }
}

function addItem() {
    const name = document.getElementById('n').value;
    const price = document.getElementById('p').value;
    if(name && price) {
        menu.push({name: name, price: price});
        localStorage.setItem('myMenu', JSON.stringify(menu));
        updateAdmin();
        render();
        // Clear inputs after adding
        document.getElementById('n').value = '';
        document.getElementById('p').value = '';
    }
}

function deleteItem(index) {
    if(confirm("Delete this item?")) {
        menu.splice(index, 1);
        localStorage.setItem('myMenu', JSON.stringify(menu));
        updateAdmin();
        render();
    }
}

function updateAdmin() {
    document.getElementById('adminList').innerHTML = menu.map((i, index) => `
        <li style="margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
            <strong>${i.name}</strong> - NPR ${i.price} 
            <button onclick="deleteItem(${index})" style="background:black; color:white; font-size:10px;">Delete</button>
        </li>
    `).join('');
}

window.onload = render;
