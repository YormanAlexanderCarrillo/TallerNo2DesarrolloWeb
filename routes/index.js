const express = require('express');
const routes = express.Router()

const authenticateUser = require('./../resource/user')
const { registerCustomer } = require('../resource/customer')
const { getAllDataCustomers } = require('../resource/customer')
const { searchCustomerById } = require('../resource/customer')
const { deleteCustomer } = require('../resource/customer')

const { registerCar } = require('./../resource/cars')
const { getAllDataCars } = require('../resource/cars')
const { searchCarById } = require('../resource/cars')
const { deleteCar } = require('../resource/cars')


routes.get('/', (req, res) => {

  if (req.session.loggedIn) {
    return res.render('dashboard.ejs', { title: 'Dashboard' });
  }
  const flashMessage = req.session.flashMessage || ''
  delete req.session.flashMessage

  res.render('index.ejs', { title: 'Login', message: flashMessage })
})

routes.post('/dashboard', async (req, res) => {
  const { inputUser, inputPassword } = req.body;
  try {
    const authenticatedUser = await authenticateUser(inputUser, inputPassword);
    if (authenticatedUser) {
      req.session.loggedIn = true;
      return res.render('dashboard.ejs', { title: 'Dashboard' });
    } else {
      req.session.flashMessage = 'Contraseña o Usuario Incorrectos';
      return res.redirect('/');
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Error al autenticar al usuario',
    });
  }
});

routes.get('/dashBoard', (req, res) => {
  if (req.session.loggedIn) {
    return res.render('dashboard.ejs', { title: 'Dashboard' })
  } else {
    return res.redirect('/');
  }
});


routes.get('/newConsult', (req, res) => {
  if (req.session.loggedIn) {
    return res.render('consult.ejs', { title: 'Pagina consulta' })
  } else {
    return res.redirect('/')
  }
})


routes.get('/register', (req, res) => {
  if (req.session.loggedIn === true) {
    return res.render('register.ejs', { title: 'Pagina Registro', warning: '' })
  } else {
    return res.redirect('/')
  }

})


routes.get('/customers', async (req, res) => {
  if (req.session.loggedIn) {
    const allDataCustomer = await getAllDataCustomers()
    //console.log(allDataCustomer.data)
    return res.render('customers.ejs', { title: 'Lista De Clientes', data: allDataCustomer.data })
  } else {
    return res.redirect('/')
  }
})


routes.post('/registerCustomer', async (req, res) => {
  const { InputId, InputName, InputLastName, InputPhone, InputAdress } = req.body;
  try {
    const customerData = {
      "id": Number(InputId),
      "name": InputName,
      "lastName": InputLastName,
      "phone": Number(InputPhone),
      "address": InputAdress
    };
    const responseFromAPI = await registerCustomer(customerData);
    //console.log(responseFromAPI)
    if (req.session.loggedIn) {
      return res.redirect('/dashBoard');
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    console.error('Error al registrar el cliente:', error.message);
    return res.status(500).json({ error: 'Error al registrar el cliente' });
  }
});

routes.get('/consultCustomer', (req, res) => {
  if (req.session.loggedIn) {
    return res.render('consultCustomer.ejs', { title: 'Buscar Cliente' });
  } else {
    return res.redirect('/');
  }
});

routes.post('/newConsultCustomer', async (req, res) => {
  if (req.session.loggedIn) {
    const { searchId } = req.body;
    const dataCustomer = await searchCustomerById(searchId)
    // console.log( dataCustomer.data)

    if (dataCustomer) {
      return res.render('consultCustomer.ejs', { title: 'Buscar Cliente', data: dataCustomer.data });
    } else {
      return res.render('consultCustomer.ejs', { title: 'Buscar Cliente', error: 'Cliente no encontrado' });
    }
  } else {
    return res.redirect('/');
  }
});

routes.post('/deleteCustomer', async (req, res) => {
  if (req.session.loggedIn) {
    const { customerId } = req.body;
    //  console.log(customerId)
    const dataCustomerDelete = await deleteCustomer(customerId)
    console.log(dataCustomerDelete)
    if (dataCustomerDelete.data.deletedCount == 1) {
      console.log("cliente eliminado con exito")
    } else {
      console.log("No se pudo eliminar el cliente")
    }

    return res.redirect('/newConsult');
  } else {
    return res.redirect('/')
  }
})




routes.get('/cars', async (req, res) => {
  if (req.session.loggedIn) {
    const allDataCars = await getAllDataCars()
    //console.log(allDataCars.data)
    return res.render('cars.ejs', { title: 'Lista De Autos', data: allDataCars.data })
  } else {
    return res.redirect('/')
  }
})


routes.post('/registerCar', async (req, res) => {
  const { InputIdCar, InputBrand, InputValue, InputColor, InputModel } = req.body

  try {
    const carData = {
      "plate": InputIdCar.toUpperCase(),
      "brand": InputBrand,
      "value": Number(InputValue),
      "color": InputColor,
      "model": Number(InputModel)
    };
    const responseFromAPI = await registerCar(carData);
    //console.log(responseFromAPI)
    if (req.session.loggedIn) {
      return res.redirect('/dashBoard');
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    console.error('Error al registrar el auto:', error.message);
    return res.status(500).json({ error: 'Error al registrar el carro' });
  }
})

routes.get('/consultCar', (req, res) => {
  if (req.session.loggedIn) {
    return res.render('consultCar.ejs', { title: 'Buscar Vehiculo', warningSearchCar: '' });
  } else {
    return res.redirect('/');
  }
});

routes.post('/newConsultCar', async (req, res) => {
  if (req.session.loggedIn) {
    const { searchIdCar } = req.body;
    //console.log(searchIdCar)
    searchIdCarr = searchIdCar.toUpperCase()
    const carss = await searchCarById(searchIdCarr)
    //console.log(carss.data)
    if (carss) {
      return res.render('consultCar.ejs', { title: 'Buscar Vehiculo', data: carss.data, warningSearchCar: '' });
    } else {
      return res.render('consultCar.ejs', { title: 'Buscar Vehiculo', error: 'Vehiculo no encontrado', warningSearchCar: '' });
    }
  } else {
    return res.redirect('/');
  }
});


routes.post('/deleteCar', async (req, res) => {
  if (req.session.loggedIn) {
    const { carId } = req.body;
    // console.log(carId)
    const dataCarDelete = await deleteCar(carId)
    console.log(dataCarDelete)
    if (dataCarDelete.data.deletedCount == 1) {
      console.log("Vehiculo eliminado con exito")
    } else {
      console.log("No se pudo eliminar el vehiculo")
    }
    return res.redirect('/newConsult');
  } else {
    return res.redirect('/')
  }
})


routes.get('/logOut', (req, res) => {
  if (req.session.loggedIn === true) {
    req.session.loggedIn = false
    return res.redirect('/')
  }
})


module.exports = routes