import CategoryProductView from "@/views/CategoryProductView";

const page = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return <CategoryProductView {...props} />;
};

export default page;
