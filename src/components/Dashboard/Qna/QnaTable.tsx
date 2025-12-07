"use client";

import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import Tooltip from "@/components/ui/ToolTip";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllQuestionAnswersQuery } from "@/redux/features/Q&A/questionAndAnswer.api";
import dateUtils from "@/utils/date";
import Image from "next/image";
import { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import AnswerModal from "./AnswerModal";
import DeleteQna from "./DeleteQna";
import QnaSkeleton from "./QnaSkeleton";
import { profileFallBack } from "@/utils";

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
  const { data, isLoading } = useGetAllQuestionAnswersQuery({ searchTerm, page, limit: 10 });
  const questionAndAnswer = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[15px] bg-white p-[16px]">
          {/* Header */}
          <div className="flex flex-col gap-[5px]">
            <h1 className="text-[16px] font-[600]">Questions & Answers Management</h1>
            <p className="text-[14px] text-muted">
              You are managing a total of{" "}
              <span className="font-bold text-dashboard">{metaData.totalDoc}</span>Q&A entries.
              These are divided into{" "}
              <span className="font-bold text-dashboard">
                {Math.ceil(metaData.totalDoc / 10)} pages
              </span>{" "}
              & currently showing page{" "}
              <span className="font-bold text-dashboard">{metaData.page}.</span>
            </p>
          </div>
          <HorizontalLine className="my-[10px]" />
          {/* Search */}
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
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
                {isLoading ? (
                  <QnaSkeleton rows={10} />
                ) : (
                  questionAndAnswer.map((item) => (
                    <tr key={item._id} className="transition-colors hover:bg-gray-50">
                      <td className="px-[24px] py-[16px] whitespace-nowrap">
                        <span className="block text-[12px] font-medium">{item.name}</span>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        <span className="flex max-w-[250px] items-center gap-3">
                          <span className="h-[48px] w-[48px] flex-shrink-0">
                            <Image
                              src={item.product.image || profileFallBack}
                              alt={item.product.name}
                              width={48}
                              height={48}
                              className="h-[48px] w-[48px] rounded-lg object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[12px] font-medium">
                              {item.product.name}
                            </span>
                            <span className="block truncate text-[12px] text-info">
                              ID: {item.product.productCode}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        <Tooltip content={item.question}>
                          <span className="line-clamp-2 block h-[32px] w-[250px] text-[12px]">
                            {item.question}
                          </span>
                        </Tooltip>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        {item.answer ? (
                          <Tooltip content={item.answer}>
                            <span className="line-clamp-2 block h-[32px] w-[250px] text-[12px]">
                              {item.answer}
                            </span>
                          </Tooltip>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending Answer
                          </span>
                        )}
                      </td>
                      <td className="px-[24px] py-[16px] whitespace-nowrap">
                        <span className="block text-[12px]">
                          {dateUtils.formateCreateOrUpdateDate(item?.createdAt || "N/A")}
                        </span>
                      </td>
                      <td className="px-[24px] py-[16px] whitespace-nowrap">
                        <span className="flex items-center justify-center gap-3">
                          {/* Answer Modal */}
                          <AnswerModal item={item} />
                          <DeleteQna id={item?._id} customerName={item?.name} />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {questionAndAnswer.length === 0 && (
            <div className="py-[48px] text-center">
              <div className="text-[18px] text-primary">No data found</div>
              <div className="mt-[8px] text-[12px] text-info">
                Try searching with different keywords
              </div>
            </div>
          )}
        </div>
        <Pagination
          totalDocs={metaData.totalDoc || 0}
          page={page}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
}
