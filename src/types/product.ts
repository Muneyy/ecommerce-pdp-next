type ImageLinkType = {
  link: string;
  altText: string;
};

type BaseProductType = {
  id: number;
  company: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  thumbnailImage: ImageLinkType;
};

export type ProductType = BaseProductType & {
  imageLinks: ImageLinkType[];
};

export type CartProductType = BaseProductType & {
  quantity: number;
};
