import { ProductInOrder } from "./ProductInOrder";

export class Porudzbina {
    porudzbinaId?: number;
    kupacEmail: string;
    kupacIme: string;
    kupacPrezime: string;
    kupacTelefon: string;
    kupacUlica: string;
    kupacBroj: string;
    kupacInterfon: string;
    kupacBrojStana: string;
    kupacSprat: string;
    posebanZahtev: string;
    vreme?: string;  // Assuming this is a string for simplicity, adjust as needed
    orderAmount: number;
    orderStatus: number;
    createTime?: string;  // Assuming this is a string for simplicity, adjust as needed
    updateTime?: string;
    proizvodi: ProductInOrder[];
    
    constructor() {
        this.proizvodi = [];
    }
}