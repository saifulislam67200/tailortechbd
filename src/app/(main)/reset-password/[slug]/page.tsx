import ResetPasswordView from "@/views/ResetPasswordView";

export const metadata = {
  title: "Reset Password",
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "";

  return <ResetPasswordView slug={slug} />;
};

export default page;
