// "use client"

// import { MdClose } from "react-icons/md"
// import type { IOrderItem } from "@/types/order"

// interface EditModalProps {
//   isOpen: boolean
//   onClose: () => void
//   item: IOrderItem | null
//   onUpdate: (updatedItem: IOrderItem) => void
//   isLoading: boolean
// }

// export default function EditModal({ isOpen, onClose, isLoading }: EditModalProps) {

 
//   if (!isOpen || !item) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop with blur effect */}
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
//         onClick={onClose}
//       />

//       {/* Modal Container */}
//       <div className="relative w-full max-w-lg transform transition-all duration-300 scale-100">
//         <div className="rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-dashboard to-dashboard/90 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-semibold text-white">Edit Product</h3>
//                 <p className="text-white/80 text-sm mt-1">Update product information</p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
//               >
//                 <MdClose className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Form Content */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="grid grid-cols-1 gap-5">
//                 {/* Product Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Product Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-dashboard focus:outline-none focus:ring-2 focus:ring-dashboard/20 transition-colors duration-200"
//                     placeholder="Enter product name"
//                     required
//                   />
//                 </div>

//                 {/* Quantity and Price Row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Quantity <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleInputChange}
//                       min="1"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-dashboard focus:outline-none focus:ring-2 focus:ring-dashboard/20 transition-colors duration-200"
//                       placeholder="0"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Price (BDT) <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleInputChange}
//                       min="0"
//                       step="0.01"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-dashboard focus:outline-none focus:ring-2 focus:ring-dashboard/20 transition-colors duration-200"
//                       placeholder="0.00"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Color and Size Row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
//                     <input
//                       type="text"
//                       name="color"
//                       value={formData.color}
//                       onChange={handleInputChange}
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-dashboard focus:outline-none focus:ring-2 focus:ring-dashboard/20 transition-colors duration-200"
//                       placeholder="e.g., Red, Blue"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
//                     <input
//                       type="text"
//                       name="size"
//                       value={formData.size}
//                       onChange={handleInputChange}
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-dashboard focus:outline-none focus:ring-2 focus:ring-dashboard/20 transition-colors duration-200"
//                       placeholder="e.g., M, L, XL"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 pt-6 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="flex-1 rounded-lg bg-gradient-to-r from-dashboard to-dashboard/90 px-6 py-3 text-white font-medium hover:from-dashboard/90 hover:to-dashboard shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-dashboard/50"
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
//                       Updating...
//                     </div>
//                   ) : (
//                     "Update Product"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }