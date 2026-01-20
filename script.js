// Default Menu Data
let defaultMenu = [
    { name: 'Momo', price: 150 },
    { name: 'Chawmin', price: 120 },
    { name: 'Chicken Khana Set', price: 200 },
    { name: 'Lassi', price: 80 },
    { name: 'Mutton', price: 250 },
    { name: 'Dal Bhat', price: 180 },
    { name: 'Sel Roti', price: 100 }
];

window.onload = function() {
    loadMenu();
};

function loadMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    defaultMenu.forEach(item => {
        menuGrid.innerHTML += `
            <div class="menu-item">
                <h3>${item.name}</h3>
                <p>NPR ${item.price}</p>
            </div>`;
    });
}

function toggleAdminLogin() {
    const form = document.getElementById('adminLoginForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function loginAdminFromHeader() {
    const user = document.getElementById('headerAdminUser').value;
    const pass = document.getElementById('headerAdminPass').value;

    // Credentials from your previous code
    if (user === 'Amish Paudel' && pass === 'amishff') {
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('adminLoginForm').style.display = 'none';
        alert('Welcome Admin!');
    } else {
        alert('Invalid credentials. Use Username: Amish Paudel and Password: amishff');
    }
}
