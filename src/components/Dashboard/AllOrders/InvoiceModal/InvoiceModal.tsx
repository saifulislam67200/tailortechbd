import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { paymentMethodOptions } from "@/const/order";
import { useGetOrGenerateOrderInvoiceIdQuery } from "@/redux/features/order/order.api";
import { IOrder } from "@/types/order";
import { numberToWords } from "@/utils/numberToWord";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import "./InvoiceModal.css";

const InvoiceModal = ({ orderItem }: { orderItem: IOrder }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const { data } = useGetOrGenerateOrderInvoiceIdQuery(orderItem._id, {
    skip: !!orderItem.invoiceId,
  });

  const [isOpen, setIsOpen] = useState(false);
  const isInsideDhaka = orderItem?.shippingAddress?.division?.toLowerCase() === "dhaka";
  const deliveryFee = isInsideDhaka ? 80 : 120;
  const subtotal = Math.floor(orderItem?.totalProductAmount || 0);
  const discount = Math.floor(orderItem?.couponDiscount || 0);
  const total = subtotal - discount + deliveryFee;
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Generate current date and time
  const formattedDate = (date?: Date | string) => {
    const currentDate = date ? new Date(date) : new Date();
    return currentDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const formattedTime = (date?: Date | string) => {
    const currentDate = date ? new Date(date) : new Date();
    return currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const invoiceNumber = orderItem.invoiceId || data?.data?.invoiceId || "N/A";

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    const el = invoiceRef.current;
    if (!el) return;

    try {
      // Render the full invoice element
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: el.scrollWidth,
        height: el.scrollHeight,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Fixed width = 3 inch → 76.2 mm
      const pdfWidth = 76.2; // mm
      // Auto height based on aspect ratio
      const pdfHeight = pdfWidth * (canvas.height / canvas.width);

      // Create PDF with custom size
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight], // custom receipt size
      });

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`invoice-${invoiceNumber}.pdf`);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
      setIsOpen(false);
    } finally {
      setIsGeneratingPDF(false);
      setIsOpen(false);
    }
  };

  const handlePrints = useReactToPrint({
    contentRef: invoiceRef,
  });

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <button
          className="cursor-pointer rounded border-[1px] border-border-main px-[10px] py-[4px] text-[16px] text-primary duration-[0.3s] hover:bg-primary hover:text-white"
          onClick={() => {
            setIsOpen(true);
            const timer = setTimeout(() => {
              handleDownloadPDF();
            }, 500);

            return () => clearTimeout(timer);
          }}
        >
          🖨️ Download
        </button>
        <button
          className="cursor-pointer rounded border-[1px] border-border-main px-[10px] py-[4px] text-[16px] text-primary duration-[0.3s] hover:bg-primary hover:text-white"
          onClick={() => {
            setIsOpen(true);
            const timer = setTimeout(() => {
              handlePrints();
              setIsOpen(false);
            }, 500);

            return () => clearTimeout(timer);
          }}
        >
          🖨️ Print
        </button>
      </div>

      <DialogProvider setState={setIsOpen} state={isOpen} className="w-full max-w-[300px] bg-white">
        <div
          ref={invoiceRef}
          className="flex h-auto w-[3in] flex-col px-3 py-3 font-sans text-[12px] text-black"
        >
          {/* Header */}
          <div className="text-left">
            <div className="mb-2">
              <img
                src="/images/logos/logo.png"
                width={200}
                height={40}
                className="mx-auto h-[38px]"
              />
            </div>
            <p>
              <strong>Address: Kalshi Road, Mirpur-11, Dhaka-1216.</strong>
            </p>
            <p>
              <strong>Mobile: +880 1711 923276, +880 1911 696556</strong>
            </p>
            <p>
              <strong>E-mail: support@tailortechbd.com</strong>
            </p>
            <p>
              <strong>Website: www.tailortechbd.com</strong>
            </p>
          </div>
          {/* Invoice Info */}
          <strong className="my-2 text-center text-[12px]">
            -------------------INVOICE-------------------
          </strong>
          <p className="mb-2 flex w-full justify-between text-[12px] font-bold">
            Invoice No: <span>{invoiceNumber}</span>
          </p>
          {/* Bill To */}
          <div className="mb-2 text-[12px]">
            <strong>
              <u>Bill to:</u>
            </strong>
            <p>
              <strong>Name: {orderItem?.shippingAddress?.name}</strong>
            </p>
            <p>
              <strong>Cell: {orderItem?.shippingAddress?.phoneNumber || "N/A"}</strong>
            </p>
          </div>
          <div className="mb-2 flex justify-between text-[12px]">
            <p>
              <strong>Date: {formattedDate(new Date())}</strong>
            </p>
            <p>
              <strong>Time: {formattedTime(new Date())}</strong>
            </p>
          </div>
          {/* Products Table */}
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr style={{ border: "1px solid #000" }}>
                <th className="px-1 py-1">Description</th>
                <th className="px-1 py-1">Qty</th>
                <th className="px-1 py-1">U. Price</th>
                <th className="px-1 py-1">T. Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItem?.orderItems?.map((it, idx) => {
                const uPrice = Math.floor(it?.product?.price ?? 0);
                const tPrice = it?.quantity ? Math.floor(uPrice * it.quantity) : 0;
                return (
                  <tr key={idx}>
                    <td className="max-w-[1.4in] px-1 py-1 text-left">
                      <strong>
                        {it?.product?.name} {it?.color ? `- ${it.color}` : ""}
                        {it?.size ? ` - ${it.size}` : ""}
                      </strong>
                    </td>
                    <td className="px-1 py-1">
                      <strong>{it?.quantity}</strong>
                    </td>
                    <td className="px-1 py-1">
                      <strong>{uPrice}</strong>
                    </td>
                    <td className="px-1 py-1">
                      <strong>{tPrice}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <HorizontalLine className="my-[1mm] bg-black" />
          {/* Totals */}
          <div className="mt-2 text-right text-[12px]">
            <p>
              <strong>Subtotal = {subtotal}</strong>
            </p>
            <p>
              <strong>General Discount = 0</strong>
            </p>
            <p>
              <strong>Coupon Discount = {discount}</strong>
            </p>
            <p>
              <strong>Delivery Charge = {deliveryFee}</strong>
            </p>
            <p className="mt-1 text-[13px] font-bold">
              <strong>Grand Total = {total}</strong>
            </p>
          </div>
          {/* In Words */}
          <p className="mt-2 text-[12px]">
            <strong>In word: {numberToWords(total)} taka only</strong>
          </p>
          {/* Payment Method */}
          <div className="mt-2 text-[12px]">
            <p>
              <strong>
                Payment Method: {paymentMethodOptions[orderItem.paymentMethod]?.label}
              </strong>
            </p>
            <p className="mt-[10px] text-[11px]">
              <strong>
                <span className="underline">For exchange & refund:</span> Please Visit our website
              </strong>
            </p>
          </div>
          {/* Thank You */}
          <div className="mt-3 border border-black p-2 text-center text-[13px] font-bold">
            Thank you for shopping from
            <br />
            “Tailortech”
          </div>
          {/* Footer */}
          <div className="mt-2 text-center text-[13px]">
            <p>This is an electronic generated bill.</p>
            <p>No signature is required.</p>
          </div>
        </div>

        <div className="sticky top-0 z-10 bg-white pt-[20px] pb-3">
          <div className="flex w-full items-center justify-center gap-[10px]">
            <button
              className="cursor-pointer rounded bg-primary px-[10px] py-[3px] text-white"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
            </button>
            <button
              className="cursor-pointer rounded bg-primary px-[10px] py-[3px] text-white"
              onClick={handlePrints}
            >
              Print
            </button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default InvoiceModal;
