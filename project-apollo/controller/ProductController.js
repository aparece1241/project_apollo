const sequelize = require('../services/Database');

const {DataTypes} = require("sequelize");

const Product = require('../models/product')(sequelize, DataTypes);

const productSchema = require('../validator/ProductSchema');

const RequestBodyParser = require('../services/RequestBodyParser');

module.exports = {
    addProduct: async (req, res)=> {
        const {error, value} = productSchema.validate(req.body);
        if(error) return res.status(400).json({message: error});

        try {
            const productToAdd = await Product.create(value);
            const product = await productToAdd.save();

            if(!product) return res.status(400).json({message: "Something went wrong!"});
            res.json({product: product});            
        } catch (error) {
            res.status(500).json({message: error});
        }
    },
    
    getProducts: async (req, res)=> {
        try {
            const products = await Product.findAll();
            if(!products) return res.status(400).json({message: "Something went wrong!"});
            res.json({products: products});
        } catch (error) {
            res.status(500).json({message: error});
        }
    },

    getProductById: async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Product.findByPk(id);
            if(!product) return res.status(400).json({message: "Product not found!"});;
            res.json({product: product});
        } catch (error) {
            res.status(500).json({message: error});
        }
    },

    updateProductById: async (req, res) => {
        const id = req.params.id;
        const updates = RequestBodyParser(req.body);

        try {
            const updatedProduct = await Product.update(updates, {where: {
                id:id
            }});
            if(!updatedProduct) return res.status(400).json({message: "Something wnet wrong!"});

            res.json({product: updatedProduct});
        } catch (error) {
            res.status(500).json({message: error});
        }
    },

    deleteProduct: async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Product.destroy({where: {
                id: id
            }});
            if(!product) return res.status(400).json({message: "Something wnet wrong!"});
            res.json({message: "Deleted!"})
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}