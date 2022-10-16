const formExchange = document.getElementById("form-exchange");

const checkInputMoney = () =>{
    const inputMoney = document.getElementById("input-money");
    const i = inputMoney.selectedIndex;
    const inputMoneySelected = inputMoney.options[i].value;
    return inputMoneySelected;
}

const checkOutputMoney = () =>{
    const outputMoney = document.getElementById("output-money");
    const i = outputMoney.selectedIndex;
    const outputMoneySelected = outputMoney.options[i].value;
    return outputMoneySelected;
}


const fetching = async (input, inputMoney, outputMoney) => {
        const response = await fetch(`https://criptoya.com/api/satoshitango/${inputMoney}/${outputMoney}`)
        const data = await response.json();
        console.log(data)
        const result = input * data.ask;
        return result
} 

const showResult = async (result) => {
    const resultDiv = document.getElementById("result");
    const div = document.createElement("div")
    div.innerHTML = `
                    <p>${result}</p>    
                    `
    resultDiv.append(div);
}


formExchange.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("input").value;
    if (isNaN(input) || input === 0){
        alert("Tenes que introducir un numero")
    } else{
        const inputMoney = checkInputMoney();
        const outputMoney = checkOutputMoney();
        console.log(outputMoney)
        const result = await fetching(input, inputMoney, outputMoney)
        showResult(result)
    }
    
})