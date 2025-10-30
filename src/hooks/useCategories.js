import { useState, useEffect, useCallback } from "react";
import categoryService from "@/services/api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to load categories");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoryById = useCallback((id) => {
    return categories.find(category => category.id === id);
  }, [categories]);

  const getCategoryColor = useCallback((categoryId) => {
    const category = getCategoryById(categoryId);
    return category ? category.color : "#6b7280";
  }, [getCategoryById]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const retryLoad = useCallback(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    getCategoryById,
    getCategoryColor,
    retryLoad
  };
};