// Food Packages with Image Placeholders
const packages = [
    { id: 1, name: 'Family Special Pack', price: 1500, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300' },
    { id: 2, name: 'Chicken Khana Set', price: 300, img: 'https://images.unsplash.com/photo-1626777553732-480760f38101?w=300' },
    { id: 3, name: 'Momo Delight Bucket', price: 500, img: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=300' }
];

let selectedPkg = null;
let orderDB = JSON.parse(localStorage.getItem('dreams_orders_v1')) || [];

window.onload = () => {
    const grid = document.getElementById('packageGrid');
    grid.innerHTML = packages.map(pkg => `
        <div class="card">
            <img src="${pkg.img}" alt="${pkg.name}">
            <h3>${pkg.name}</h3>
            <p>NPR ${pkg.price}</p>
            <button onclick="openOrder(${pkg.id})">Order Now</button>
        </div>
    `).join('');
};

function openOrder(id) {
    selectedPkg = packages.find(p => p.id === id);
    document.getElementById('selectedItemName').innerText = selectedPkg.name;
    document.getElementById('displayPrice').innerText = selectedPkg.price;
    document.getElementById('orderModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function dispatchWhatsApp() {
    const name = document.getElementById('custName').value;
    const loc = document.getElementById('custLoc').value;
    const coup = document.getElementById('coupon').value;
    let finalPrice = selectedPkg.price;

    // Coupon logic
    if (coup === "DREAM10") {
        finalPrice = finalPrice * 0.9;
        alert("Coupon Applied! 10% Discount given.");
    }

    const newOrder = {
        id: Date.now(),
        customer: name,
        item: selectedPkg.name,
        price: finalPrice,
        location: loc,
        status: 'Pending'
    };

    orderDB.push(newOrder);
    localStorage.setItem('dreams_orders_v1', JSON.stringify(orderDB));

    // WhatsApp Dispatch
    const whatsappMsg = `*NEW ORDER - DREAMS RESTAURANT*%0A------------------%0AItem: ${selectedPkg.name}%0ACustomer: ${name}%0ALocation: ${loc}%0ATotal Price: NPR ${finalPrice}%0AStatus: Payment Uploaded`;
    window.open(`https://wa.me/9779766627143?text=${whatsappMsg}`);
    
    closeModal();
    alert("Order recorded in Admin Panel. Delivery under 30min!");
}

// Admin Functions
function toggleAdminLogin() {
    const loginDiv = document.getElementById('adminLoginBlock');
    loginDiv.style.display = loginDiv.style.display === 'block' ? 'none' : 'block';
}

function adminLogin() {
    const u = document.getElementById('admUser').value;
    const p = document.getElementById('admPass').value;
    if (u === "Amish Paudel" && p === "amishff") {
        document.getElementById('userInterface').style.display = 'none';
        document.getElementById('adminDash').style.display = 'block';
        document.getElementById('adminLoginBlock').style.display = 'none';
        renderAdmin();
    } else {
        alert("Invalid Access");
    }
}

function renderAdmin() {
    const pending = document.getElementById('pendingOrders');
    const history = document.getElementById('orderHistory');
    
    pending.innerHTML = orderDB.filter(o => o.status === 'Pending').map(o => `
        <div class="admin-card">
            <p><strong>${o.customer}</strong> ordered ${o.item} (${o.location})</p>
            <button onclick="updateStatus(${o.id}, 'Accepted')">Accept ✅</button>
            <button onclick="updateStatus(${o.id}, 'Declined')">Decline ❌</button>
        </div>
    `).join('');

    history.innerHTML = orderDB.filter(o => o.status !== 'Pending').map(o => `
        <p>${o.customer} - ${o.item} - <b>${o.status}</b></p>
    `).join('');
}

function updateStatus(id, newStatus) {
    const order = orderDB.find(o => o.id === id);
    order.status = newStatus;
    localStorage.setItem('dreams_orders_v1', JSON.stringify(orderDB));
    renderAdmin();
}
