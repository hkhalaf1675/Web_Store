import { Iwarranty } from "../iwarranty";
    export interface Iproductreturn {
      id: number;
      name: string;
      description: string;
      price: number;
      discount: number;
      priceAfter: number;
      condition: number;
      stockQuantity: number; // want in admin
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
      categoryName: string;
      brandID: number;
      brandName: string;
      warranties: Iwarranty[];  // array of object (Iwarranty)
      images: string[];         // array of strings just for now
      avgRating: number;
      avgRatingRounded: number;
    }

