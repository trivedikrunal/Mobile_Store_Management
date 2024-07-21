let customerData = [
    { id: 1, typePerson: "Customer", cName: "Applebhai", cEmail: "applebhai@gamil.com", cNumber: 9988776655 },
    { id: 2, typePerson: "Vendor", cName: "Appleben", cEmail: "appleben@gamil.com", cNumber: 9911223344 }
];

function readAll() {
     // -------------------------------------------Customer----------------------------------------------

    if (!localStorage.getItem("customerDeletails")) {
        localStorage.setItem("customerDeletails", JSON.stringify(customerData));
    }

    var tableCustomerData = document.querySelector(".tableCustomer");
    if (tableCustomerData) {
        var customerDeletailsData = JSON.parse(localStorage.getItem("customerDeletails"));
        var elementCustomer = '';
        customerDeletailsData.map(obj => (
            elementCustomer += `<tr>
                            <td>${obj.typePerson}</td>
                            <td>${obj.cName}</td>
                            <td>${obj.cEmail}</td>
                            <td>${obj.cNumber}</td>
                            <td>
                                <button class="editIcon" onclick="customerEdit(${obj.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="deleteIcon" onclick="deleteCustomer(${obj.id})"><i class="fa-solid fa-trash"></i></button>
                            </td>
        </tr>`
        ));
        tableCustomerData.innerHTML = elementCustomer;
    }

}
//----------------------------------Customer Create Button Only-------------------------

function clickCustomer() {
    document.querySelector(".createCustomerButton").style.display = "none";
    document.querySelector(".customerCreateForm").style.display = "block";
    document.querySelector(".customerUpdateForm").style.display = "none";
    document.querySelector(".customerDetailsTitle").style.display = "none";
    document.querySelector(".customerDetailsTable").style.display = "none";
}

// -------------------------------------------Customer Create Form----------------------------------------------





function customerVedilation() {
    var cName = document.querySelector(".cName").value;
    var cEmail = document.querySelector(".cEmail").value;
    var cNumber = document.querySelector(".cNumber").value;

    if (!cName) {
        document.querySelector(".validationcustomerName").innerHTML = "Empty Name";
    } else {
        document.querySelector(".validationcustomerName").innerHTML = "";


    }

    if (!cEmail) {
        document.querySelector(".validationcustomerEmail").innerHTML = "Empty email";
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(cEmail)) {
        console.log("valid");
        document.querySelector(".validationcustomerEmail").innerHTML = "";


    } else {
        document.querySelector(".validationcustomerEmail").innerHTML = "You have entered an invalid email address!";

        return false;

    }

    if (/^\d{10}$/.test(cNumber)) {
        document.querySelector(".validationcustomerNumber").innerHTML = "";


    }
    else {
        document.querySelector(".validationcustomerNumber").innerHTML = "You have entered an invalid mobile number!";
        return false;
    }
    return true;




}
function createCustomer() {
    var typePerson = document.querySelector(".typePerson").checked ? "Vendor" : "Customer";
    var cName = document.querySelector(".cName").value;
    var cEmail = document.querySelector(".cEmail").value;
    var cNumber = document.querySelector(".cNumber").value;
    var cMatchName = false;


    var Vedilation = customerVedilation()

    if (cName && Vedilation && cEmail && cNumber) {


        var newCustomerData = JSON.parse(localStorage.getItem("customerDeletails"));
        newCustomerData.forEach(element => {
            if (element.cEmail.toLowerCase() == cEmail.toLowerCase()) {
                cMatchName = true;
                document.querySelector(".validationcustomerEmail").innerHTML = "All ready exsit Email id";

                // alert("All ready exsit Email id");
                return;
            }

        });
        newCustomerData.forEach(element => {
            if (element.cNumber == cNumber) {
                cMatchName = true;
                document.querySelector(".validationcustomerNumber").innerHTML = "All ready exsit mobile Number";

                // alert("All ready exsit mobile Number");
                return;
            }

        });





        if (!cMatchName) {

            var newCustomerDataObj = { id: newCustomerData.length + 1, typePerson: typePerson, cName: cName, cEmail: cEmail, cNumber: parseInt(cNumber) };
            newCustomerData.push(newCustomerDataObj);
            localStorage.setItem("customerDeletails", JSON.stringify(newCustomerData))

            document.querySelector(".cName").value = '';
            document.querySelector(".cEmail").value = '';
            document.querySelector(".cNumber").value = '';

            document.querySelector(".customerCreateForm").style.display = "none";
            document.querySelector(".customerUpdateForm").style.display = "none";

            readAll();
            window.location.href = "customer.html";
        }
    }
}

// -------------------------------------------Customer Update Form Show Value--------------------------------------------

function customerEdit(id) {

    var customerDeletailsData = JSON.parse(localStorage.getItem("customerDeletails"));


    var editObj = customerDeletailsData.find(rec => rec.id === id);
    document.querySelector(".typePersonUpdate").checked = editObj.typePerson === "Vendor";
    document.querySelector(".ucName").value = editObj.cName;
    document.querySelector(".ucEmail").value = editObj.cEmail;
    document.querySelector(".ucNumber").value = editObj.cNumber;
    document.querySelector(".ucId").value = id;

    document.querySelector(".createCustomerButton").style.display = "none";
    document.querySelector(".customerCreateForm").style.display = "none";
    document.querySelector(".customerUpdateForm").style.display = "block";
    document.querySelector(".customerDetailsTitle").style.display = "none";
    document.querySelector(".customerDetailsTable").style.display = "none";



}

// ---------------------------------------------------------Update Customer-----------------------------------------------

function updateCustomerVedilation() {

    var cName = document.querySelector(".ucName").value;
    var cEmail = document.querySelector(".ucEmail").value;
    var cNumber = document.querySelector(".ucNumber").value;


    if (!cName) {
        document.querySelector(".validationcustomerUpdateName").innerHTML = "Empty Name";
    } else {
        document.querySelector(".validationcustomerUpdateName").innerHTML = "";


    }
    if (!cEmail) {
        document.querySelector(".validationcustomerUpdateEmail").innerHTML = "Empty Email";
    } else {
        document.querySelector(".validationcustomerUpdateEmail").innerHTML = "";

    }
    if (!cNumber) {
        document.querySelector(".validationcustomerupdateNumber").innerHTML = "Empty number";
    } else {
        document.querySelector(".validationcustomerupdateNumber").innerHTML = "";

    }
    if (!cEmail) {
        document.querySelector(".validationcustomerUpdateEmail").innerHTML = "Empty email";
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(cEmail)) {
        console.log("valid");
        document.querySelector(".validationcustomerUpdateEmail").innerHTML = "";


    } else {
        document.querySelector(".validationcustomerUpdateEmail").innerHTML = "You have entered an invalid email address!";

        return false;

    }

    if (/^\d{10}$/.test(cNumber)) {
        document.querySelector(".validationcustomerupdateNumber").innerHTML = "";


    }
    else {
        document.querySelector(".validationcustomerupdateNumber").innerHTML = "You have entered an invalid mobile number!";
        return false;
    }
    return true;


}
function updateCustomer() {
    var id = parseInt(document.querySelector(".ucId").value);
    var cName = document.querySelector(".ucName").value;
    var cEmail = document.querySelector(".ucEmail").value;
    var cNumber = document.querySelector(".ucNumber").value;
    var typePerson = document.querySelector(".typePersonUpdate").checked ? "Vendor" : "Customer";

    updateCustomerVedilation()

    if (cName && cEmail && cNumber) {

        var customerDeletailsData = JSON.parse(localStorage.getItem("customerDeletails"));




        var cIndex = customerDeletailsData.findIndex(rec => rec.id === id);
        customerDeletailsData[cIndex].cName = cName;
        customerDeletailsData[cIndex].cEmail = cEmail;
        customerDeletailsData[cIndex].cNumber = cNumber;
        customerDeletailsData[cIndex].typePerson = typePerson;

        localStorage.setItem("customerDeletails", JSON.stringify(customerDeletailsData));

        document.querySelector(".customerCreateForm").style.display = "none";
        document.querySelector(".customerUpdateForm").style.display = "none";



        readAll();
        window.location.href = "customer.html";

    }


}

//---------------------------------------------------Customer Delete--------------------------------------------

function deleteCustomer(id) {
    var customerDeletailsData = JSON.parse(localStorage.getItem("customerDeletails"));
    if (confirm("Are you sure want to delete? ")) {

        customerDeletailsData = customerDeletailsData.filter(rec => rec.id !== id);
        localStorage.setItem("customerDeletails", JSON.stringify(customerDeletailsData));

        readAll();
    }
}





    
