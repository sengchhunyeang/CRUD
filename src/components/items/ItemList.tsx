"use client";

import Link from "next/link";
import { useState } from "react";
import { useItems } from "@/hooks/useItems";
import { itemService } from "@/services/item.service";

export function ItemList() {
  const { items, loading, error, refresh } = useItems();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  if (loading) return (
    <div className="flex justify-center items-center py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="rounded-2xl bg-red-50 p-5 text-red-600 shadow-sm border border-red-100 flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span className="font-medium">{error}</span>
    </div>
  );
  
  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50/50 py-20 text-center shadow-sm transition-all hover:bg-gray-50">
      <div className="rounded-full bg-white p-4 shadow-sm mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">No items found</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm">Get started by creating a new item. Your items will appear here once you've added them.</p>
      <Link href="/items/new" className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Add your first item
      </Link>
    </div>
  );

  // Pagination logic
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  
  // Ensure currentPage is valid after a deletion might reduce totalPages
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  if (validCurrentPage !== currentPage) {
    setCurrentPage(validCurrentPage);
  }

  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/75 bg-white shadow-xl shadow-gray-200/30">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200/75">
          <tr>
            <th className="px-6 py-5">Name</th>
            <th className="px-6 py-5 hidden sm:table-cell">Description</th>
            <th className="px-6 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedItems.map((item) => (
            <tr key={item.id} className="group hover:bg-indigo-50/40 transition-colors duration-200">
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="font-bold text-gray-900 text-base">{item.name}</div>
                <div className="text-xs text-gray-500 mt-1 sm:hidden">{item.description}</div>
              </td>
              <td className="px-6 py-5 hidden sm:table-cell max-w-xs truncate text-gray-500 font-medium">
                {item.description}
              </td>
              <td className="px-6 py-5 text-right whitespace-nowrap">
                <div className="flex justify-end gap-3 opacity-100">
                  <Link
                    href={`/items/${item.id}/edit`}
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this item?')) {
                        await itemService.remove(item.id);
                        refresh();
                      }
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-transparent bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200/75 bg-gray-50/50 px-6 py-3">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={validCurrentPage === 1}
              className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={validCurrentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, items.length)}</span> of <span className="font-medium">{items.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={validCurrentPage === 1}
                  className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 transition-colors ${
                      validCurrentPage === page
                        ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={validCurrentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
