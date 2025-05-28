//creamos el router para poder usar los verbos HTTP
const {Router} = require('express'); //Destructuracion
//Incluimos nuestro controlador de usuarios
const userController = require('../../../controllers/articleController'); //se importa el controlador de usuarios
const router = Router(); //se crea el router

router.get("/", userController.getAllArticles); //se crea la ruta para obtener todos los articulos
router.get("/:id", userController.getArticle);
router.post("/", userController.createArticle); //se crea la ruta para crear un articulo
router.put("/:id", userController.updateArticle); //se crea la ruta para actualizar un articulo
router.delete("/:id", userController.deleteArticle);

module.exports = router;