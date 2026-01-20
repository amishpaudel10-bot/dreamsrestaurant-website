let menu = JSON.parse(localStorage.getItem('menu')) || [{name:'Momo', price:150}];

window.onload = () => render();

function render() {
    const grid = document.getElementById('menuGrid');
    if(grid) grid.innerHTML = menu.map(item => `<div><h3>${item.name}</h3><p>${item.price}</p></div>`).join('');
}

function toggleAdminLogin() {
    document.getElementById('adminLoginForm').style.display = 'block';
}

function login() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u === 'Amish Paudel' && p === 'amishff') {
        document.getElementById('adminDashboard').style.display = 'block';
        updateAdmin();
    }
}

function addItem() {
    const n = document.getElementById('newItemName').value;
    const p = document.getElementById('newItemPrice').value;
    if(n && p) {
        menu.push({name: n, price: p});
        localStorage.setItem('menu', JSON.stringify(menu));
        render();
        updateAdmin();
    }
}

function updateAdmin() {
    document.getElementById('adminMenuList').innerHTML = menu.map(i => `<li>${i.name}</li>`).join('');
}
