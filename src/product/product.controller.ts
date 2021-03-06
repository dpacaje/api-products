import { Controller, Get, Post, Res, HttpStatus, Body, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/product.dto'
import { ProductService } from './product.service'
import { ProductSchema } from './schemas/product.schema';

@ApiBearerAuth()
@ApiTags('products')
@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){}

    @Post('/create')
    @ApiOperation({summary: 'Product created'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    async createPost(@Res() res, @Body() createProductDTO:CreateProductDTO){
        // console.log(createProductDTO);
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product created.',
            product
        });
    }

    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        });
    }

    @Get('/:id')
    @ApiResponse({
        status: 200,
        description: 'Product not found'
    })
    async getProduct(@Res() res, @Param('id') id:string){
        const product = await this.productService.getProduct(id);
        if (!product) throw new NotFoundException('Product not found.');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('id') id:string){
        const product = await this.productService.deleteProduct(id);
        if (!product) throw new NotFoundException('Product not found.');
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted.',
            product
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Query('id') id:string, @Body() createProductDTO:CreateProductDTO){
        const product = await this.productService.updateProduct(id, createProductDTO);
        if (!product) throw new NotFoundException('Product not found.');
        return res.status(HttpStatus.OK).json({
            message: 'Product updated.',
            product
        });
    }

}
