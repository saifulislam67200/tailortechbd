"use client";

import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { IOrderItem } from "@/types/order";
// import { useUpdateOrderMutation } from "@/redux/features/order/order.api";
// import { toast } from "sonner";
// import EditModal from "./EditModal";
// import { useState } from "react";

interface OrderItemsProps {
  orderItems: IOrderItem[];
}

export default function OrderItems({ orderItems }: OrderItemsProps) {
//   const [updateOrder, { isLoading }] = useUpdateOrderMutation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

  return (
    <>
      <div className="mt-6 mb-6 rounded-md border border-slate-300 bg-white p-6">
        <h2 className="mb-[16px] text-[20px] font-semibold text-dashboard">Order Items</h2>
        <div className="space-y-4">
          {orderItems?.map((item) => (
            <div
              key={item?.product_id}
              className="flex items-center justify-between gap-[16px] rounded-md border border-slate-300 bg-white p-[16px]"
            >
              <div className="flex items-center gap-[16px]">
                <div className="overflow-hidden rounded-md bg-slate-200">
                  <Image
                    src={item?.product?.image || "/images/avatar.jpg"}
                    width={100}
                    height={100}
                    alt={`${item?.product?.name || "Product"} image`}
                    className="h-16 w-16 object-contain object-center"
                  />
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Name: </span>
                    {item?.product?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Quantity: </span>
                    {item?.quantity}
                  </p>
                  {item?.color ? (
                    <p>
                      <span className="font-semibold">Color: </span>
                      {item?.color}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
                  title="Edit Product"
                >
                  <MdEdit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isLoading={isLoading}
      /> */}
    </>
  );
}
