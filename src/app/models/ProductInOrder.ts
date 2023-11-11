import {ProductInfo} from "./productInfo";


//Ovde idu dodaci
export class ProductInOrder {
    productId: string;
    productName: string;
    productPrice: number;
    productIcon: string;
    categoryType: number;
    count: number;
    kecap: boolean;
    majonez: boolean;
    sahara: boolean;
    seville: boolean;
    texasBbq: boolean;
    ninjaBlend: boolean;
    kari: boolean;
    siracha: boolean;
    barbecue:boolean;
    besplatniSos: string;
    tostSir: boolean;
    cedar: boolean;
    gauda:boolean;
    zdenka: boolean;
    gorgonzola: boolean;
    slanina: boolean;
    jalapeno: boolean;
    hrskaviLuk: boolean;
    sampinjoni: boolean;
    guacamole: boolean;
    mariniranaPiletina: number;
    mlevenaJunetina:number;
    rostiljKobasica: number;
    chickenNugets: number;
    cordonBleu: number;
    falafel: number;
    posebanZahtev: string;
    subTotal: number

    constructor(productInfo:ProductInfo, quantity = 1, kecap = false, majonez = false,sahara=false,seville=false,texasBbq=false,ninjaBlend=false,kari=false,siracha=false,
        tostSir = false,cedar=false,zdenka=false,gorgonozola=false,slanina=false,jalapeno=false,hrskaviLuk,guacamole=false,
        mariniranaPiletina=0,mlevenaJunetina = 0,rostiljKobasica=0,chickenNugets=0,cordonBleu=0,falafel=0, besplatniSos='',barbecue=false,gauda=false,sampinjoni=false,
        posebanZahtev='', subTotal =0){
        this.productId = productInfo.productId;
        this.productName = productInfo.productName;
        this.productPrice = productInfo.productPrice;
        this.productIcon = productInfo.productIcon;
        this.categoryType = productInfo.categoryType;
        this.count = quantity;
        this.kecap = kecap;
        this.majonez=majonez;
        this.sahara=sahara;
        this.seville=seville;
        this.texasBbq=texasBbq;
        this.ninjaBlend=ninjaBlend;
        this.kari=kari;
        this.siracha=siracha;
        this.tostSir = tostSir;
        this.cedar=cedar;
        this.zdenka=zdenka;
        this.gorgonzola=gorgonozola;
        this.slanina=slanina;
        this.jalapeno=jalapeno;
        this.hrskaviLuk=hrskaviLuk;
        this.guacamole=guacamole;
        this.mariniranaPiletina=mariniranaPiletina;
        this.mlevenaJunetina=mlevenaJunetina;
        this.rostiljKobasica=rostiljKobasica;
        this.chickenNugets=chickenNugets;
        this.cordonBleu=cordonBleu;
        this.falafel=falafel;
        this.besplatniSos=besplatniSos;
        this.gauda=gauda;
        this.sampinjoni=sampinjoni;
        this.barbecue=barbecue;
        this.posebanZahtev=posebanZahtev;
        this.subTotal = subTotal;
    }
}
