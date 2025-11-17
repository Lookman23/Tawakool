import { supabase } from '@/config/supabase';
import { mockProducts, mockCategories, getProductById as getMockProductById, getRelatedProducts as getMockRelatedProducts } from '@/lib/mockData';

const USE_MOCK_DATA = true; // Switch to false when Supabase is connected

// --- Products ---
export const getProducts = async (filters = {}) => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ data: mockProducts, error: null }), 500));
  }
  // ... Supabase logic
};

export const getProductById = async (id) => {
  if (USE_MOCK_DATA) {
    const product = getMockProductById(id);
    return new Promise(resolve => setTimeout(() => resolve({ data: product, error: product ? null : 'Not Found' }), 300));
  }
  // ... Supabase logic
};

export const getRelatedProducts = async (currentProductId, category) => {
    if (USE_MOCK_DATA) {
        const products = getMockRelatedProducts(currentProductId, category);
        return new Promise(resolve => setTimeout(() => resolve({ data: products, error: null }), 300));
    }
    // ... Supabase logic
}

// --- Categories ---
export const getCategories = async () => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => setTimeout(() => resolve({ data: mockCategories, error: null }), 200));
  }
  // ... Supabase logic
};

// --- Orders ---
export const createOrder = async (orderData) => {
  if (USE_MOCK_DATA) {
    console.log('Mock Order Created:', orderData);
    const orderId = `MOH-${Math.floor(Math.random() * 90000) + 10000}`;
    return new Promise(resolve => setTimeout(() => resolve({ data: [{ id: orderId }], error: null }), 1000));
  }
  // ... Supabase logic
};

// --- Promo Codes ---
export const validatePromoCode = async (code) => {
    if (USE_MOCK_DATA) {
        if (code.toUpperCase() === 'PROMO10') {
            return new Promise(resolve => setTimeout(() => resolve({ data: { valid: true, discount_percent: 10 }, error: null }), 500));
        }
        return new Promise(resolve => setTimeout(() => resolve({ data: { valid: false }, error: 'Code promo invalide' }), 500));
    }
    // ... Supabase logic
}

// --- Reviews ---
export const createReview = async (reviewData) => {
    if (USE_MOCK_DATA) {
        console.log('Mock Review Created:', reviewData);
        return new Promise(resolve => setTimeout(() => resolve({ data: { ...reviewData, id: Date.now() }, error: null }), 500));
    }
    // ... Supabase logic
}