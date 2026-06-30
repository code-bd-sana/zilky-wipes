"use client";

import DashboardDataTable, {
  type DashboardFilterMenuConfig,
  type DashboardTableColumn,
} from "@/components/shared/dashboard-data-table";
import DateRangePicker, {
  type DateRange,
} from "@/components/shared/date-range-picker";
import {
  CalendarDays,
  DollarSign,
  Eye,
  Forward,
  IndentIncrease,
  ListFilter,
  PackageCheck,
  Package,
  PencilLine,
  Settings2,
  Trash2,
} from "lucide-react";
import { useState, useMemo } from "react";
import EditProductModal, { type ProductRow as EditProductRow } from "./edit-product-modal";
import ViewProductModal from "./view-product-modal";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";

export type BackendVariant = {
  id?: string;
  price: number;
  stock: number;
  name?: string;
  subscriptionEligible?: boolean;
  subscriptionDiscount?: number;
};

export type BackendCategory = { id: string; name: string };
export type BackendTag = { id: string; name: string };
export type BackendProduct = {
  id: string;
  name: string;
  description?: string;
  images?: string[];
  isFeatured?: boolean;
  categories?: BackendCategory[];
  tags?: BackendTag[];
  variants?: BackendVariant[];
  accordionDetails?: { title: string; content: string }[];
};

type ProductRow = {
  id: string;
  name: string;
  price: number;
  maxPrice: number;
  stock: number;
  status?: "low" | "out";
  sku?: string;
  category?: string;
  raw: BackendProduct;
};

export default function ProductListPage() {
  const [customDateRange, setCustomDateRange] = useState<
    DateRange | undefined
  >();
  
  // Modals state
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);
  const [viewingProduct, setViewingProduct] = useState<ProductRow | null>(null);

  const { data: responseData, isLoading } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  // Transform backend data to frontend table data
  const productsData = useMemo<ProductRow[]>(() => {
    if (!responseData?.data) return [];
    return responseData.data.map((p: BackendProduct) => {
      let minPrice = 0;
      let maxPrice = 0;
      let totalStock = 0;
      
      if (p.variants && p.variants.length > 0) {
        minPrice = Math.min(...p.variants.map((v: BackendVariant) => v.price));
        maxPrice = Math.max(...p.variants.map((v: BackendVariant) => v.price));
        totalStock = p.variants.reduce((acc: number, v: BackendVariant) => acc + v.stock, 0);
      }
      
      let status: "low" | "out" | undefined = undefined;
      if (totalStock === 0) status = "out";
      else if (totalStock <= 5) status = "low";
      
      return {
        id: p.id,
        name: p.name,
        price: minPrice,
        maxPrice: maxPrice,
        stock: totalStock,
        status: status,
        sku: p.id.slice(0, 8).toUpperCase(),
        category: p.categories?.map((c: BackendCategory) => c.name).join(", "),
        raw: p,
      };
    });
  }, [responseData]);

  const handleEditProduct = (product: ProductRow) => {
    setEditingProduct(product);
  };

  const handleViewProduct = (product: ProductRow) => {
    setViewingProduct(product);
  };

  const handleCloseModals = () => {
    setEditingProduct(null);
    setViewingProduct(null);
  };

  const handleSaveProduct = async (updatedData: EditProductRow) => {
    // TODO: implement API save via useUpdateProduct when ready
    console.log("Saving product:", updatedData);
    handleCloseModals();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const columns: DashboardTableColumn<ProductRow>[] = [
    {
      id: "product-name",
      header: "Product Name",
      icon: Package,
      widthClassName: "w-[40%]",
      cell: (row) => <span>{row.name}</span>,
    },
    {
      id: "price",
      header: "Price",
      icon: DollarSign,
      widthClassName: "w-[15%]",
      cell: (row) => (
        <span>
          ${row.price.toFixed(2)}
          {row.maxPrice > row.price && ` - $${row.maxPrice.toFixed(2)}`}
        </span>
      ),
    },
    {
      id: "stock",
      header: "Stock",
      icon: IndentIncrease,
      widthClassName: "w-[20%]",
      cell: (row) => {
        if (row.status === "out") {
          return (
            <span className='text-[#ff4f4f] font-medium'>
              {row.stock} (Out of Stock)
            </span>
          );
        }

        if (row.status === "low") {
          return (
            <span className='text-[#f3a84d] font-medium'>
              {row.stock} (Low Stock)
            </span>
          );
        }

        return <span className='text-[#16a34a]'>{row.stock} in stock</span>;
      },
    },
    {
      id: "action",
      header: "Action",
      icon: Forward,
      widthClassName: "w-[25%]",
      cell: (row) => (
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => handleViewProduct(row)}
            className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2 py-1 text-xs font-medium text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
            <Eye className='h-3.5 w-3.5' />
            <span>View</span>
          </button>
          <button
            type='button'
            onClick={() => handleEditProduct(row)}
            className='inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-2 py-1 text-xs font-medium text-[#262626] transition-colors hover:bg-[#efefef] cursor-pointer'>
            <PencilLine className='h-3.5 w-3.5' />
            <span>Edit</span>
          </button>
          <button
            type='button'
            onClick={() => handleDeleteProduct(row.id)}
            className='inline-flex items-center gap-1 rounded-md border border-[#fca5a5] bg-red-50 px-2 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 cursor-pointer'>
            <Trash2 className='h-3.5 w-3.5' />
            <span>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  const productFilterMenu: DashboardFilterMenuConfig = {
    searchPlaceholder: "Search...",
    groups: [
      {
        id: "date-range",
        label: "Date range",
        icon: CalendarDays,
        options: [
          { id: "last-30-days", label: "Last 30 Days" },
          { id: "last-10-days", label: "Last 10 Days" },
          { id: "today", label: "Today" },
          {
            id: "custom",
            label: "Custom",
            icon: Settings2,
            keepMenuOpen: true,
            customContent: (
              <DateRangePicker
                value={customDateRange}
                onChange={setCustomDateRange}
                onApply={(range) => {
                  setCustomDateRange(range);
                  console.log("Applied date range:", range);
                }}
              />
            ),
          },
        ],
      },
      {
        id: "stock-status",
        label: "Stock Status",
        icon: IndentIncrease,
        options: [
          { id: "all", label: "All" },
          { id: "in-stock", label: "In Stock" },
          { id: "low-stock", label: "Low Stock" },
          { id: "out-of-stock", label: "Out of Stock" },
        ],
      },
      {
        id: "product-type",
        label: "Product Type",
        icon: PackageCheck,
        options: [
          { id: "all-types", label: "All Types" },
          { id: "wipes", label: "Wipes" },
          { id: "towels", label: "Towels" },
          { id: "cloths", label: "Cloths" },
        ],
      },
    ],
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading products...</div>;
  }

  return (
    <section className=''>
      <DashboardDataTable
        filterAction={{ label: "Filter", icon: ListFilter }}
        filterMenu={productFilterMenu}
        searchPlaceholder='Search Products, Status'
        data={productsData}
        columns={columns}
        getRowId={(row) => row.id}
        searchPredicate={(row, query) => {
          const text = `${row.name} ${row.price} ${row.stock} ${row.status ?? ""} ${row.sku ?? ""} ${row.category ?? ""}`;
          return text.toLowerCase().includes(query);
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        defaultPageSize={10}
      />

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          key={editingProduct.id}
          product={editingProduct} // Note: This will need refactoring in a future step to support the new payload
          onClose={handleCloseModals}
          onSave={handleSaveProduct}
          onDelete={() => handleDeleteProduct(editingProduct.id)}
        />
      )}

      {/* View Product Modal */}
      {viewingProduct && (
        <ViewProductModal
          key={`view-${viewingProduct.id}`}
          product={viewingProduct.raw}
          onClose={handleCloseModals}
        />
      )}
    </section>
  );
}
