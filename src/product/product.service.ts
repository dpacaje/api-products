import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from './interfaces/product.interface'
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

    async getProducts(): Promise<Product[]>{
        const products = await this.productModel.find();
        return products;
    }

    async getProduct(productId:string): Promise<Product>{
        const product = await this.productModel.findById(productId);
        return product;
    }

    async createProduct(createProductDTO:CreateProductDTO): Promise<Product>{
        const product = new this.productModel(createProductDTO);
        // return await product.save();
        await product.save();
        return product;
    }

    async deleteProduct(productId:string): Promise<Product>{
        const productDeleted = await this.productModel.findByIdAndDelete(productId);
        return productDeleted;
    }

    async updateProduct(productId:string, createProductDTO:CreateProductDTO): Promise<Product>{
        const product = await this.productModel.findByIdAndUpdate(productId, createProductDTO, {new: true});
        return product;
    }

}
