import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CartItemList from "../../components/CartItemList";
import ExploreSolutions from "../../components/ExploreSolutions";
import CartSummary from "../../components/CartSummary";
import { useAuth } from "../../context/AuthContext";
import { fetchProducts, fetchCart, updateCart } from "../../firebase/productService";

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getCartDetails = async () => {
      if (!user?.uid) return setLoading(false);
      try {
        setLoading(true);
        let rawCartItems = await fetchCart(user.uid) || [];
        if (!Array.isArray(rawCartItems)) rawCartItems = [rawCartItems];
        if (rawCartItems.length === 0) return setCartItems([]);

        const allProducts = await fetchProducts();
        const detailedItems = rawCartItems.map((item) => {
          const matched = allProducts.find((p) => String(p.id) === String(item.productId));
          return {
            id: item.productId,
            quantity: item.quantity,
            name: matched ? matched.name : "Sản phẩm không tồn tại",
            price: matched ? Number(matched.price) : 0, // Đảm bảo số kiểu dữ liệu Number tiền Việt
            image: matched ? matched.image || "https://via.placeholder.com/150" : "https://via.placeholder.com/150",
            tags: matched ? matched.tags || [] : []
          };
        });
        setCartItems(detailedItems);
      } catch (error) {
        console.error("Lỗi lấy giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    getCartDetails();
  }, [user]);

  const syncCartWithFirebase = async (updatedItems) => {
    const rawToSync = updatedItems.map(item => ({ productId: item.id, quantity: item.quantity }));
    try {
      await updateCart(user.uid, rawToSync);
    } catch (e) {
      console.error("Lỗi đồng bộ Firebase:", e);
    }
  };

  const handleUpdateQuantity = (productId, amount) => {
    const updated = cartItems.map(item => item.id === productId 
      ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item);
    setCartItems(updated);
    syncCartWithFirebase(updated);
  };

  const handleRemoveItem = (productId) => {
    const updated = cartItems.filter(item => item.id !== productId);
    setCartItems(updated);
    syncCartWithFirebase(updated);
  };

  // Tính tổng tiền theo mệnh giá VND
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return alert("Giỏ hàng của bạn đang trống!");
    navigate("/checkout", { state: { items: cartItems, subtotal } });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#fafbfa] flex items-center justify-center font-bold">
      <div className="animate-pulse text-[#1a3a2f]">Đang đồng bộ giỏ hàng từ hệ thống...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafbfa] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-12 flex flex-col gap-2">
        <div className="mb-6">
          <h2 className="text-4xl font-extrabold text-[#1a3a2f]">Your Wellness Cart</h2>
          <p className="text-gray-500 text-sm mt-1.5">Precision supplements tailored to your biological data.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* 💡 Lưu ý: Bên trong CartItemList.jsx, bạn nhớ sửa hiển thị giá tiền từ thành {item.price.toLocaleString('vi-VN')} đ */}
            <CartItemList items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
            <ExploreSolutions />
          </div>
          <div className="lg:col-span-1">
            <CartSummary subtotal={subtotal} onProceed={handleProceedToCheckout} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;