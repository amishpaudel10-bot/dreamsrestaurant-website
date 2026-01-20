// Default data
let defaultMenu = [
    { name: 'Momo', price: 150 },
    { name: 'Chawmin', price: 120 },
    { name: 'Chicken Khana Set', price: 200 },
    { name: 'Lassi', price: 80 },
    { name: 'Mutton', price: 250 },
    { name: 'Dal Bhat', price: 180 },
    { name: 'Sel Roti', price: 100 },
    { name: 'Aloo Tama', price: 160 },
    { name: 'Gundruk', price: 140 },
    { name: 'Buff Sukuti', price: 220 }
];

let adminPassword = localStorage.getItem('adminPassword') || 'amishff';
let menuItems = JSON.parse(localStorage.getItem('menuItems')) || defaultMenu;
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let qrCodes = JSON.parse(localStorage.getItem('qrCodes')) || {};

// Load data on page load
window.onload = function() {
    loadMenu();
    loadQRCodes();
    loadSiteSettings();
};

// Load menu items
function loadMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const select = document.getElementById('items');
    menuGrid.innerHTML = '';
    select.innerHTML = '';
    menuItems.forEach((item, index) => {
        menuGrid.innerHTML += `<div class="menu-item"><h3>${item.name}</h3><p>NPR ${item.price}</p></div>`;
        select.innerHTML += `<option value="${item.name} - NPR ${item.price}">${item.name} - NPR ${item.price}</option>`;
    });
}

// Load site settings
function loadSiteSettings() {
    document.getElementById('restaurantName').innerText = localStorage.getItem('restaurantName') || 'Dreams Restaurant and Mini Lodge';
    document.getElementById('customerService').innerText = localStorage.getItem('customerService') || '+977 982-5205381';
    document.getElementById('contactPhone').innerText = localStorage.getItem('contactPhone') || '+977 982-5205381';
    document.getElementById('contactEmail').innerText = localStorage.getItem('contactEmail') || 'info@dreamsrestaurant.com';
}

// Toggle Admin Login Form in Header
function toggleAdminLogin() {
    const form = document.getElementById('adminLoginForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Login from Header
function loginAdminFromHeader() {
    const user = document.getElementById('headerAdminUser').value;
    const pass = document.getElementById('headerAdminPass').value;
    if (user === 'Amish Paudel' && pass === adminPassword) {
        showAdminDashboard();
    } else {
        alert('Invalid credentials');
    }
}

// Show Admin Dashboard
function showAdminDashboard() {
    // Calculate stats
    const totalUsers = new Set(orders.map(o => o.name)).size; // Unique users
    const totalOrders = orders.length;
    const totalMenuItems = menuItems.length;

    document.body.innerHTML = `
        <div class="admin-dashboard">
            <div class="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome, Amish Paudel!</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Users</h3>
                    <p>${totalUsers}</p>
                </div>
                <div class="stat-card">
                    <h3>Total Orders</h3>
                    <p>${totalOrders}</p>
                </div>
                <div class="stat-card">
                    <h3>Total Menu Items</h3>
                    <p>${totalMenuItems}</p>
                </div>
            </div>
            <div class="admin-nav">
                <button onclick="manageMenu()">Manage Menu</button>
                <button onclick="changePassword()">Change Password</button>
                <button onclick="location.reload()">Logout</button>
            </div>
            <div id="adminOutput" class="admin-section"></div>
        </div>
    `;
}

// Manage Menu
function manageMenu() {
    let output = '<h4>Manage Menu Items</h4><ul>';
    menuItems.forEach((item, index) => {
        output += `<li>${item.name} - NPR ${item.price} <button onclick="editMenuItem(${index})">Edit</button> <button onclick="deleteMenuItem(${index})">Delete</button></li>`;
    });
    output += '</ul><div class="add-item-form"><h5>Add New Item</h5><input type="text" id="newItemName" placeholder="Item Name"><input type="number" id="newItemPrice" placeholder="Price (NPR)"><button onclick="addMenuItem()">Add Item</button></div>';
    document.getElementById('adminOutput').innerHTML = output;
}

function addMenuItem() {
    const name = document.getElementById('newItemName').value;
    const price = document.getElementById('newItemPrice').value;
    if (name && price) {
        menuItems.push({ name, price: parseInt(price) });
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        loadMenu();
        manageMenu();
    } else {
        alert('Please fill in both fields.');
    }
}

function editMenuItem(index) {
    const item = menuItems[index];
    const name = prompt('Edit Name:', item.name);
    const price = prompt('Edit Price:', item.price);
    if (name && price) {
        menuItems[index] = { name, price: parseInt(price) };
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        loadMenu();
        manageMenu();
    }
}

function deleteMenuItem(index) {
    if (confirm('Delete this item?')) {
        menuItems.splice(index, 1);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        loadMenu();
        manageMenu();
    }
}

// Change Password
function changePassword() {
    document.getElementById('adminOutput').innerHTML = `
        <
