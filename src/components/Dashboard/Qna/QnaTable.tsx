"use client";

import { useState } from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { RxMagnifyingGlass } from "react-icons/rx";
import useDebounce from "@/hooks/useDebounce";
import {
  useDeleteQuestionAnswerMutation,
  useGetAllQuestionAnswersQuery,
} from "@/redux/features/Q&A/questionAndAnswer.api";
import Pagination from "@/components/ui/Pagination";
import { toast } from "sonner";
import AnswerModal from "./AnswerModal";

const tableHead = [
  { label: "Customer", field: "name" },
  { label: "Product", field: "product" },
  { label: "Question", field: "discount" },
  { label: "Answer", field: "" },
  { label: "Date", field: "createdAt" },
  { label: "Actions", field: "" },
];

export default function QnaTable() {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [page, setPage] = useState<number>(1);
  const { data } = useGetAllQuestionAnswersQuery({ searchTerm, page, limit: 10 });
  const questionAndAnswer = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };
  const [deleteQuestionAnswer] = useDeleteQuestionAnswerMutation();
  console.log(questionAndAnswer);

  const handleDelete = async (id: string) => {
    try {
      await deleteQuestionAnswer(id);
      toast.success("Question delete successfully");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[15px] bg-white p-[16px]">
          {/* Header */}
          <div className="flex flex-col gap-[5px]">
            <h1 className="text-[16px] font-[600]">Questions & Answers Management</h1>
            <p className="text-[14px] text-muted">
             You are managing a total of {" "}
              <span className="font-bold text-dashboard">{metaData.totalDoc}</span>Q&A entries. These are divided into{" "}
              <span className="font-bold text-dashboard">
                {Math.ceil(metaData.totalDoc / 10)} pages
              </span>{" "}
              & currently showing page{" "}
              <span className="font-bold text-dashboard">{metaData.page}.</span>
            </p>
          </div>
          <HorizontalLine className="my-[10px]" />
          {/* Search */}
          <div className="flex w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Order"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-dashboard/20">
              <thead className="bg-dashboard/10">
                <tr>
                  {tableHead.map((heading) => (
                    <th
                      key={heading.field || heading.label}
                      className={`px-[24px] py-[12px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px] ${
                        heading.label === "Actions" ? "text-center" : "text-left"
                      }`}
                    >
                      {heading?.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dashboard/20 bg-white">
                {questionAndAnswer.map((item) => (
                  <tr key={item._id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[12px] font-medium">{item.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex max-w-[250px] items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0">
                          <Image
                            src={item.product.image || "/placeholder.svg?height=48&width=48"}
                            alt={item.product.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[12px] font-medium">
                            {item.product.name}
                          </div>
                          <div className="truncate text-[12px] text-info">ID: {item.productId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="line-clamp-2 max-w-[250px] text-[12px]">{item.question}</div>
                    </td>
                    <td className="px-6 py-4">
                      {item.answer ? (
                        <div className="line-clamp-2 max-w-[250px] text-[12px]">{item.answer}</div>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Pending Answer
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[12px]">{formatDate(item?.createdAt || "")}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-3">
                        
                        {/* Answer Modal */}
                        <AnswerModal item={item}  />
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="rounded-full border-[1px] border-red-200 bg-red-600/5 p-[7px] text-red-600"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {questionAndAnswer.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-lg text-info">No data found</div>
              <div className="mt-2 text-[12px] text-gray-400">
                Try searching with different keywords
              </div>
            </div>
          )}
        </div>
        <Pagination totalDocs={metaData.totalDoc || 0} onPageChange={(page) => setPage(page)} />
      </div>
    </>
  );
}
