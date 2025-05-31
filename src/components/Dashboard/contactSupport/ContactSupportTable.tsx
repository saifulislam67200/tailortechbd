import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllContactsToSupportQuery } from "@/redux/features/contactSupport/contactSupport.api";
import dateUtils from "@/utils/date";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import ContactSupportDialog from "./ContactSupportDialog";

const tableHead = [
  { label: "fullName", field: "name" },
  { label: "email", field: "email" },
  { label: "subject", field: "" },
  { label: "message", field: "" },
  { label: "Date Created", field: "createdAt" },
  { label: "Actions", field: "" },
];

const ContactSupportTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });

  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllContactsToSupportQuery({ ...query, searchTerm });
  const contactSupportData = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };
  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Contact Support</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All Contacts to support customers
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Search Product"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <RxMagnifyingGlass />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className="px-6 py-3 text-left text-sm font-semibold text-dashboard uppercase"
                  >
                    {heading.field ? (
                      <button
                        className="flex cursor-pointer items-center gap-1"
                        onClick={() => handleSort(heading.field)}
                      >
                        <span>{heading.label}</span>
                        <span className="flex flex-col text-[10px] leading-[10px]">
                          <FaChevronUp
                            className={`${
                              sort.field === heading.field && sort.order === "asc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                          <FaChevronDown
                            className={`${
                              sort.field === heading.field && sort.order === "desc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                        </span>
                      </button>
                    ) : (
                      heading.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-dashboard/20">
              {isLoading ? (
                <TableSkeleton columns={tableHead.length} />
              ) : data?.data.length ? (
                contactSupportData?.map((contact) => (
                  <tr key={contact?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-[5px]">
                        <span className="line-clamp-1 text-[14px]">{contact.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex flex-col gap-[6px]">
                        <span className="text-[14px]">Email: {contact.email || "N/A"}</span>
                        <span className="text-[14px]">Phone: {contact.phoneNumber}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">{contact.subject}</td>

                    <td className="line-clamp-1 max-w-[300px] px-6 py-4">
                      <span className="line-clamp-2">{contact.message}</span>
                    </td>
                    <td className="px-6 py-4">
                      {dateUtils.formateCreateOrUpdateDate(contact.createdAt) || "N/A"}
                    </td>
                    <td>
                      <ContactSupportDialog contactSupport={contact} />
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Product Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalDocs={metaData.totalDoc}
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </div>
  );
};

export default ContactSupportTable;
