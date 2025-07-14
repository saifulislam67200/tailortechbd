import Logo from "@/components/Shared/Logo";
import DialogProvider from "@/components/ui/DialogProvider";
import { IOrder } from "@/types/order";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";

const generateInvoiceNumber = (orderItem: IOrder) => {
  const orderIdPart = orderItem?._id?.slice(-8)?.toUpperCase() || "XXXXXX";

  const phone = orderItem?.shippingAddress?.phoneNumber || "";
  const mobilePart = phone.slice(-4).padStart(4, "0");
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;

  return `INV-${datePart}-${orderIdPart}-${mobilePart}`;
};

const InvoiceModal = ({ orderItem }: { orderItem: IOrder }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const isInsideDhaka = orderItem?.shippingAddress?.division?.toLowerCase() === "dhaka";
  const deliveryFee = isInsideDhaka ? 80 : 120;
  const subtotal = Math.floor(orderItem?.totalProductAmount || 0);
  const discount = Math.floor(orderItem?.couponDiscount || 0);
  const total = subtotal - discount + deliveryFee;
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Generate current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const invoiceNumber = generateInvoiceNumber(orderItem);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    if (!invoiceRef.current) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      toast.warning(
        "Popup blocker might be preventing the print window. Please allow popups for this site."
      );
      return;
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Tailwind CSS CDN -->
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        ${invoiceRef.current.innerHTML}
        <script>
          window.onload = function () {
            window.print();
            window.onafterprint = function () {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <>
      <button
        className="cursor-pointer rounded bg-primary px-[10px] text-white"
        onClick={() => setIsOpen(true)}
      >
        Invoice
      </button>

      <DialogProvider
        setState={setIsOpen}
        state={isOpen}
        className="max-h-[100vh] min-h-[95vh] w-full max-w-[1000px] bg-white"
      >
        <div className="mt-[20px] flex w-full items-center justify-center gap-[10px]">
          <button
            className="cursor-pointer rounded bg-primary px-[10] py-[3px] text-white"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
          </button>
          <button
            className="cursor-pointer rounded bg-primary px-[10] py-[3px] text-white"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>

        <div ref={invoiceRef}>
          <div className="mx-auto my-10 max-w-4xl rounded-lg bg-white p-10 font-sans text-sm text-gray-800">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between border-b pb-4">
              <div className="space-y-1 text-sm">
                <div className="mb-3">
                  {/* <Image
                  src="/TailorTech-01.svg"
                  width={200}
                  height={60}
                  alt="Picture of the author"
                /> */}
                  <Logo />
                </div>
                <p>
                  <strong>Address:</strong> Kalshi Road, Mirpur-11, Dhaka-1216
                </p>
                <p>
                  <strong>Mobile:</strong> +880 01711 923276
                </p>
                <p>
                  <strong>Email:</strong> support@tailortechbd.com
                </p>
                <p>
                  <strong>Website:</strong> www.tailortech.com
                </p>
                <p>
                  <strong>Facebook:</strong> fb.com/tailortech
                </p>
              </div>
              <div className="space-y-1 text-right text-sm">
                <p>
                  <strong>Invoice No:</strong> {invoiceNumber}
                </p>
                <p>
                  <strong>Date:</strong> {formattedDate}
                </p>
                <p>
                  <strong>Time:</strong> {formattedTime}
                </p>
                <p>
                  <strong>Printed On:</strong> {formattedDate}
                </p>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-6">
              <h2 className="mb-1 text-2xl font-semibold text-gray-700">Bill To:</h2>
              <p>
                <strong>Name:</strong> {orderItem?.shippingAddress?.name}
              </p>
              <p>
                <strong>Address:</strong> {orderItem?.shippingAddress?.address}
              </p>
              <p>
                <strong>Email:</strong>
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  orderItem?.shippingAddress?.email || "N/A"
                }
              </p>
              <p>
                <strong>Mobile:</strong> {orderItem?.shippingAddress?.phoneNumber}
              </p>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-center text-sm">
                <thead className="bg-gray-100 text-black/700">
                  <tr>
                    <th className="border p-2">SL</th>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Color</th>
                    <th className="border p-2">Size</th>
                    <th className="border p-2">Qty</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItem?.orderItems?.map((orderItem, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{orderItem?.product?.name}</td>
                      <td className="border p-2">{orderItem?.color}</td>
                      <td className="border p-2">{orderItem?.size}</td>
                      <td className="border p-2">{orderItem?.quantity}</td>
                      <td className="border p-2">{orderItem?.product?.price}</td>
                      <td className="border p-2">
                        {orderItem?.product?.price && orderItem?.quantity
                          ? Math.floor(orderItem.product.price * orderItem.quantity)
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-sm space-y-2 text-right">
                <p>
                  <strong>Subtotal:</strong> {subtotal}
                </p>
                <p>
                  <strong>Discount:</strong> ৳{discount}
                </p>
                <p>
                  <strong>Delivery Charge:</strong> ৳{deliveryFee}
                </p>
                <p className="text-lg font-bold text-black/700">
                  <span>Grand Total:</span> ৳{total}
                </p>
              </div>
            </div>

            {/* Payment Info  */}
            <div className="mt-8 space-y-1 text-sm">
              <p>
                <strong>Payment Method:</strong> COD / Cash / Bkash / Card
              </p>
              <p>
                <strong>Transaction ID:</strong> — If Mobile Banking/Card Payment
              </p>
              <p>
                <strong>Order Status:</strong> Paid & Confirmed / Confirmed & Due
              </p>
            </div>

            {/* Exchange Policy */}
            <div className="mt-6">
              <h3 className="font-semibold">Exchange & Refund Policy:</h3>
              <ul className="list-inside list-disc text-gray-600">
                <li>Products can be exchanged within 3 days of delivery.</li>
                <li>Refund only applicable for defective or wrong items.</li>
              </ul>
            </div>

            {/* Signature */}
            <div className="mt-10 flex justify-between pt-6">
              <div className="text-center">
                <p className="mx-auto w-40 border-t border-gray-400 pt-1 text-gray-700">
                  Customer Sign
                </p>
              </div>
              <div className="text-center">
                <p className="mx-auto w-40 border-t border-gray-400 pt-1 text-gray-700">
                  Authorized Sign
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Thank You For Shopping From Tailortech</p>
            </div>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default InvoiceModal;
