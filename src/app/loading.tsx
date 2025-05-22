import Image from "next/image";

const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <Image src={"/images/loading_cart.gif"} width={500} height={500} alt="loading" />
    </div>
  );
};

export default loading;
