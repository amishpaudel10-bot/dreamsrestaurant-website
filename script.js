<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dreams Restaurant | Sapana Paudel</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body style="background:#f8f9fa; font-family: sans-serif; margin:0;">
    <header style="background:#d32f2f; color:white; padding:15px; text-align:center; position:sticky; top:0; z-index:100;">
        <h1 style="margin:0;">Dreams Restaurant</h1>
        <p style="margin:5px 0;">📍 Gaindakot-2, Riverside | Owner: Sapana Paudel</p>
        <button onclick="toggleAdminLogin()" style="background:none; border:1px solid white; color:white; padding:5px 10px; border-radius:4px; cursor:pointer;">Admin Login</button>
        
        <div id="adminLogin" style="display:none; padding:15px; background:white; color:black; border:2px solid #d32f2f; margin:10px; border-radius:8px;">
            <input type="text" id="admUser" placeholder="Amish Paudel" style="width:80%; padding:8px; margin-bottom:5px;">
            <input type="password" id="admPass" placeholder="Password" style="width:80%; padding:8px; margin-bottom:5px;">
            <button onclick="adminLogin()" style="width:85%; padding:10px; background:#d32f2f; color:white; border:none;">Login</button>
        </div>
    </header>

    <div id="userSection">
        <div style="background:#fff3cd; color:#856404; text-align:center; padding:10px; font-weight:bold;">
            🚀 Delivery under 30min (Naraynghat & Gaidakot) | 📞 976-6627143
        </div>
        
        <div id="packageGrid" style="display:flex; flex-wrap:wrap; justify-content:center; padding:15px;"></div>

        <div id="checkout" style="display:none; background:white; padding:20px; border-radius:15px; margin:15px; border:2px solid #ddd;">
            <h3 id="selectedTitle" style="color:#d32f2f;">Order Details</h3>
            <input type="text" id="cName" placeholder="Full Name" style="width:95%; padding:10px; margin-bottom:10px;">
            <select id="cLoc" style="width:100%; padding:10px; margin-bottom:10px;">
                <option value="Gaindakot">Gaindakot</option>
                <option value="Naraynghat">Naraynghat</option>
            </select>
            <input type="text" id="coupon" placeholder="Coupon Code" style="width:95%; padding:10px; margin-bottom:10px;">
            
            <div style="margin:15px 0; border:1px dashed #d32f2f; padding:10px; text-align:center;">
                <h4>Scan to Pay: NPR <span id="finalPriceDisplay">0</span></h4>
                <img src="qr.jpg" alt="Payment QR" style="width:180px; margin-bottom:10px; border:1px solid #eee;">
                <p>Upload Payment
    
