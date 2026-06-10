console.log("EXPENSES LOADED");
const user = JSON.parse(localStorage.getItem("user"));

function saveExpense(){

    let id = document.getElementById("saveBtn").getAttribute("data-id");

    const data = {
        date : document.getElementById("date").value,
        category : document.getElementById("category").value,
        description : document.getElementById("description").value,
        amount : document.getElementById("amount").value,
        user : {
            userid: user.userid
        }
    }
    
    let url = "https://smart-expense-management-system-fldl.onrender.com/expenses";
    let method = "POST";

    if(id){
        url = `https://smart-expense-management-system-fldl.onrender.com/expenses/${id}`;
        method = "PUT";
    }

    fetch(url, {
        method : method,
        headers : {
           "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })

    .then(res => res.text())
     .then(result => {
        document.getElementById("msg").innerHTML = `
            <div class="alert alert-success">
                Expense saved successfully!
            </div>
        `;
        
        document.getElementById("saveBtn").removeAttribute("data-id");
        document.getElementById("date").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        
        localStorage.setItem("expenseUpdated", Date.now());

        let modal = bootstrap.Modal.getInstance(
            document.getElementById("expenseModal")
        );
        modal.hide();
        loadExpenses();

    })
    .catch(error => {
        document.getElementById("msg").innerHTML = `
            <div class="alert alert-danger">
                Cannot connect to server
            </div>
        `;
    });
}


function loadExpenses(){
    fetch("https://smart-expense-management-system-fldl.onrender.com/expenses/" + user.userid)
    .then(res => res.json())
    .then(data => {

        allExpenses = data;
        
        renderTable(data);
        renderDashboardTable(data);
        updateSummary(data);
        loadChart(data);
        loadPieChart(data);        
        PieChartSummary(data);

    })
    .catch(error => {
        console.log("Error loading expenses", error);
        console.log("expenseTableBody:", document.getElementById("expenseTableBody"));
        console.log("dashboardExpenseTableBody:", document.getElementById("dashboardExpenseTableBody"));
    });
   
}

function renderTable(data){
    let table = document.getElementById("expenseTableBody");
    if(!table) return;
    table.innerHTML = "";

    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    document.getElementById("amountTableExpenses").innerHTML = "Amount (" + getSymbol() + ")";
    data.forEach(exp => {
        table.innerHTML +=`
        <tr>
            <td>${exp.date}</td>
            <td>${exp.category}</td>
            <td>${exp.description}</td>
            <td>${convert(exp.amount)}</td>
            
            <td>
                <button class="btn btn-sm" onclick="editExpense(${exp.id})"><img src="templates/edit-246.png" width="30px"></button>
                <button class="btn btn-sm btn-danger" onclick="deleteExpense(${exp.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function filterExpenses(){
    console.log("filter triggered");

    let date = document.getElementById("searchDate").value;
    let category = document.getElementById("searchCategory").value;
    let min = document.getElementById("minAmount").value;
    let max = document.getElementById("maxAmount").value;

    let filtered = allExpenses.filter(exp => {
        let matchDate = !date || (exp.date && exp.date.slice(0, 10) === date);
        let matchCategory = !category || exp.category === category;
        let amount = Number(exp.amount);

        let matchMin = !min || amount >= Number(min);
        let matchMax = !max || amount <= Number(max);

        
        return matchDate && matchCategory && matchMin && matchMax;
        
    })
    renderTable(filtered);
}

window.addEventListener("load", function () {
    loadExpenses();

    const date = document.getElementById("searchDate");
    const category = document.getElementById("searchCategory");
    const minAmount = document.getElementById("minAmount");
    const maxAmount = document.getElementById("maxAmount");

    if (date) date.addEventListener("change", filterExpenses);
    if (category) category.addEventListener("change", filterExpenses);
    if (minAmount) minAmount.addEventListener("input", filterExpenses);
    if (maxAmount) maxAmount.addEventListener("input", filterExpenses);
});

function resetFilters() {

    document.getElementById("searchDate").value = "";
    document.getElementById("searchCategory").value = "";
    document.getElementById("minAmount").value = "";
    document.getElementById("maxAmount").value = "";

    renderTable(allExpenses);
}

function deleteExpense(id){
    if(!confirm("Are you sure you want to delete this expense?"))
        return;

    fetch(`https://smart-expense-management-system-fldl.onrender.com/expenses/${id}`, {
        method : "DELETE"
    })
    .then(() => loadExpenses())
    .catch(error => {
        console.log("Error deleting expense");
    });
}

function editExpense(id){
    let exp = allExpenses.find(e => e.id === id);

    document.getElementById("date").value = exp.date;
    document.getElementById("category").value = exp.category;
    document.getElementById("description").value = exp.description;
    document.getElementById("amount").value = exp.amount;

    document.getElementById("saveBtn").setAttribute("data-id", id);

    new bootstrap.Modal(document.getElementById("expenseModal")).show();
}
