"use client";
import PlusIcon from "@/components/icons/PlusIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import { logout as logoutAction } from "@/redux/features/user/user.slice";
import { TCategoryWithSubcategories } from "@/types/category";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { toast } from "sonner";

interface CategoryAccordionProps {
  setIsOpen: (open: boolean) => void;
}

const CategoryAccordionItem = ({
  category,
  depth = 0,
  onLinkClick,
}: {
  category: TCategoryWithSubcategories;
  depth?: number;
  onLinkClick?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = () => {
    setIsOpen((prev) => !prev);
  };

  const hasChildren = category.subcategories?.length;

  return (
    <div key={category._id} className={`relative`}>
      {hasChildren ? (
        <button
          onClick={() => toggleCategory()}
          className={`transition-color flex w-full items-center justify-between p-[8px] text-left text-white ${depth === 0 ? "border-b-[1px] border-white/20" : ""}`}
        >
          <span className="flex items-center text-[13px] font-medium text-white">
            {category.label}
          </span>
          {hasChildren ? <PlusIcon size="size-4" /> : ""}
        </button>
      ) : (
        <Link
          onClick={onLinkClick}
          href={`/shop/${category.slug}`}
          className={`transition-color hover_underline flex w-full items-center justify-between p-[8px] text-left text-white ${depth === 0 ? "border-b-[1px] border-white/20" : ""}`}
        >
          <span className="flex items-center text-[13px] font-medium text-white">
            {category.label}
          </span>
        </Link>
      )}

      {isOpen && hasChildren ? (
        <div className="py-2 pl-4 text-white">
          <Link
            href={`/shop/${category.slug}`}
            onClick={onLinkClick}
            className={`transition-color hover_underline flex w-full items-center justify-between p-[8px] text-left text-white`}
          >
            <span className="flex items-center text-[13px] font-medium text-white">
              ALL {category.label}
            </span>
          </Link>
          {category.subcategories?.map((category, i) => (
            <CategoryAccordionItem
              key={category._id}
              category={category}
              depth={depth + i + 1}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const CategoryAccordion = ({ setIsOpen }: CategoryAccordionProps) => {
  const { data } = useGetAllCategoriesQuery({ mode: "tree" });
  const categories = data?.data;
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logoutAction(undefined));
    // dispatch(clearCart());
      startTransition(() => {
    router.push("/");
    setIsOpen(false);
  });
    await logoutUser(undefined);
    toast.success("Logout successfully");
  };

  useEffect(() => {
    if (!user || !user.phoneNumber) {
      router.push("/");
    }
  }, [user]);


  return (
    <>
      <div className="w-full">
        <div className="p-[8px]">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <IoHome color="#fff" />
          </Link>
        </div>

        <div className="border-t border-quaternary/30">
          <div className="h-full overflow-y-auto">
            {categories?.map((category) => (
              <CategoryAccordionItem
                key={category._id}
                category={category}
                onLinkClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-14 border-t border-quaternary/30">
        {user && user.phoneNumber ? (
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center space-x-[12px] px-[16px] py-[14px] text-[14px] text-white"
          >
            <FiLogOut className="h-[16px] w-[16px]" />
            <span>Logout</span>
          </button>
        ) : (
          <>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex w-full cursor-pointer items-center space-x-[12px] px-[16px] py-[14px] text-[14px] text-white"
            >
              <FiLogIn className="h-[16px] w-[16px]" />
              <span>Customer Login</span>
            </Link>
            <Link
              href="/login-admin"
              onClick={() => setIsOpen(false)}
              className="flex w-full cursor-pointer items-center space-x-[12px] px-[16px] py-[14px] text-[14px] text-white"
            >
              <FiLogIn className="h-[16px] w-[16px]" />
              <span>Admin Login</span>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryAccordion;
