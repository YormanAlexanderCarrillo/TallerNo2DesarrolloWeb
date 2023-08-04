
const apiUrl = 'https://apiconcessionaire.fly.dev/customers/';

async function registerCustomer(customerData) {
    try {
        const response = await fetch(apiUrl,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customerData)
            });

        if (!response.ok) {
            throw new Error('Error al registrar el cliente en la API. Estado de respuesta: ' + response.status);
        }
        return response.json();
    } catch (error) {
        console.error('Error al registrar el cliente:', error.message);
        throw error;
    }

}

async function getAllDataCustomers() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('La respuesta de la API no fue exitosa');
    }
    return response.json();
}

async function searchCustomerById(idCustomer) {
    try {
        const response = await fetch(apiUrl + idCustomer);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del cliente');
        }
        return response.json()
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
}


async function deleteCustomer(idCustomer){
    try {
        const response = await fetch(apiUrl+idCustomer,{
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('No se pudo eliminar la información del cliente');
        }
        return response.json()
        
    } catch (error) {
        console.log("Ocurrio un error")
    }
}

module.exports.registerCustomer = registerCustomer
module.exports.getAllDataCustomers = getAllDataCustomers
module.exports.searchCustomerById = searchCustomerById
module.exports.deleteCustomer = deleteCustomer

