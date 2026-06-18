console.log("Pie chart js running");
function updateChart(){
    console.log("Filtering chart data");

    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let category = document.getElementById("categoryFilter").value;

    let filtered = allExpenses.filter(exp => {
        let matchStart = !startDate || exp.date >= startDate;
        let matchEnd = !endDate || exp.date <= endDate;
        let matchCategory = !category || exp.category === category;

        return matchStart && matchEnd && matchCategory;
    });
    loadPieChart(filtered);
    PieChartSummary(filtered);
}

function resetFilter(){
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("categoryFilter").value = "";
    loadPieChart(allExpenses);
    PieChartSummary(allExpenses);
}

let piechart;
function loadPieChart(data) {

    if (piechart) piechart.destroy();

    let categoryMap = {};

    data.forEach(exp => {
        let cat = exp.category || "Unknown";
        categoryMap[cat] = (categoryMap[cat] || 0) + Number(exp.amount);
    });

    let labels = Object.keys(categoryMap);
    let values = Object.values(categoryMap).map(values =>
    Number(convert(values)));

    if (piechart) piechart.destroy();

    piechart = new Chart(document.getElementById("expensePieChart"), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values
            }]
        },
        options: {
        responsive: true,
        maintainAspectRatio: false
    }
    });

}

function PieChartSummary(data){
    console.log("PieChartSummary running");
    console.log(data);
    let category = {};
    let total = 0;

    data.forEach(e =>{
        total += Number(e.amount);
        category[e.category] = (category[e.category] || 0) + Number(e.amount);
    });

    console.log("Filtered data:", data);
    console.log(document.getElementById("chartTableBody"));
    let table = document.getElementById("chartTableBody");
    table.innerHTML = "";

    document.getElementById("amountTablePieChart").innerHTML = "Total Amount (" + getSymbol() + ")";
    for(let cat in category){
        table.innerHTML += `
        <tr>
            <td>${cat}</td>
            <td>${convert(category[cat])}</td>
        </tr>
        `;
    }

}
