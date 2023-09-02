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

type VariantName = {
  name: string;
  value: string;
};

type VariantPrice = {
  name: string;
  value: {
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
};

type VariantDescription = {
  name: string;
  value: string;
};

type VariantRoadmap = {
  name: string;
  value: string;
};

type VariantIncludes = {
  name: string;
  value: Category[] | Category;
};

type Attributes = [
  VariantName,
  VariantPrice,
  VariantDescription,
  VariantRoadmap | VariantIncludes,
  VariantIncludes?,
  VariantIncludes?,
  VariantIncludes?,
];

export {
  ProductName,
  Attributes,
  VariantPrice,
  VariantDescription,
  VariantIncludes,
  Categories,
  Images,
};
