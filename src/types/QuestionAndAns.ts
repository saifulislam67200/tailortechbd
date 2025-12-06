export interface IQuestionsAndAns {
  _id: string;
  createdAt: string;
  name: string;
  question: string;
  answer?: string;
  product: {
    name: string;
    image: string;
    productCode: string;
  };
  productId: string;
}
