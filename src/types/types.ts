export interface userInfo{
  username: string,
  email: string,
  password: string
}

export interface productsInfo{
  id:string,
  title:string,
  price:number,
  images:string,
  description?:string
  category?:{
    name:string
  }
}

export interface cartInfo extends productsInfo
{
  total:number
  qty:number
  size?:string
}
