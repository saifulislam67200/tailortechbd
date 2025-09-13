"use client";

import React, { useRef } from "react";
import Button from "@/components/ui/Button";
import { IoPrintSharp } from "react-icons/io5";
import { useGetAllComplaintSuggestionQuery } from "@/redux/features/order/order.api";
import TableSkeleton from "@/components/ui/TableSkeleton";
import dateUtils from "@/utils/date";

export default function ComplainSuggestionTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetAllComplaintSuggestionQuery();
  const complaints = data?.data || [];
  console.log(data);

  // 5টি ফেক ডাটা (fallback)
  // const fallbackData = useMemo<Complaint[]>(
  //   () => [
  //     {
  //       id: "C-1001",
  //       timestamp: "2025-08-28 10:15 AM",
  //       customerName: "Rahim Uddin",
  //       orderId: "ORD-784512",
  //       feedbackType: "Complaint",
  //       csCategory: "Delivery & Packing",
  //       priority: "High",
  //       satisfaction: 2,
  //       status: "Pending",
  //       actionTaken: "Parcel এসেছে ক্ষতিগ্রস্ত অবস্থায়। রি-প্যাকিং দরকার।",
  //       resolutionDate: "-",
  //     },
  //     {
  //       id: "C-1002",
  //       timestamp: "2025-08-29 03:40 PM",
  //       customerName: "Nusrat Jahan",
  //       orderId: "ORD-784990",
  //       feedbackType: "Suggestion",
  //       csCategory: "Website Usability",
  //       priority: "Low",
  //       satisfaction: 4,
  //       status: "Implemented",
  //       actionTaken: "চেকআউটে কুপন ফিল্ড দৃশ্যমান করা হয়েছে।",
  //       resolutionDate: "2025-09-01",
  //     },
  //     {
  //       id: "C-1003",
  //       timestamp: "2025-08-30 12:05 PM",
  //       customerName: "Rafi Khan",
  //       orderId: "ORD-785120",
  //       feedbackType: "Both",
  //       csCategory: "Product Quality",
  //       priority: "Medium",
  //       satisfaction: 3,
  //       status: "In Progress",
  //       actionTaken: "কোয়ালিটি টিমে কেস ফরোয়ার্ড করা হয়েছে।",
  //       resolutionDate: "-",
  //     },
  //     {
  //       id: "C-1004",
  //       timestamp: "2025-09-01 09:20 AM",
  //       customerName: "Tania Akter",
  //       orderId: "ORD-785333",
  //       feedbackType: "Complaint",
  //       csCategory: "Return & Refund",
  //       priority: "Urgent",
  //       satisfaction: 1,
  //       status: "Resolved",
  //       actionTaken: "রিফান্ড ইস্যু করা হয়েছে। গ্রাহককে ইমেইল পাঠানো হয়েছে।",
  //       resolutionDate: "2025-09-02",
  //     },
  //     {
  //       id: "C-1005",
  //       timestamp: "2025-09-02 07:55 PM",
  //       customerName: "Shuvo Roy",
  //       orderId: "ORD-785612",
  //       feedbackType: "Other",
  //       csCategory: "Price & Discount",
  //       priority: "Low",
  //       satisfaction: 5,
  //       status: "Closed",
  //       actionTaken: "প্রমো কোড কিভাবে ব্যবহার করতে হয়—সহায়তা করা হয়েছে।",
  //       resolutionDate: "2025-09-03",
  //     },
  //   ],
  //   []
  // );

  // Print setup
  // const handlePrint = useReactToPrint({
  //   onBeforeGetContent: () => {},
  //   documentTitle: "complaint-list",
  //   print: () => tableRef,
  // });

  return (
    <div>
      {/* Print button (hidden during print) */}
      <div className="no-print mb-2 flex w-full items-center justify-end">
        <Button type="button">
          <IoPrintSharp className="mr-2" />
          Print
        </Button>
      </div>

      {/* Printable area */}
      <div ref={tableRef}>
        <div className="rounded-md border border-border-main bg-white p-[18px] md:p-[32px]">
          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full min-w-[1100px] border-collapse print:min-w-0">
              <thead>
                <tr className="bg-solid-slab [&>th]:px-3 [&>th]:py-2 [&>th]:text-left">
                  <th>Timestamp</th>
                  <th>Customer Name</th>
                  <th>Order ID</th>
                  <th>Feedback Type</th>
                  <th>C &amp; S-Category</th>
                  <th>Priority</th>
                  <th>Satisfaction (1–5)</th>
                  <th>Status</th>
                  <th>Action Taken (Details)</th>
                  <th>Resolution Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton row={4} columns={10} />
                ) : complaints.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-3 py-6 text-center text-muted">
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => (
                    <tr key={c._id} className="border-t border-border-main align-top">
                      <td className="px-3 py-2">
                        {dateUtils.formateCreateOrUpdateDate(c.createdAt) || "N/A"}
                      </td>
                      <td className="px-3 py-2">{c.customerName}</td>
                      <td className="px-3 py-2">{c.orderId}</td>
                      <td className="px-3 py-2">{c.feedbackType}</td>
                      <td className="px-3 py-2">{c.csCategory}</td>
                      <td className="px-3 py-2">{c.priority}</td>
                      <td className="px-3 py-2">{c.satisfaction}</td>
                      <td className="px-3 py-2">{c.status}</td>
                      <td className="max-w-[420px] px-3 py-2">
                        <div className="whitespace-pre-wrap">{c.actionTaken}</div>
                      </td>
                      <td className="px-3 py-2">{c.resolutionDate || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
