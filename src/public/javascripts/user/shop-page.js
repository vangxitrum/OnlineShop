
const priceInput = document.querySelectorAll(".price-input input")
const rangeInput = document.querySelectorAll(".range-input input")
const progress = document.querySelector(".range-wrapper .progress")

let priceGap =1000;
rangeInput.forEach(input => {
    input.addEventListener("input",() =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if (maxVal - minVal < priceGap){
            if (event.target.className === "range-min"){
                rangeInput[0].value = maxVal-priceGap;
            } else{
                rangeInput[1].value = minVal+priceGap
            }
        }
        else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.marginLeft = ( Math.round((minVal / rangeInput[0].max) * 100)).toString() + '%';
            progress.style.marginRight = (100 - Math.round((maxVal / rangeInput[1].max) * 100)).toString() + '%';
        }
        
    })
});


priceInput.forEach(input => {
    input.addEventListener("input",() =>{
        let minVal = parseInt(priceInput[0].value),
        maxVal = parseInt(priceInput[1].value);
        if (maxVal - minVal >= priceGap && maxVal <= 10000 && minVal >= 0){
            if (event.target.className === "input-min"){
                rangeInput[0].value = minVal;
                progress.style.marginLeft = ( Math.round((minVal / rangeInput[0].max) * 100)).toString() + '%';
            } else{
                rangeInput[1].value = maxVal;
                progress.style.marginRight = (100 - Math.round((maxVal / rangeInput[1].max) * 100)).toString() + '%';
            }
        }
        
        
    })
});