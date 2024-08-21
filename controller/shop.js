const Products= require("../models/products");
module.exports.getProductsAll= async(req,res,next)=>{

    const products= await Products.find()
    let data={};
    products.forEach(product=>{
        let arr= data[product.category]|| [];
        arr.push(product);
        data[product.category]=arr;
    })

    res.render("user/productlist",{data,user:req.user});
    
    

}