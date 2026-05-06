import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsOfRestaurant, updateStockOfIngredient, getIngredientCategory } from "../../component/State/Ingredients/Action";
import { Modal, Box } from "@mui/material";
import CreateIngredientForm from "./CreateIngredientForm";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1a1a1a",
  color: "white",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  outline: "none",
};

export const Ingredients = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients: ingredientsState } = useSelector((store) => store);

  const [activeTab, setActiveTab] = useState("ingredients");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 8;

  // Modals state
  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant.id }));
      dispatch(getIngredientCategory({ jwt, id: restaurant.usersRestaurant.id }));
    }
  }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

  // Handle Tab Switch
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleUpdateStock = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };

  const getIngredientCountForCategory = (categoryName) => {
    if (!ingredientsState.ingredients) return 0;
    return ingredientsState.ingredients.filter(ing => ing.category?.name === categoryName).length;
  };

  // Filter Data
  const filteredData = useMemo(() => {
    if (activeTab === "ingredients") {
      const data = ingredientsState.ingredients || [];
      if (!searchQuery) return data;
      return data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      const data = ingredientsState.category || [];
      if (!searchQuery) return data;
      return data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }, [activeTab, searchQuery, ingredientsState]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Icons
  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8892B0]">
      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  );
  const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  return (
    <div className="p-4 md:p-8 min-h-[90vh] text-[#F1F5F9]" style={{ backgroundColor: '#1A1D27' }}>
      
      {/* Panel Container */}
      <div 
        className="w-full mx-auto p-4 sm:p-6"
        style={{
          borderRadius: '16px',
          backgroundColor: '#1A1D27',
          border: '1px solid #2E3250',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
        }}
      >
        
        {/* Header / Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 border-b" style={{ borderColor: '#2E3250' }}>
          <div className="flex space-x-6 text-[14px] font-medium mt-2">
            <button
              onClick={() => handleTabSwitch("ingredients")}
              className={`pb-3 transition-colors relative`}
              style={{
                color: activeTab === "ingredients" ? '#6C63FF' : '#8892B0'
              }}
            >
              🧂 Ingredients
              {activeTab === "ingredients" && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#6C63FF]" />
              )}
            </button>
            <button
              onClick={() => handleTabSwitch("categories")}
              className={`pb-3 transition-colors relative`}
              style={{
                color: activeTab === "categories" ? '#6C63FF' : '#8892B0'
              }}
            >
              🗂 Categories
              {activeTab === "categories" && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#6C63FF]" />
              )}
            </button>
          </div>

          <button 
            onClick={() => activeTab === "ingredients" ? setOpenIngredientModal(true) : setOpenCategoryModal(true)}
            className="mb-3 sm:mb-2 px-4 py-1.5 text-sm font-medium rounded-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#6C63FF', color: '#F1F5F9' }}
          >
            {activeTab === "ingredients" ? "+ Add Ingredient" : "+ Add Category"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg focus:outline-none transition-all"
            style={{
              backgroundColor: '#22263A',
              border: '1px solid #2E3250',
              color: '#F1F5F9'
            }}
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Table Area */}
        {filteredData.length === 0 ? (
          <div className="py-12 text-center text-sm" style={{ color: '#8892B0' }}>
            No results found for "{searchQuery}"
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b" style={{ borderColor: '#2E3250', backgroundColor: '#22263A' }}>
                  <th className="py-3 px-4 text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: '#8892B0' }}>ID</th>
                  <th className="py-3 px-4 text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: '#8892B0' }}>Name</th>
                  
                  {activeTab === "ingredients" ? (
                    <>
                      <th className="py-3 px-4 text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: '#8892B0' }}>Category</th>
                      <th className="py-3 px-4 text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: '#8892B0' }}>Availability</th>
                    </>
                  ) : (
                    <th className="py-3 px-4 text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: '#8892B0' }}>Ingredient Count</th>
                  )}
                  
                  <th className="py-3 px-4 text-[11px] uppercase tracking-[0.08em] font-medium text-right" style={{ color: '#8892B0' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row) => (
                  <tr 
                    key={row.id} 
                    className="border-b transition-all group relative cursor-default"
                    style={{ 
                      borderColor: '#2E3250', 
                      backgroundColor: '#1A1D27' 
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#22263A';
                      e.currentTarget.style.boxShadow = 'inset 2px 0 0 0 #6C63FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1A1D27';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <td className="py-3 px-4 text-[13px] font-mono" style={{ color: '#8892B0' }}>
                      {row.id}
                    </td>
                    <td className="py-3 px-4 text-[14px] font-semibold">
                      <div className="flex items-center gap-2">
                        {row.name}
                      </div>
                    </td>

                    {activeTab === "ingredients" ? (
                      <>
                        <td className="py-3 px-4 text-sm">
                          <span 
                            className="inline-flex items-center px-2 py-1 rounded-full text-[12px] font-medium"
                            style={{ backgroundColor: '#22263A', border: '1px solid #2E3250', color: '#8892B0' }}
                          >
                            {row.category?.name}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => handleUpdateStock(row.id)}
                            className="focus:outline-none hover:opacity-80 transition-opacity"
                          >
                            {row.inStock ? (
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '3px 10px', borderRadius: '999px', fontSize: '12px',
                                fontWeight: 500, background: 'rgba(34,197,94,0.12)',
                                color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)'
                              }}>
                                <span style={{ minWidth: '6px', width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
                                In Stock
                              </span>
                            ) : (
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '3px 10px', borderRadius: '999px', fontSize: '12px',
                                fontWeight: 500, background: 'rgba(239,68,68,0.12)',
                                color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)'
                              }}>
                                <span style={{ minWidth: '6px', width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />
                                Out of Stock
                              </span>
                            )}
                          </button>
                        </td>
                      </>
                    ) : (
                      <td className="py-3 px-4 text-[#F1F5F9]">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-[12px] font-medium"
                          style={{ backgroundColor: '#22263A', border: '1px solid #2E3250' }}
                        >
                          {getIngredientCountForCategory(row.name)} items
                        </span>
                      </td>
                    )}

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-md hover:bg-[#2E3250] text-[#8892B0] hover:text-[#6C63FF] transition-colors">
                          <EditIcon />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-[rgba(239,68,68,0.1)] text-[#8892B0] hover:text-[#EF4444] transition-colors">
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t text-sm" style={{ borderColor: '#2E3250', color: '#8892B0' }}>
            <div className="mb-4 sm:mb-0">
              Showing {((currentPage - 1) * ROWS_PER_PAGE) + 1} to {Math.min(currentPage * ROWS_PER_PAGE, filteredData.length)} of {filteredData.length} items
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ borderColor: '#2E3250', color: '#F1F5F9', backgroundColor: currentPage === 1 ? 'transparent' : '#22263A' }}
              >
                Prev
              </button>
              <div className="flex items-center px-4 font-medium" style={{ color: '#F1F5F9' }}>
                {currentPage} / {totalPages}
              </div>
              <button 
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ borderColor: '#2E3250', color: '#F1F5F9', backgroundColor: currentPage === totalPages ? 'transparent' : '#22263A' }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals for Create Forms */}
      <Modal open={openIngredientModal} onClose={() => setOpenIngredientModal(false)}>
        <Box sx={modalStyle}>
          <CreateIngredientForm />
        </Box>
      </Modal>

      <Modal open={openCategoryModal} onClose={() => setOpenCategoryModal(false)}>
        <Box sx={modalStyle}>
          <CreateIngredientCategoryForm />
        </Box>
      </Modal>

    </div>
  );
};

