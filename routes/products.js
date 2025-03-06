var express = require('express');
const { ConnectionCheckOutFailedEvent } = require('mongodb');
var router = express.Router();
let productModel = require('../schemas/product')

function buildQuery(obj){
  console.log(obj);
  let result = {};
  if(obj.name){
    result.name = new RegExp(obj.name, 'i');
  }
  result.price = {};
  if(obj.price){
    if(obj.price.$gte){
      result.price.$gte = parseFloat(obj.price.$gte);
    } else {
      result.price.$gte = 0;
    }
    if(obj.price.$lte){
      result.price.$lte = parseFloat(obj.price.$lte);
    } else {
      result.price.$lte = 10000;
    }
  } else {
    result.price.$gte = 0;
    result.price.$lte = 10000;
  }
  return result;
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  

  let products = await productModel.find(buildQuery(req.query));

  res.status(200).send({
    success:true,
    data:products
  });
});
router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let product = await productModel.findById(id);
    res.status(200).send({
      success:true,
      data:product
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:"khong co id phu hop"
    });
  }
});

router.post('/', async function(req, res, next) {
  try {
    let newProduct = new productModel({
      name: req.body.name,
      price:req.body.price,
      quantity: req.body.quantity,
      category:req.body.category
    })
    await newProduct.save();
    res.status(200).send({
      success:true,
      data:newProduct
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let product = await productModel.findById
    (id);
    if(req.body.name){
      product.name = req.body.name;
    }
    if(req.body.price){
      product.price = req.body.price;
    }
    if(req.body.quantity){
      product.quantity = req.body.quantity;
    }
    if(req.body.category){
      product.category = req.body.category;
    }
    await product.save();
    res.status(200).send({
      success:true,
      data:product
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
}
);

router.delete('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let deletedProduct = await productModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deletedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).send({
      success: true,
      data: deletedProduct
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});


module.exports = router;



