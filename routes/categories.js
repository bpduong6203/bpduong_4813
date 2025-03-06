var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category');
const { ConnectionCheckOutFailedEvent } = require('mongodb');

function buildQuery(obj){
  console.log(obj);
  let result = {};
  if(obj.name){
    result.name = new RegExp(obj.name, 'i');
  }
  return result;
}

router.get('/', async function(req, res, next) {    
  let categories = await categoryModel.find(buildQuery(req.query));
  res.status(200).send({
    success:true,
    data:categories
  });
}
);

router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findById(id);
    res.status(200).send({
      success:true,
      data:category
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:"khong co id phu hop"
    });
  }
}
);

router.post('/', async function(req, res, next) {    
  try {
    let newCategory = new categoryModel({
      name:req.body.name,
      description:req.body.description
    });
    await newCategory.save();
    res.status(201).send({
      success:true,
      data:newCategory
    });
  } catch (error) {
    res.status(400).send({
      success:false,
      message:error.message
    });
  }
}
);

router.put('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findByIdAndUpdate
    (id, req.body, {new:true});
    res.status(200).send({
      success:true,
      data:category
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:"khong co id phu hop"
    });
  }
}
);  

router.delete('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success:true,
      data:category
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:"khong co id phu hop"
    });
  }
}
);

module.exports = router;