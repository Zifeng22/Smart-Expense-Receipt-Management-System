console.log("DASHBOARD LOADED");
let budget = Number(localStorage.getItem("budget")) || 1000;

function updateSummary(data){

    let totalExpense = document.getElementById("totalExpense");

    if(!totalExpense) return;

    console.log("Summary running");
    let total = 0;
    let count = data.length;
    let category = {};

    data.forEach(e => {
        total += Number(e.amount);
        category[e.category]= (category[e.category] || 0) + Number(e.amount);
    });

    let highest = "N/A";

    if (Object.keys(category).length > 0) {
        highest = Object.keys(category).reduce((a, b) =>
            category[a] > category[b] ? a : b
        );
    }

    let remaining = budget - total;
    let percent = (total/budget) *100;

    document.getElementById("totalExpense").innerText = getSymbol() + " " + convert(total);
    document.getElementById("thisMonth").innerText = getSymbol() + " " + convert(total);
    document.getElementById("highestCategory").innerText = highest;
    document.getElementById("transactionCount").innerText = count;

    document.getElementById("budget").innerHTML = getSymbol() + " " + convert(budget);
    document.getElementById("spent").innerText = getSymbol() + " " + convert(total);
    document.getElementById("remaining").innerText = getSymbol() + " " + convert(remaining);

    document.getElementById("budgetBar").style.width = percent + "%";
    document.getElementById("budgetBar").innerText = percent.toFixed(0) + "%";
}


let chart;

function loadChart(data) {
    console.log("Chart running");
    let monthly = {};

    data.forEach(exp => {

        let month = exp.date.substring(0, 7); 

        monthly[month] =
            (monthly[month] || 0) + Number(exp.amount);
    });

    let labels = Object.keys(monthly);
    let values = Object.values(monthly).map(value =>
    Number(convert(value))
    );

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("expenseChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Expenses (" + getSymbol() + ")",
                data: values,
                borderColor: "blue",
                fill: false
            }]
        }
    });

}

window.addEventListener("storage", (event) => {
    if (event.key === "expenseUpdated") {
        loadExpenses();
    }
});


function renderDashboardTable(data){
    let table = document.getElementById("dashboardExpenseTableBody");
    if(!table) return;
    table.innerHTML = "";

    document.getElementById("amountTableDashboard").innerHTML = "Amount (" + getSymbol() + ")";
    data.forEach(exp => {
        table.innerHTML +=`
        <tr>
            <td>${exp.date}</td>
            <td>${exp.category}</td>
            <td>${exp.description}</td>
            <td>${convert(exp.amount)}</td>
            
        </tr>
        `;
    });
}



function changeBudget(){
    
    let budget = document.getElementById("newBudget").value;
    localStorage.setItem("budget", budget);
    loadExpenses();
    
    let modal = bootstrap.Modal.getInstance(
        document.getElementById("BudgetModal")
    );
    modal.hide();

    
}
