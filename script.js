const packages = [
    { id: 1, name: 'Family Combo', price: 1200, img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'Khana Set Pack', price: 300, img: 'https://images.unsplash.com/photo-1626777553732-480760f38101?q=80&w=200&auto=format&fit=crop' },
    { id: 3, name: 'Momo Bucket', price: 500, img: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=200&auto=format&fit=crop' }
];

let selectedPackage = null;
let activeOrders = JSON.parse(localStorage.getItem('dreamsOrders')) || [];

window.onload = () => {
    const grid = document.getElementById('packageGrid');
    grid.innerHTML = packages.map(p => `
        <div class="card">
            <img src="${p.img}" width="100%">
            <h3>${p.name}</h3>
            <p>NPR ${p.price}</p>
            <button onclick="selectPackage(${p.id})">Select Package</button>
        </div>
    `).join('');
};

function selectPackage(id) {
    selectedPackage = packages.find(p => p.id === id);
    document.getElementById('orderForm').style.display = 'block';
    window.scrollTo(0, document.body.scrollHeight);
}

function submitOrder() {
    const name = document.getElementById('custName').value;
    const loc = document.getElementById('location').value;
    const coup = document.getElementById('coupon').value;
    let finalPrice = selectedPackage.price;

    if(coup === "DREAMS10") finalPrice *= 0.9; // 10% discount

    const newOrder = {
        id: Date.now(),
        customer: name,
        item: selectedPackage.name,
        price: finalPrice,
        location: loc,
        status: 'Pending'
    };

    activeOrders.push(newOrder);
    localStorage.setItem('dreamsOrders', JSON.stringify(activeOrders));

    // WhatsApp Dispatch
    const msg = `New Order: ${selectedPackage.name}%0AName: ${name}%0ALocation: ${loc}%0ATotal: NPR ${finalPrice}`;
    window.open(`https://wa.me/9779766627143?text=${msg}`);
    
    alert("Order Submitted! Please wait for Admin acceptance.");
}

function toggleAdmin() {
    document.getElementById('adminLogin').style.display = 'block';
}

function login() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u === "Amish Paudel" && p === "amishff") {
        document.getElementById('customerView').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        renderAdmin();
    }
}

function renderAdmin() {
    const pending = document.getElementById('pendingOrders');
    const history = document.getElementById('orderHistory');
    
    pending.innerHTML = activeOrders.filter(o => o.status === 'Pending').map(o => `
        <div style="border:1px solid red; padding:10px; margin:5px;">
            <p>${o.customer} ordered ${o.item} (${o.location})</p>
            <button onclick="updateStatus(${o.id}, 'Accepted')">Accept</button>
            <button onclick="updateStatus(${o.id}, 'Declined')">Decline</button>
        </div>
    `).join('');

    history.innerHTML = activeOrders.filter(o => o.status !== 'Pending').map(o => `
        <p>${o.customer} - ${o.item} [${o.status}]</p>
    `).join('');
}

function updateStatus(id, status) {
    const order = activeOrders.find(o => o.id === id);
    order.status = status;
    localStorage.setItem('dreamsOrders', JSON.stringify(activeOrders));
    renderAdmin();
}

