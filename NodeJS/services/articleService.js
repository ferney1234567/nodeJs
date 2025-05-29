const db = require('../models');

const getAllArticles = async () => {
    try {
        let Articles = await db.Article.findAll({
            include: [
                {
                    model: db.User,
                    as: "User", // 👈 Este alias debe coincidir si lo definiste en la relación
                    attributes: ["id", "name", "email"]
                },
                {
                    model: db.Category,
                    as: "categories", // 👈 Este alias debe coincidir con el que usaste en belongsToMany
                    attributes: ["id", "name"],
                    through: { attributes: [] } // ⬅️ Para no mostrar info de tabla intermedia
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        return Articles;
    } catch (error) {
        return error.message || "Failed to get Articles";
    }
};


const getArticle = async (id) => {
    try {
        let Article = await db.Article.findByPk(id);
        return Article
    } catch (error) {
        throw { status: 500, message: error.message || "Failed to get Article" };
    }
};

const createArticle = async (title, content, UserId) => {
    try {
        let newArticle = await db.Article.create({
            title,
            content,
            UserId
        });
        if (newArticle) {
            const categories = [1,2,3];
            await newArticle.setCategories(categories);
        }
        return newArticle;
    } catch (error) {
        return error.message || "Failed to create Article";
    }
};

const updateArticle = async (id, title, content, UserId) => {
    try {
        let updatedArticle = await db.Article.update({
            title,
            content,
            UserId
        }, {
            where: { id }
        });
        return updatedArticle;
    } catch (error) {
        return error.message || "Failed to update Article";
    }
};

const deleteArticle = async (id) => {
    try {
        let deletedArticle = await db.Article.destroy({
            where: { id }
        });
        return deletedArticle;
    } catch (error) {
        return error.message || "Failed to delete Article";
    }
};

module.exports = {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
};