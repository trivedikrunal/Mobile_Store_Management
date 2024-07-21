function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const validationUsername = document.querySelector('.validationUsername');
    const validationPassword = document.querySelector('.validationPassword');

    if (username === 'admin' && password === 'admin') {
        validationUsername.textContent = '';
        validationPassword.textContent = '';
        document.querySelector('.navbar').style.display = 'block';
        document.querySelector('.loginForm').style.display = 'none';
        document.querySelector('.createUserButton').style.display = 'block';


        const adminUser = {
            username: 'admin',
            access: {
                mobilePage: true,
                customerPage: true,
                purchasePage: true,
                salePage: true,
                reportPage: true,
            }
        };
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        displayUsers();
        return false;
    } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            validationUsername.textContent = '';
            validationPassword.textContent = '';
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'asset/html/desbord.html';
        } else {
            validationUsername.textContent = 'Invalid username or password';
            validationPassword.textContent = 'Invalid username or password';
        }
        return false;
    }
    

}
function clickUser(){
    document.querySelector('.adminForm').style.display = 'block';
    document.querySelector('.createUserButton').style.display = 'none';
    document.querySelector('.userTable').style.display = 'none';

    
}

function saveAdminSettings() {
    const user = {
        username: document.getElementById('adminUsername').value,
        email: document.getElementById('adminEmail').value,
        password: document.getElementById('adminPassword').value,
        access: {
            mobilePage: document.getElementById('mobilePage').checked,
            customerPage: document.getElementById('customerPage').checked,
            purchasePage: document.getElementById('purchasePage').checked,
            salePage: document.getElementById('salePage').checked,
            reportPage: document.getElementById('reportPage').checked,
        }
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    displayUsers();
    document.querySelector('.adminForm').reset();
    return false;
}

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTableBody = document.getElementById('userTableBody');

    userTableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.access.mobilePage ? 'Yes' : 'No'}</td>
            <td>${user.access.customerPage ? 'Yes' : 'No'}</td>
            <td>${user.access.purchasePage ? 'Yes' : 'No'}</td>
            <td>${user.access.salePage ? 'Yes' : 'No'}</td>
            <td>${user.access.reportPage ? 'Yes' : 'No'}</td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });

    document.querySelector('.userTable').style.display = users.length ? 'table' : 'none';
    document.querySelector('.adminForm').style.display = 'none';
    document.querySelector('.createUserButton').style.display = 'block';
}

function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    document.getElementById('adminUsername').value = user.username;
    document.getElementById('adminEmail').value = user.email;
    document.getElementById('adminPassword').value = user.password;
    document.getElementById('mobilePage').checked = user.access.mobilePage;
    document.getElementById('customerPage').checked = user.access.customerPage;
    document.getElementById('purchasePage').checked = user.access.purchasePage;
    document.getElementById('salePage').checked = user.access.salePage;
    document.getElementById('reportPage').checked = user.access.reportPage;

    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
    document.querySelector('.createUserButton').style.display = 'none';
    document.querySelector('.userTable').style.display = 'none';
    document.querySelector('.adminForm').style.display = 'block';


}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}


const user = { username: 'admin' }; 
const navbar = document.querySelector('.navbar');

if (user.username === 'admin'){
    {
        const li = document.createElement('sapn');
        li.innerHTML = '<a href="asset/html/mobile.html">Mobile <i class="fa-solid fa-mobile"></i></a>';
        navbar.appendChild(li);
    }
    {
        const li = document.createElement('sapn');
        li.innerHTML = '<a href="asset/html/customer.html">Customer <i class="fa-solid fa-user"></i></a>';
        navbar.appendChild(li);
    }
    {
        const li = document.createElement('sapn');
        li.innerHTML = '<a href="asset/html/purchase.html">Purchase <i class="fa-solid fa-cart-shopping"></i></a>';
        navbar.appendChild(li);
    }
    {
        const li = document.createElement('sapn');
        li.innerHTML = '<a href="asset/html/sale.html">Sale <i class="fa-solid fa-bag-shopping"></i></a>';
        navbar.appendChild(li);
    }
    {
        const li = document.createElement('sapn');
        li.innerHTML = '<a href="asset/html/report.html">Report <i class="fa-solid fa-file"></i></a>';
        navbar.appendChild(li);
    }
    const span = document.createElement('span');
        span.innerHTML = '<a href="#">Logout <i class="fa-solid fa-power-off"></i></a>';
        span.onclick = function () {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        };
        navbar.appendChild(span);
}
