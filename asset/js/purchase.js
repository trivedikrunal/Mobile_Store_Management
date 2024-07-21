// --------------------------------------------------------------purchases Code-------------------------------

function clickPurchase() {
    document.querySelector(".createPurchaseButton").style.display = "none";
    document.querySelector(".purchaseForm").style.display = "block";
    document.querySelector(".vendorPurchasTable2").style.display = "none";
    document.querySelector("#purchaseDetailsDisplay").style.display = "none";
}

// Only Vendor Name Show
var vandorName = JSON.parse(localStorage.getItem("customerDeletails"));
let datalistVendor = document.getElementById('datalistVendor');
vandorName.forEach(customer => {
    if (customer.typePerson === "Vendor") {
        let option = document.createElement('option');
        option.value = customer.cName;
        datalistVendor.appendChild(option);
    }
});

//only Mobile Name Show
var mobileName = JSON.parse(localStorage.getItem("mobileDeletails"));
let datalistMobiles = document.getElementById('datalistMobile');
mobileName.forEach(mobile => {
    let option = document.createElement('option');
    option.value = mobile.mName;
    datalistMobiles.appendChild(option);
});

function showInputFild() {
    document.getElementById("mobileInput").style.display = "block";
    document.getElementById("addProductTitle").style.display = "none";
}

function myPurchesProduct(value) {
    // Product Select
    let selectedProduct = mobileName.find(product => product.mName.toLowerCase() === value.toLowerCase());
    if (selectedProduct) {
        var parchesTableData = document.querySelector(".parchesTable");
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
                    <td>
                        <span class="mobileName" onclick="mobileNameReselect(this)">${selectedProduct.mName}</span>
                        <input type="text" list="datalistMobile" class="editMobileInput" style="display:none;">
                    </td>
                    <td><input type="number" value="1" class="mobileSelectQnt"></td>
                    <td class="unitPrice">${selectedProduct.mPrice}</td>
                    <td class="totalPrice">${1 * selectedProduct.mPrice}</td>
                    <td><button type="button" class="deleteBtn"><i class="fa-solid fa-trash"></i></button></td>
                `;

        parchesTableData.insertBefore(newRow, document.getElementById("addProductTitleRow"));

        var mobileSelectQnt = newRow.querySelector(".mobileSelectQnt");
        mobileSelectQnt.addEventListener("change", function () {
            var mobileSelectQntVal = mobileSelectQnt.value;
            var unitPrice = parseInt(newRow.querySelector(".unitPrice").innerHTML);
            var newTotalPrice = parseInt(mobileSelectQntVal) * unitPrice;
            newRow.querySelector(".totalPrice").innerHTML = newTotalPrice;
            updateTotalAmount();
        });

        // Delete Row  
        var deleteBtn = newRow.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", function () {
            newRow.remove();
            updateTotalAmount();
        });

        // Click Mobile Name Reselect
        var editMobileInput = newRow.querySelector(".editMobileInput");
        editMobileInput.addEventListener("input", function () {
            editPurchesProduct(newRow, this.value);
        });

        document.getElementById("mobileInput").value = "";
        document.getElementById("mobileInput").style.display = "none";
        document.getElementById("addProductTitle").style.display = "block";
        updateTotalAmount();
    } else{
        alert("Product Not Selected Error....");
    }
}

// Reselect Mobile Name 
function mobileNameReselect(reseletM) {
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

function editPurchesProduct(row, newValue) {
    let selectedProduct = mobileName.find(product => product.mName.toLowerCase() === newValue.toLowerCase());
    if (selectedProduct) {
        var mobileNameSpan = row.querySelector(".mobileName");
        var mobileSelectQnt = row.querySelector(".mobileSelectQnt");
        var unitPriceElement = row.querySelector(".unitPrice");
        var totalPriceElement = row.querySelector(".totalPrice");

        mobileNameSpan.innerText = selectedProduct.mName;
        var quantity = parseInt(mobileSelectQnt.value);
        unitPriceElement.innerText = selectedProduct.mPrice;
        totalPriceElement.innerText = quantity * selectedProduct.mPrice;

        row.querySelector(".editMobileInput").style.display = "none";
        mobileNameSpan.style.display = "block";

        // Update new unit price
        mobileSelectQnt.removeEventListener("change", updatePrice);
        mobileSelectQnt.addEventListener("change", function () {
            updatePrice(row, selectedProduct.mPrice);
        });

        updateTotalAmount();
    }
}

function updatePrice(row, unitPrice) {
    var quantity = parseInt(row.querySelector(".mobileSelectQnt").value);
    var totalPrice = quantity * unitPrice;
    row.querySelector(".totalPrice").innerText = totalPrice;
    updateTotalAmount();
}

function updateTotalAmount() {
    var totalAmount = 0;
    var totalPriceMobile = document.querySelectorAll(".totalPrice");
    totalPriceMobile.forEach(function (element) {
        totalAmount += parseInt(element.innerText);
    });
    document.getElementById("totalAmount").innerText = totalAmount;
}

document.querySelector(".purchaseSave").addEventListener("click", function () {
    let vendor = document.getElementById("vendorInput").value;
    let date = document.getElementById("purchaseDate").value;

    // Validation
    if (!vendor) {
        document.querySelector(".vandorValidation").innerHTML = "Please select a vendor.";
        return;
        
    } else {
        document.querySelector(".vandorValidation").innerHTML = "";
       

    }
    if (!date) {

        document.querySelector(".dateValidation").innerHTML = "Please select a date.";
        return;
       
    } else {
        document.querySelector(".dateValidation").innerHTML = "";
     
    }

    //ChatGpt upayo karyo.....
    if (document.querySelectorAll(".parchesTable tr:not(#addProductTitleRow)").length === 0) {
        alert("Please add at least one product.");
        return;
    }



    let purchases = [];
    document.querySelectorAll(".parchesTable tr:not(#addProductTitleRow)").forEach(row => {
        let mobileName = row.querySelector(".mobileName").innerText;
        let quantity = row.querySelector(".mobileSelectQnt").value;
        let unitPrice = row.querySelector(".unitPrice").innerText;
        let totalPrice = row.querySelector(".totalPrice").innerText;
        purchases.push({
            mobileName,
            quantity,
            unitPrice,
            totalPrice
        });
    });

    let purchaseDetails = {
        vendor,
        date,
        purchases,
        totalAmount: document.getElementById("totalAmount").innerText
    };
    
    let purchaseDetailsData = JSON.parse(localStorage.getItem("purchaseDetails")) || [];
  

    console.log(purchaseDetailsData);
    console.log(purchaseDetails);
    
    purchaseDetailsData.push(purchaseDetails); 

    localStorage.setItem("purchaseDetails", JSON.stringify(purchaseDetailsData)); 

    // mobile table update quntitiy maate 

    let mobileDeletailsData = JSON.parse(localStorage.getItem("mobileDeletails")) || [];
    purchases.forEach(purchase => {
        let mobile = mobileDeletailsData.find(m => m.mName.toLowerCase() === purchase.mobileName.toLowerCase());
        if (mobile) {
            mobile.mQuntitity = parseInt(mobile.mQuntitity) + parseInt(purchase.quantity);
        }
    });
    localStorage.setItem("mobileDeletails", JSON.stringify(mobileDeletailsData));
    alert("Purchase details saved!");
    vendorPurchasTable();
    window.location.href = 'purchase.html';



});      

function vendorPurchasTable() {
    let purchaseDetailsData = JSON.parse(localStorage.getItem("purchaseDetails")) || [];
    let vendorPurchasTable = document.querySelector(".vendorPurchasTable");
    
    let vendorTableP = '';
    purchaseDetailsData.forEach((purchase, index) => {
        vendorTableP += `
            <tr>
                <td>${purchase.vendor}</td>
                <td>${purchase.totalAmount}</td>
                <td><button onclick="viewPurchaseDetails(${index})"><i class="fa-solid fa-eye"></i></button></td>
            </tr>
        `;
    });
    
    vendorPurchasTable.innerHTML = vendorTableP;
}





function viewPurchaseDetails(index) {
    let purchaseDetailsData = JSON.parse(localStorage.getItem("purchaseDetails")) || [];
    let purchase = purchaseDetailsData[index];

    document.getElementById("detailVendor").innerText = purchase.vendor;
    document.getElementById("detailDate").innerText = purchase.date;
    document.getElementById("detailTotalAmount").innerText = purchase.totalAmount;

    let viewPurchase = document.getElementById("detailProductsTable").querySelector("tbody");
    viewPurchase.innerHTML = ''; 
    purchase.purchases.forEach(product => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.mobileName}</td>
            <td>${product.quantity}</td>
            <td>${product.unitPrice}</td>
            <td>${product.totalPrice}</td>
        `;
        viewPurchase.appendChild(row);
    });

    document.getElementById("purchaseDetailsDisplay").style.display = "block";
}


document.addEventListener("DOMContentLoaded", function() {
    vendorPurchasTable();
});
