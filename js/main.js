const formExchange = document.getElementById("form-exchange");

const checkSessionStorage = () => {
    const storage = JSON.parse(sessionStorage.getItem("change"))
    const resultDiv = document.getElementById("result");
    const div = document.createElement("div")
    div.className = "result"
    div.innerHTML = `
                    <div>
                        <p class="result-number">${storage.result}</p>   
                    </div>
                    <div>
                        <p class="result-date">Ultima actualización: ${storage.date}</p>   
                    </div> 
                    `
    resultDiv.append(div);
}

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

const fetchingCurrency = async (inputMoney, outputMoney) => {
    const response = await fetch(`https://criptoya.com/api/satoshitango/${inputMoney}/${outputMoney}`)
    const data = await response.json();
    const result = data.ask
    const resultObject = {
        result: result,
        timestamp: data.time,
        outputMoney: outputMoney
    }
    return resultObject;
} 

const showResult = async (input, {result, timestamp, outputMoney}) => {
    let date = new Date(timestamp*1000).toLocaleString();
    const resultWFormat = input * result
    const resultFormat = (resultWFormat.toLocaleString("es",{
        style: "currency",
	    currency: `${outputMoney.toUpperCase()}`
    }))
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""
    const div = document.createElement("div")
    div.className = "result"
    div.innerHTML = `
                    <div>
                        <p class="result-number">${resultFormat}</p>   
                    </div>
                    <div>
                        <p class="result-date">Ultima actualización: ${date}</p>   
                    </div> 
                    `
    resultDiv.append(div);
    const storage = {
        result: resultFormat,
        date: date
    }
    sessionStorage.setItem("change", JSON.stringify(storage));
}

if(sessionStorage.getItem("change")){
    checkSessionStorage()
}

formExchange.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("input").value;
    if (isNaN(input) || input === 0 || input === ""){
        Toastify({
            text: "Tenes que introducir un numero!",
            duration: 2000,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true,
            className: "font",
            style: {
                background: "linear-gradient(90deg, rgba(135,65,100,1) 0%, rgba(255,91,91,1) 100%)",
            },
        }).showToast();
    } else{
        const inputMoney = checkInputMoney();
        const outputMoney = checkOutputMoney();
        const result = await fetchingCurrency(inputMoney, outputMoney)
        showResult(input, result)

    }
    
})

// parte usd

const fetchingUsd = async () => {
    const response = await fetch(`https://criptoya.com/api/dolar`)
    const data = await response.json()
    console.log(data)
    const {oficial, solidario, ccl, ccb, mep, time} = data
    const arrayUsd = [oficial, solidario, ccl, ccb, mep, time]
    console.log(arrayUsd)
    return arrayUsd
}

const showUsdSection = async () => {
    const usdContainer = document.getElementById("container-usd");
    const arrayUsd = fetchingUsd()
    await arrayUsd.forEach( (usd) => {
        const div = document.createElement("div");
        div.innerHTML = `
                        <p>${usd}</p>
                        `
    })
}