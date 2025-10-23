import { ImInfo } from "react-icons/im";

const AddToCartErrorMessage = ({
  errorMessage,
  className,
}: {
  errorMessage: string;
  className?: string;
}) => {
  return (
    <span className={`flex items-center gap-2 text-sm text-red-500 ${className || ""}`}>
      <ImInfo />
      {errorMessage}
    </span>
  );
};

export default AddToCartErrorMessage;
