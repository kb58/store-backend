import { Document } from 'mongoose';

export interface IStock extends Document {
    consumerName:string,
    productName: string;
    supplier:string;
    productId: string;
    quantity: number;
    dateAdded: Date;
    price:number;
    sellingPrice:number;
    cashier:string;
    status:string;
    
}
