const Categoryservice = require('../services/categoryService');

const getAllCategory = async (req,res)=>{
    const allCategorys = await Categoryservice.getAllCategory();

    if (allCategorys)
        res.status(200).send({ status: "Ok", data: allCategorys });
    else
        res.status(400).send({ status: "FAILED", data: allCategorys}); 
};

const getCategory = async (req,res)=>{
    let id = req.params.id;
    try {
        const Category = await Categoryservice.getCategory(id);
        res.status(200).send({ status: "Ok", data: Category});
    } catch (error) {
        res.status(error.status || 500).send({status : "FAILED", data:{ error: error.message}});
    }
};

const createCategory = async (req,res)=>{
    const {body} = req;
    const createdCategory = await Categoryservice.createCategory(body.name);
    if (createdCategory)
        res.status(201).send({ status: "OK", data: createdCategory});
    else
        res.status(400).send({ status: "FAILED", data: createdCategory});
};

const updateCategory = async(req,res)=>{
    let id = req.params.id;
    let {name} = req.body;
    const updatedCategory= await Categoryservice.updateCategory(id,name);
    if (updatedCategory) 
        res.status(200).send({ status: "OK", data: updatedCategory});
    else
        res.status(400).send({ status: "FAILED", data: updatedCategory});
};

const deleteCategory= async (req,res)=>{
    let id = req.params.id;
    const deletedCategory = await Categoryservice.deleteCategory(id);
    if (deletedCategory) 
        res.status(200).send({ status: "OK", data: deletedCategory});
    else
        res.status(400).send({status: "FAILED", data: deletedCategory});
};

module.exports ={
    getAllCategory,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
}