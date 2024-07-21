document.addEventListener("DOMContentLoaded", function() {
    report();
});

function report() {
    let saleDetailsData = JSON.parse(localStorage.getItem("saleDetails")) || [];
    let reportData = [];

    saleDetailsData.forEach(sale => {
        sale.sales.forEach(product => {
            let mobile = reportData.find(m => m.mobileName === product.mobileName);

            if (!mobile) {
                reportData.push({
                    mobileName: product.mobileName,
                    totalQuantity: parseInt(product.quantity),
                    totalPrice: parseInt(product.totalPrice),
                    totalProfitLoss: parseInt(product.profitLoss)
                });

            } else {
                mobile.totalQuantity += parseInt(product.quantity);
                mobile.totalPrice += parseInt(product.totalPrice);
                mobile.totalProfitLoss += parseInt(product.profitLoss);
            }
        });
    });

    let reportTableBody = document.getElementById("reportTableBody");
    let totalProfitLoss = 0;

    reportData.forEach(mobile => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${mobile.mobileName}</td>
            <td>${mobile.totalQuantity}</td>
            <td>${mobile.totalPrice}</td>
            <td>${mobile.totalProfitLoss}</td>
        `;
        reportTableBody.appendChild(row);

        totalProfitLoss += mobile.totalProfitLoss;
    });

    document.getElementById("totalProfitLoss").innerText = totalProfitLoss;
}
