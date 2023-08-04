const InputIdCar = document.getElementById('InputIdCar');
const warningSpan = document.getElementById('warning');
const btnRegisterCar = document.getElementById('btnRegisterCar')

const inputIdSearchCar = document.getElementById('searchIdCar')
const btnSearchCar = document.getElementById('btnSearchCar')
const warningSearchCar = document.getElementById('warningSearchCar')

InputIdCar.addEventListener('input', () => {
    const inputValue = InputIdCar.value;
    const regex = /^[a-zA-Z]{3}\d{3}$/;

    if (!regex.test(inputValue)) {
        warningSpan.textContent = 'El formato no es válido.';
        btnRegisterCar.disabled = true
    } else {
        warningSpan.textContent = '';
        btnRegisterCar.disabled = false
    }
});

function validateInput(){
    const inputValue = inputIdSearchCar.value;
    const regex = /^[a-zA-Z]{3}\d{3}$/;
    if (!regex.test(inputValue)) {
        warningSearchCar.textContent = 'El formato no es válido.';
        btnSearchCar.disabled = true
    } else {
        warningSearchCar.textContent = '';
        btnSearchCar.disabled = false
    }
}