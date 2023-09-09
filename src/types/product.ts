import { ProductType as ApiProductType } from '@commercetools/platform-sdk';
import { UniqueId } from './common';

export type ProductPrice = {
  defaultValue: number;
  currency: string;
  discountedValue: number;
};

export type ProductType = ApiProductType;

export type Product = {
  id: UniqueId;
  name: string;
  type: string;
  url: string;
  price: ProductPrice;
  image: string | null;
};
type Categories = Category[];

type Category = {
  typeId: string;
  id: string;
};

type ProductName = {
  'en-US': string;
  ru: string;
};

type image = {
  url: string;
  label: string;
};

type Images = image[];

type PriceValue = {
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

type VariantAttribute = {
  name: string;
  value: AttributeValue;
};

type VariantIncludes = Category[] | Category;

type Attributes = VariantAttribute[];

type AttributesDefined = {
  [key: string]: AttributeValue;
};

type AttributeValue = string | PriceValue | Category[] | Category;

type AttributesCourse = {
  'Course-Name': string;
  'Course-Price': PriceValue;
  'Course-Descr': string;
  'Course-Roadmap': string;
};

type AttributesProfession = {
  [index: string]: string | PriceValue | VariantIncludes;
  'Profession-Name': string;
  'Profession-Price': PriceValue;
  'Profession-Desc': string;
  'Profession-Includes1': VariantIncludes;
};

export {
  ProductName,
  Attributes,
  Categories,
  Images,
  AttributesProfession,
  AttributesCourse,
  VariantAttribute,
  AttributesDefined,
  PriceValue,
  VariantIncludes,
};
