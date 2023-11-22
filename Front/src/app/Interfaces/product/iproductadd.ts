import { Iwarranty } from "../iwarranty";

export interface Iproductadd {
  name: string;
  description: string;
  price: number;
  condition: number;
  stockQuantity: number;
  discount: number;
  model: string;
  color: string;
  storage: number;
  ram: number;
  camera: string;
  cpu: string;
  screenSize: number;
  batteryCapacity: number;
  osVersion: string;
  categoryID: number;
  brandID: number;
  warranties: Iwarranty[];
  images: File[];
}


