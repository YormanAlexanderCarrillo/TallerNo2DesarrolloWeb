
const URLApi = 'https://apiconcessionaire.fly.dev/cars/'

async function registerCar(carData) {
    try {
        const response = await fetch(URLApi,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            })
        const responseData = response.json()
        if (!response.ok) {
            throw new Error('Error al registrar el carro en la API. Estado de respuesta: ' + response.status);
        }
        return responseData
    } catch (error) {
        console.error('Error al registrar el vehiculo:', error.message);
        throw error;
    }
}

async function getAllDataCars() {
    try {
        const response = await fetch(URLApi)
        if (!response.ok) {
            throw new Error('La respuesta de la API no fue exitosa');
        }
        return response.json()
    } catch (error) {
        console.error('Error al onbtener los carros:', error.message);
    }
}

async function searchCarById(idCar) {
    try {
        const response = await fetch(URLApi + idCar)
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del cliente');
        }
        return response.json()
    } catch (error) {

    }
}

async function deleteCar(idCar){
    try {
        const response = await fetch(URLApi+idCar,{
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('No se pudo eliminar la información del carro');
        }
        return response.json()
        
    } catch (error) {
        console.log("Ocurrio un error"+ error)
    }
}


module.exports.registerCar = registerCar
module.exports.getAllDataCars = getAllDataCars
module.exports.searchCarById = searchCarById
module.exports.deleteCar = deleteCar