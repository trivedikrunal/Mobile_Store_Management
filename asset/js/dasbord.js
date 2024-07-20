document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const cardContainer = document.getElementById('card-container');

    if (user && user.access) {

        if (user.access.mobilePage) {
            const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <i class="fa-solid fa-mobile-alt"></i>
                        <h2>Mobile</h2>
                        <p>Manage your mobile</p>
                        <a href="mobile.html">Go to Mobile</a>
                    `;
                    cardContainer.appendChild(card);
        }
        if (user.access.customerPage) {
            const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <i class="fa-solid fa-user"></i>
                        <h2>Customer</h2>
                        <p>Manage your customer</p>
                        <a href="customer.html">Go to Customer</a>
                    `;
                    cardContainer.appendChild(card);
        }
        if (user.access.purchasePage) {
            const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <i class="fa-solid fa-cart-shopping"></i>
                        <h2>Purchase</h2>
                        <p>Manage your purchase</p>
                        <a href="purchase.html">Go to Purchase</a>
                    `;
                    cardContainer.appendChild(card);
        }
        if (user.access.salePage) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Sale</h2>
                <p>Manage your sale</p>
                <a href="sale.html">Go to Sale</a>
            `;
            cardContainer.appendChild(card);
        }
        if (user.access.reportPage) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <i class="fa-solid fa-file"></i>
                <h2>Report</h2>
                <p>Manage your report</p>
                <a href="report.html">Go to Report</a>
            `;
            cardContainer.appendChild(card);
        }

    }
});