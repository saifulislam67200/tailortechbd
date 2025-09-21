import TableSkeleton from "@/components/ui/TableSkeleton";
import { useGetAllComplaintSuggestionQuery } from "@/redux/features/order/order.api";
import { IComplaint } from "@/types/complaint";
import { IoPencilOutline } from "react-icons/io5";
import DeleteComplainAndSuggestoinById from "./DeleteComplainAndSuggestoinById";

const ComplainAndSuggestionTable = ({
  setView,
  onEditClick,
}: {
  setView: (view: "table" | "form") => void;
  onEditClick: (id: IComplaint) => void;
}) => {
  const { data, isLoading: isLoadingComplaints } = useGetAllComplaintSuggestionQuery({});
  const complaints = data?.data || [];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-strong">Complaint List</h3>
        <button
          onClick={() => setView("form")}
          className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          Complain
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-solid-slab text-strong [&>th]:px-3 [&>th]:py-2 [&>th]:text-left">
              {/* <th>Timestamp</th>
                  <th>Customer Name</th> */}
              <th>Order ID</th>
              <th>Feedback Type</th>
              <th>C &amp; S-Category</th>
              <th>Priority</th>
              <th>Satisfaction</th>
              <th>Status</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingComplaints ? (
              <TableSkeleton row={4} columns={7} />
            ) : complaints.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-muted">
                  @ No complaints yet. Click <span className="font-semibold">Complain</span> to add
                  one.
                </td>
              </tr>
            ) : (
              complaints.map((c) => (
                <tr key={c._id} className="border-t border-border-main align-top">
                  <td className="px-3 py-2">{c.orderId}</td>
                  <td className="px-3 py-2">{c.feedbackType}</td>
                  <td className="px-3 py-2">{c.csCategory}</td>
                  <td className="px-3 py-2">{c.priority}</td>
                  <td className="px-3 py-2">{c.satisfaction}</td>
                  <td className="px-3 py-2">{c.status}</td>
                  <td className="max-w-[360px] px-3 py-2">
                    <span className="line-clamp-3 whitespace-pre-wrap">{c.message}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="flex items-center gap-2">
                      <button
                        onClick={() => onEditClick(c)}
                        className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-primary text-primary hover:bg-primary/10"
                      >
                        <IoPencilOutline />
                      </button>
                      <DeleteComplainAndSuggestoinById id={c._id} />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplainAndSuggestionTable;
