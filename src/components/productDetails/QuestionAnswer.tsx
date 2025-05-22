import Title from "../ui/Title";
import QuestionAnswerCard from "./QuestionAnswerCard";
import QuestionAnswerForm from "./QuestionAnswerForm";

export interface IQuestionAndAns {
  _id: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  question: string;
  answer: string;
}

const mockQuestions: IQuestionAndAns[] = [
  {
    _id: "1",
    name: "Alice",
    question: "Is this product available in different colors?",
    answer: "Yes, it is available in red, blue, and green.",
    productId: "prod123",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:05:00Z",
  },
  {
    _id: "2",
    name: "Bob",
    question: "What is the warranty period?",
    answer: "The product comes with a 1-year warranty.",
    productId: "prod123",
    createdAt: "2024-06-02T11:00:00Z",
    updatedAt: "2024-06-02T11:10:00Z",
  },
  {
    _id: "3",
    name: "Charlie",
    question: "Does it support international shipping?",
    answer: "Yes, we ship internationally.",
    productId: "prod123",
    createdAt: "2024-06-03T12:00:00Z",
    updatedAt: "2024-06-03T12:15:00Z",
  },
  {
    _id: "4",
    name: "Diana",
    question: "Is there a discount for bulk orders?",
    answer: "Please contact our sales team for bulk order discounts.",
    productId: "prod123",
    createdAt: "2024-06-04T13:00:00Z",
    updatedAt: "2024-06-04T13:20:00Z",
  },
  {
    _id: "5",
    name: "Ethan",
    question: "What is the return policy?",
    answer: "You can return the product within 30 days of purchase.",
    productId: "prod123",
    createdAt: "2024-06-05T14:00:00Z",
    updatedAt: "2024-06-05T14:25:00Z",
  },
];

const QuestionAnswer = ({ productId }: { productId: string }) => {
  return (
    <>
      {/* // Q&A */}
      <Title title="QUESTION & ANSWER" className="mt-[10px] !text-[14px]" />

      <div className="mt-[10px] space-y-[10px]">
        {mockQuestions?.map((item) => <QuestionAnswerCard key={item._id} {...item} />)}
      </div>

      <QuestionAnswerForm productId={productId} />
    </>
  );
};

export default QuestionAnswer;
