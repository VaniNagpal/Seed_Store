const Products= require("../models/products");

module.exports.getAdminPage=(req,res,next)=>{
    res.render("admin/index",{user: req.user});
}
module.exports.postProductAdd= async(req,res,next)=>{
    const {name,price,description,image,seller,category}=req.body;
    await Products.create({
        name,
        price,
        description,
        image,
        seller,
        category
    })
    res.json({ message: "Product created successfully" });

}
module.exports.getProductAdd= async(req,res,next)=>{
    res.render("admin/addProduct",{user:req.user});
    

}
module.exports.getupdateProduct= async(req,res,next)=>{
    const {id}= req.params;
    try{
         const product=  await Products.findById(id);
         res.render("admin/updateProduct",{
            product,
            user:req.user
         })
    }
    catch(err){
        next(err);
    }

}
module.exports.postupdateProduct= async(req,res,next)=>{
    const {name,price,seller,description,image,category,id}= req.body;
    try{
         const product=  await Products.findById(id);
         product.name=name;
         product.price=price;
         product.seller=seller;
         product.description=description;
         product.image=image;
         product.category=category;
         await product.save();
         res.json({ message: "Product updated successfully" });
    }
    catch(err){
        next(err);
    }

}
module.exports.getProductsAll= async(req,res,next)=>{

    const products= await Products.find()
    let data={};
    products.forEach(product=>{
        let arr= data[product.category]|| [];
        arr.push(product);
        data[product.category]=arr;
    })

    res.render("admin/productlist",{data,user:req.user});
    
    

}
module.exports.getProductDelete= async(req,res,next)=>{
    const {id}= req.params;

    const product= await Products.findById(id);
       await Products.deleteOne({_id :id});
    res.redirect("/admin/products/all");
    

}





