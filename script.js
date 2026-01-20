// Default Menu Data
// --- DATABASE INITIALIZATION ---
let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [
    { name: 'Momo', price: 150 },
    { name: 'Chawmin', price: 120 },
    { name: 'Dal Bhat', price: 180 }
];

let orders = JSON.parse(localStorage.getItem('orders')) || [];

// --- CORE FUNCTIONS ---
window.onload = function() {
    renderMenu();
    renderAdminMenu();
};

// 1. Show Menu to Customers
function renderMenu() {
    const grid = document.getElementById('menuGrid');
    if(!grid) return;
    grid.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <h3>${item.name}</h3>
            <p>NPR ${item.price}</p>
            <button onclick="placeOrder('${item.name}')">Order Now</button>
        </div>
    `).join('');
}

// 2. Admin Logic
function toggleAdminLogin() {
    const form = document.getElementById('adminLoginForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function loginAdminFromHeader() {
    const user = document.getElementById('headerAdminUser').value;
    const pass = document.getElementById('headerAdminPass').value;

    if (user === 'Amish Paudel' && pass === 'amishff') {
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('adminLoginForm').style.display = 'none';
        renderAdminMenu();
    } else {
        alert('Wrong credentials!');
    }
}

// 3. Admin Control Features (Add/Delete Menu)
function renderAdminMenu() {
    const adminList = document.getElementById('adminMenuList');
    if(!adminList) return;
    adminList.innerHTML = menuItems.map((item, index) => `
        <li>
            ${item.name} - ${item.price} NPR 
            <button onclick="deleteItem(${index})" style="background:black; padding:2px 5px;">X</button>
        </li>
    `).join('');
}

function addNewItem() {
    const name = document.getElementById('newItemName').value;
    const price = document.getElementById('newItemPrice').value;
    if(name && price) {
        menuItems.push({ name, price: parseInt(price) });
        saveAndRefresh();
    }
}

function deleteItem(index) {
    menuItems.splice(index, 1);
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    renderMenu();
    renderAdminMenu();
}

function placeOrder(itemName) {
    orders.push({ item: itemName, time: new Date().toLocaleTimeString() });
    localStorage.setItem('orders', JSON.stringify(orders));
    alert(itemName + " added to orders!");
        }
