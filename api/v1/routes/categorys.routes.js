//creamos el router para poder usar los verbos HTTP
const {Router} = require('express'); //Destructuracion
//Incluimos nuestro controlador de usuarios
const userController = require('../../../controllers/categoryController'); //se importa el controlador de usuarios
const router = Router(); //se crea el router

router.get("/", userController.getAllCategory); //se crea la ruta para obtener todos los articulos
router.get("/:id", userController.getCategory);
router.post("/", userController.createCategory); //se crea la ruta para crear un articulo
router.put("/:id", userController.updateCategory); //se crea la ruta para actualizar un articulo
router.delete("/:id", userController.deleteCategory);

module.exports = router;