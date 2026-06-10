const rates = {
    MYR: 1,
    USD: 0.24,
    SGD: 0.32,
    JPY: 27.5
};

const symbol = {
    MYR: "RM",
    USD: "$",
    SGD: "S$",
    JPY: "¥"
}

function convert(amount){
    let currency = localStorage.getItem("currency") || "MYR";
    return (Number(amount) * rates[currency]).toFixed(2);

}

function getSymbol(){
    let currency = localStorage.getItem("currency") || "MYR";
    return symbol[currency];
}