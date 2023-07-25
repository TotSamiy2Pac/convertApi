const inputTo = document.querySelector('#inputTo')
const inputFrom = document.querySelector('#inputFrom')
const base = document.querySelector('#base')
const currency = document.querySelector('#currency')
const alert = document.querySelector('#alert')

const handleKGS = () => {
    alert.style.display = 'none'
    fetch(`https://api.exchangerate.host/latest?base=${base.value}&symbols=${currency.value}&amount=${inputTo.value}&places=2`)
        .then(res => res.json())
        .then(data => {
            // console.log(inputFrom.value)
            inputFrom.value = Number(Object.values(data.rates).join())
            // inputFrom.value = `${inputTo.value} ${base.value} = ${Object.values(data.rates).join()} ${Object.keys(data.rates)}`
        })
}

const handleReverse = () => {
    alert.style.display = 'none'
    fetch(`https://api.exchangerate.host/latest?base=${currency.value}&symbols=${base.value}&amount=${inputFrom.value}&places=2`)
        .then(res => res.json())
        .then(data => {
            // console.log(inputFrom.value)
            inputTo.value = Number(Object.values(data.rates).join())
            // inputFrom.value = `${inputTo.value} ${base.value} = ${Object.values(data.rates).join()} ${Object.keys(data.rates)}`
        })
}

inputTo.addEventListener('keyup', () => {
    handleKGS()
})

inputFrom.addEventListener('keyup', () => {
    handleReverse()
})

currency.addEventListener('change', () => {
    if (base.value !== currency.value) {
        handleKGS()
    }
    else {
        alert.style.display = 'block'
    }
})

base.addEventListener('change', () => {
    if (currency.value !== base.value) {
        handleReverse()
    }
    else {
        alert.style.display = 'block'
    }
})