document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const navbar = document.querySelector('.navbar');

    if (user && user.access) {
        navbar.innerHTML = '';

            if (user.access.mobilePage) {
                const li = document.createElement('sapn');
                li.innerHTML = '<a href="mobile.html">Mobile <i class="fa-solid fa-mobile"></i></a>';
                navbar.appendChild(li);
            }
            if (user.access.customerPage) {
                const li = document.createElement('sapn');
                li.innerHTML = '<a href="customer.html">Customer <i class="fa-solid fa-user"></i></a>';
                navbar.appendChild(li);
            }
            if (user.access.purchasePage) {
                const li = document.createElement('sapn');
                li.innerHTML = '<a href="purchase.html">Purchase <i class="fa-solid fa-cart-shopping"></i></a>';
                navbar.appendChild(li);
            }
            if (user.access.salePage) {
                const li = document.createElement('sapn');
                li.innerHTML = '<a href="sale.html">Sale <i class="fa-solid fa-bag-shopping"></i></a>';
                navbar.appendChild(li);
            }
            if (user.access.reportPage) {
                const li = document.createElement('sapn');
                li.innerHTML = '<a href="report.html">Report <i class="fa-solid fa-file"></i></a>';
                navbar.appendChild(li);
            }
        

        const span = document.createElement('span');
        span.innerHTML = '<a href="#">Logout <i class="fa-solid fa-power-off"></i></a>';

        span.onclick = function () {
            localStorage.removeItem('currentUser');
            window.location.href = '../../index.html';
        };
        navbar.appendChild(span);
    } else {
        window.location.href = '../../index.html';
    }
});
