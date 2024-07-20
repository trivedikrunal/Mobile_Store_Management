let mobileData = [
    { id: 1, mName: "Apple11", mQuntitity: 10, mPrice: 20000, mImages: [] },
    { id: 2, mName: "Apple12", mQuntitity: 20, mPrice: 40000, mImages: [] }
];

function readAll() {
    if (!localStorage.getItem("mobileDeletails")) {
        localStorage.setItem("mobileDeletails", JSON.stringify(mobileData));
    }

    var tableMobileData = document.querySelector(".tableMobile");
    if (tableMobileData) {
        var mobileDeletailsData = JSON.parse(localStorage.getItem("mobileDeletails"));
        var elementMobile = '';
        mobileDeletailsData.map(obj => (
            elementMobile += `<tr>
                                <td><img src="${obj.mImages[0]}" alt="${obj.mName}" width="50" style="border-radius: 5px;" onclick="showAllImages(${obj.id})"></td>
                                <td>${obj.mName}</td>
                                <td>${obj.mQuntitity}</td>
                                <td>${obj.mPrice}</td>
                                <td>
                                    <button class="editIcon" onclick="mobileEdit(${obj.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button class="deleteIcon" onclick="deleteMobile(${obj.id})"><i class="fa-solid fa-trash"></i></button>
                                </td>      
                              </tr>`
        ));
        tableMobileData.innerHTML = elementMobile;
    }
}

function showAllImages(id) {
    var mobileDeletailsData = JSON.parse(localStorage.getItem("mobileDeletails"));
    var mobile = mobileDeletailsData.find(m => m.id === id);
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById("modalImage");
    var currentIndex = 0;

    function showSlide(index) {
        if (index >= mobile.mImages.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = mobile.mImages.length - 1;
        } else {
            currentIndex = index;
        }
        modalImg.src = mobile.mImages[currentIndex];
    }

    showSlide(currentIndex);
    modal.style.display = "block";

    window.changeSlide = function(n) {
        showSlide(currentIndex + n);
    }
}

function closeModal() {
    var modal = document.getElementById('imageModal');
    modal.style.display = "none";
}

function clickMobile() {
    document.querySelector(".createMobileButton").style.display = "none";
    document.querySelector(".mobileCreateForm").style.display = "block";
    document.querySelector(".mobileUpdateForm").style.display = "none";
    document.querySelector(".mobileDetailsTitle").style.display = "none";
    document.querySelector(".mobileDetailsTable").style.display = "none";
}

function mobileVedilation() {
    var mName = document.querySelector(".mName").value;
    var mQuntitity = document.querySelector(".mQuntitity").value;
    var mPrice = document.querySelector(".mPrice").value;
    var mImages = document.querySelector(".mImages").files;

    if (!mName) {
        document.querySelector(".validationMobileName").innerHTML = "Empty Name";
    } else {
        document.querySelector(".validationMobileName").innerHTML = "";
    }
    if (!mQuntitity) {
        document.querySelector(".validationMobileQuntitity").innerHTML = "Empty Quantity";
    } else {
        document.querySelector(".validationMobileQuntitity").innerHTML = "";
    }
    if (!mPrice) {
        document.querySelector(".validationMobilePrice").innerHTML = "Empty Price";
    } else {
        document.querySelector(".validationMobilePrice").innerHTML = "";
    }
    if (mImages.length === 0) {
        document.querySelector(".validationMobileImages").innerHTML = "Empty Images";
    } else {
        document.querySelector(".validationMobileImages").innerHTML = "";
    }
}

function createMobile() {
    var mName = document.querySelector(".mName").value;
    var mQuntitity = document.querySelector(".mQuntitity").value;
    var mPrice = document.querySelector(".mPrice").value;
    var mImages = document.querySelector(".mImages").files;
    var matchName = false;
    mobileVedilation();

    if (mName && mQuntitity && mPrice && mImages.length > 0) {
        var newMobileData = JSON.parse(localStorage.getItem("mobileDeletails"));
        newMobileData.forEach(element => {
            if (element.mName.toLowerCase() == mName.toLowerCase()) {
                matchName = true;
                document.querySelector(".validationMobileName").innerHTML = "Already exists name";
                return;
            }
        });

        if (!matchName) {
            var images = [];
            for (var i = 0; i < mImages.length; i++) {
                var reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        images.push(e.target.result);
                        if (images.length === mImages.length) {
                            var newMobileDataObj = { id: newMobileData.length + 1, mName: mName, mQuntitity: parseInt(mQuntitity), mPrice: parseInt(mPrice), mImages: images };
                            newMobileData.push(newMobileDataObj);
                            localStorage.setItem("mobileDeletails", JSON.stringify(newMobileData));
                            document.querySelector(".mName").value = '';
                            document.querySelector(".mQuntitity").value = '';
                            document.querySelector(".mPrice").value = '';
                            document.querySelector(".mImages").value = '';
                            document.querySelector(".mobileCreateForm").style.display = "none";
                            document.querySelector(".mobileUpdateForm").style.display = "none";
                            readAll();
                            window.location.href = "mobile.html";
                        }
                    };
                })(mImages[i]);
                reader.readAsDataURL(mImages[i]);
            }
        }
    }
}

function mobileEdit(id) {
    var mobileDeletailsData = JSON.parse(localStorage.getItem("mobileDeletails"));
    var editObj = mobileDeletailsData.find(rec => rec.id === id);
    document.querySelector(".umName").value = editObj.mName;
    document.querySelector(".umQuntitity").value = editObj.mQuntitity;
    document.querySelector(".umPrice").value = editObj.mPrice;
    document.querySelector(".umId").value = id;

    document.querySelector(".createMobileButton").style.display = "none";
    document.querySelector(".mobileCreateForm").style.display = "none";
    document.querySelector(".mobileUpdateForm").style.display = "block";
    document.querySelector(".mobileDetailsTitle").style.display = "none";
    document.querySelector(".mobileDetailsTable").style.display = "none";
}

function updateMobileVedilation() {
    var mName = document.querySelector(".umName").value;
    var mQuntitity = document.querySelector(".umQuntitity").value;
    var mPrice = document.querySelector(".umPrice").value;
    var mImages = document.querySelector(".umImages").files;

    if (!mName) {
        document.querySelector(".validationUpdateMobileName").innerHTML = "Empty Name";
    } else {
        document.querySelector(".validationUpdateMobileName").innerHTML = "";
    }
    if (!mQuntitity) {
        document.querySelector(".validationUpdateMobileQuntitity").innerHTML = "Empty Quantity";
    } else {
        document.querySelector(".validationUpdateMobileQuntitity").innerHTML = "";
    }
    if (!mPrice) {
        document.querySelector(".validationUpdateMobilePrice").innerHTML = "Empty Price";
    } else {
        document.querySelector(".validationUpdateMobilePrice").innerHTML = "";
    }
    if (mImages.length > 0 && Array.from(mImages).some(image => image.type.indexOf("image/") !== 0)) {
        document.querySelector(".validationUpdateMobileImages").innerHTML = "Invalid Image";
    } else {
        document.querySelector(".validationUpdateMobileImages").innerHTML = "";
    }
}

function updateMobile() {
    var id = parseInt(document.querySelector(".umId").value);
    var mName = document.querySelector(".umName").value;
    var mQuntitity = document.querySelector(".umQuntitity").value;
    var mPrice = document.querySelector(".umPrice").value;
    var mImages = document.querySelector(".umImages").files;
    updateMobileVedilation();

    if (mName && mQuntitity && mPrice) {
        var mobileDeletailsData = JSON.parse(localStorage.getItem("mobileDeletails"));
        var mIndex = mobileDeletailsData.findIndex(rec => rec.id === id);
        mobileDeletailsData[mIndex].mName = mName;
        mobileDeletailsData[mIndex].mQuntitity = parseInt(mQuntitity);
        mobileDeletailsData[mIndex].mPrice = parseInt(mPrice);

        if (mImages.length > 0) {
            var images = [];
            for (var i = 0; i < mImages.length; i++) {
                var reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        images.push(e.target.result);
                        if (images.length === mImages.length) {
                            mobileDeletailsData[mIndex].mImages = images;
                            localStorage.setItem("mobileDeletails", JSON.stringify(mobileDeletailsData));
                            document.querySelector(".mobileCreateForm").style.display = "none";
                            document.querySelector(".mobileUpdateForm").style.display = "none";
                            readAll();
                            window.location.href = "mobile.html";
                        }
                    };
                })(mImages[i]);
                reader.readAsDataURL(mImages[i]);
            }
        } else {
            localStorage.setItem("mobileDeletails", JSON.stringify(mobileDeletailsData));
            document.querySelector(".mobileCreateForm").style.display = "none";
            document.querySelector(".mobileUpdateForm").style.display = "none";
            readAll();
            window.location.href = "mobile.html";
        }
    }
}

function deleteMobile(id) {
    var mobileDeletailsData = JSON.parse(localStorage.getItem("mobileDeletails"));
    if (confirm("Are you sure want to delete? ")) {
        mobileDeletailsData = mobileDeletailsData.filter(rec => rec.id !== id);
        localStorage.setItem("mobileDeletails", JSON.stringify(mobileDeletailsData));
        readAll();
    }
}