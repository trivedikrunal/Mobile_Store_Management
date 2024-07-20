console.log("Kanish");

function clickSale() {
    document.querySelector(".createSaleButton").style.display = "none";
    document.querySelector(".saleForm").style.display = "block";
    document.querySelector(".customerSalesTable2").style.display = "none";
    document.querySelector("#saleDetailsDisplay").style.display = "none";
    console.log("Kanish");
}

// Only Customer Name Show
var customerName = JSON.parse(localStorage.getItem("customerDeletails"));
let datalistCustomer = document.getElementById('datalistCustomer');
customerName.forEach(customer => {
    if (customer.typePerson === "Customer") {
        let option = document.createElement('option');
        option.value = customer.cName;
        datalistCustomer.appendChild(option);
    }
});

// Only Mobile Name Show
var mobileName = JSON.parse(localStorage.getItem("mobileDeletails"));
let datalistMobile = document.getElementById('datalistMobile');
mobileName.forEach(mobile => {
    let option = document.createElement('option');
    option.value = mobile.mName;
    datalistMobile.appendChild(option);
});

function showInputField() {
    document.getElementById("mobileInput").style.display = "block";
    document.getElementById("addProductTitle").style.display = "none";
}

function mySalesProduct(value) {
    let selectedProduct = mobileName.find(product => product.mName.toLowerCase() === value.toLowerCase());
    if (selectedProduct) {
        var salesTableData = document.querySelector(".salesTable");
        var newRow = document.createElement('tr');
        var originalPrice = selectedProduct.mPrice;
        var unitPrice = originalPrice; 
        var quantity = 1;
        var totalPrice = unitPrice * quantity;
        var profitLoss = totalPrice - (originalPrice * quantity);

        newRow.innerHTML = `
            <td>
                <span class="mobileName" onclick="mobileNameReselectSale(this)">${selectedProduct.mName}</span>
                <input type="text" list="datalistMobile" class="editMobileInput" style="display:none;">
            </td>
            <td><input type="number" value="${quantity}" class="mobileSelectQnt"></td>
            <td><input type="number" value="${unitPrice}" class="unitPriceInput"></td>
            <td class="originalPrice">${originalPrice}</td>
            <td class="totalPrice">${totalPrice}</td>
            <td class="profitLoss">${profitLoss}</td>
            <td><button type="button" class="deleteBtn"><i class="fa-solid fa-trash"></i></button></td>
        `;

        salesTableData.insertBefore(newRow, document.getElementById("addProductTitleRow"));

        var mobileSelectQnt = newRow.querySelector(".mobileSelectQnt");
        var unitPriceInput = newRow.querySelector(".unitPriceInput");
        var totalPriceElement = newRow.querySelector(".totalPrice");
        var profitLossElement = newRow.querySelector(".profitLoss");

        function updateTotalPrice() {
            var quantity = parseInt(mobileSelectQnt.value);
            var unitPrice = parseFloat(unitPriceInput.value);
            var totalPrice = quantity * unitPrice;
            var profitLoss = totalPrice - (quantity * originalPrice);
            totalPriceElement.innerText = totalPrice;
            profitLossElement.innerText = profitLoss;
            updateTotalAmount();
        }

        mobileSelectQnt.addEventListener("change", updateTotalPrice);
        unitPriceInput.addEventListener("change", updateTotalPrice);

        var deleteBtn = newRow.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", function () {
            newRow.remove();
            updateTotalAmount();
        });

        var editMobileInput = newRow.querySelector(".editMobileInput");
        editMobileInput.addEventListener("input", function () {
            editSalesProduct(newRow, this.value);
        });

        document.getElementById("mobileInput").value = "";
        document.getElementById("mobileInput").style.display = "none";
        document.getElementById("addProductTitle").style.display = "block";
        updateTotalAmount();
    } else {
        alert("Product Not Selected Error....");
    }
}
// Reselect Mobile Name
function mobileNameReselectSale(reseletM) {
    var row = reseletM.parentNode.parentNode;
    var mobileNameSpan = row.querySelector(".mobileName");
    var editMobileInput = row.querySelector(".editMobileInput");
    if (editMobileInput.style.display === "none") {
        editMobileInput.value = mobileNameSpan.innerText;
        editMobileInput.style.display = "block";
        mobileNameSpan.style.display = "none";
    } else {
        editMobileInput.style.display = "none";
        mobileNameSpan.style.display = "block";
    }
}
function editSalesProduct(row, newValue) {
    let selectedProduct = mobileName.find(product => product.mName.toLowerCase() === newValue.toLowerCase());
    if (selectedProduct) {
        var mobileNameSpan = row.querySelector(".mobileName");
        var mobileSelectQnt = row.querySelector(".mobileSelectQnt");
        var unitPriceInput = row.querySelector(".unitPriceInput");
        var totalPriceElement = row.querySelector(".totalPrice");
        var originalPriceElement = row.querySelector(".originalPrice");
        var profitLossElement = row.querySelector(".profitLoss");

        mobileNameSpan.innerText = selectedProduct.mName;
        var quantity = parseInt(mobileSelectQnt.value);
        var unitPrice = selectedProduct.mPrice;
        unitPriceInput.value = unitPrice;
        var totalPrice = quantity * unitPrice;
        var originalPrice = selectedProduct.mPrice;
        var profitLoss = totalPrice - (quantity * originalPrice);

        originalPriceElement.innerText = originalPrice;
        totalPriceElement.innerText = totalPrice;
        profitLossElement.innerText = profitLoss;

        row.querySelector(".editMobileInput").style.display = "none";
        mobileNameSpan.style.display = "block";

        function updateTotalPrice() {
            var quantity = parseInt(mobileSelectQnt.value);
            var unitPrice = parseFloat(unitPriceInput.value);
            var totalPrice = quantity * unitPrice;
            var profitLoss = totalPrice - (quantity * originalPrice);
            totalPriceElement.innerText = totalPrice;
            profitLossElement.innerText = profitLoss;
            updateTotalAmount();
        }

        mobileSelectQnt.removeEventListener("change", updateTotalPrice);
        mobileSelectQnt.addEventListener("change", updateTotalPrice);
        unitPriceInput.addEventListener("change", updateTotalPrice);

        updateTotalAmount();
    }
}

function updateTotalAmount() {
    var totalAmount = 0;
    var totalPriceMobile = document.querySelectorAll(".totalPrice");
    totalPriceMobile.forEach(function (element) {
        totalAmount += parseFloat(element.innerText);
    });
    document.getElementById("totalAmount").innerText = totalAmount;
}

document.querySelector(".saleSave").addEventListener("click", function () {
    let customer = document.getElementById("customerInput").value;
    let date = document.getElementById("saleDate").value;

    if (!customer) {
        document.querySelector(".customerValidation").innerHTML = "Please select a customer.";
        return;
    } else {
        document.querySelector(".customerValidation").innerHTML = "";
    }
    if (!date) {
        document.querySelector(".dateValidation").innerHTML = "Please select a date.";
        return;
    } else {
        document.querySelector(".dateValidation").innerHTML = "";
    }

    if (document.querySelectorAll(".salesTable tr:not(#addProductTitleRow)").length === 0) {
        alert("Please add at least one product.");
        return;
    }

    let sales = [];
    document.querySelectorAll(".salesTable tr:not(#addProductTitleRow)").forEach(row => {
        let mobileName = row.querySelector(".mobileName").innerText;
        let quantity = row.querySelector(".mobileSelectQnt").value;
        let unitPrice = row.querySelector(".unitPriceInput").value;
        let originalPrice = row.querySelector(".originalPrice").innerText;
        let totalPrice = row.querySelector(".totalPrice").innerText;
        let profitLoss = row.querySelector(".profitLoss").innerText;
        sales.push({
            mobileName,
            quantity,
            unitPrice,
            originalPrice,
            totalPrice,
            profitLoss
        });
    });

    let saleDetails = {
        customer,
        date,
        sales,
        totalAmount: document.getElementById("totalAmount").innerText
    };

    let saleDetailsData = JSON.parse(localStorage.getItem("saleDetails")) || [];

    saleDetailsData.push(saleDetails);

    localStorage.setItem("saleDetails", JSON.stringify(saleDetailsData));

    let mobileDetailsData = JSON.parse(localStorage.getItem("mobileDeletails")) || [];
    sales.forEach(sale => {
        let mobile = mobileDetailsData.find(m => m.mName.toLowerCase() === sale.mobileName.toLowerCase());
        if (mobile) {
            mobile.mQuntitity = parseInt(mobile.mQuntitity) - parseInt(sale.quantity);
        }
    });
    localStorage.setItem("mobileDeletails", JSON.stringify(mobileDetailsData));
    alert("Sale details saved!");
    customerSalesTable();
    window.location.href = 'sale.html';
});

function customerSalesTable() {
    let saleDetailsData = JSON.parse(localStorage.getItem("saleDetails")) || [];
    let customerSalesTable = document.querySelector(".customerSalesTable");

    let customerTableS = '';
    saleDetailsData.forEach((sale, index) => {
        customerTableS += `
            <tr>
                <td>${sale.customer}</td>
                <td>${sale.totalAmount}</td>
                <td><button onclick="viewSaleDetails(${index})"><i class="fa-solid fa-eye"></i></button></td>
            </tr>
        `;
    });

    customerSalesTable.innerHTML = customerTableS;
}

function viewSaleDetails(index) {
    let saleDetailsData = JSON.parse(localStorage.getItem("saleDetails")) || [];
    let sale = saleDetailsData[index];

    document.getElementById("detailCustomer").innerText = sale.customer;
    document.getElementById("detailDate").innerText = sale.date;
    document.getElementById("detailTotalAmount").innerText = sale.totalAmount;

    let viewSale = document.getElementById("detailProductsTable").querySelector("tbody");
    viewSale.innerHTML = '';
    sale.sales.forEach(product => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.mobileName}</td>
            <td>${product.quantity}</td>
            <td>${product.unitPrice}</td>
            <td>${product.totalPrice}</td>
        `;
        viewSale.appendChild(row);
    });

    document.getElementById("saleDetailsDisplay").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    customerSalesTable();
});
