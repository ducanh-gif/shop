import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { checkPaymentStatus } from "../../firebase/zalopayService";
import { updateCart } from "../../firebase/productService"; // ✅ Import hàm updateCart để xóa giỏ hàng
import { useAuth } from "../../context/AuthContext"; // ✅ Import useAuth để lấy uid của user
import { Home, ShoppingBag } from "lucide-react";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Lấy thông tin user hiện tại
  
  const [status, setStatus] = useState(null); 
  const [loading, setLoading] = useState(true);

  const appTransId = searchParams.get("apptransid");

  useEffect(() => {
    const getStatusAndClearCart = async () => {
      if (!appTransId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 1. Gọi API kiểm tra trạng thái từ ZaloPay
        const result = await checkPaymentStatus(appTransId);
        
        if (result && result.return_code) {
          const paymentStatus = result.return_code;
          setStatus(paymentStatus);

          // 2. LÝ XỬ LÝ CHÍNH: Nếu thanh toán thành công và user đã đăng nhập
          if (paymentStatus === 1 && user?.uid) {
            try {
              // Xóa sạch giỏ hàng trên Firebase bằng cách truyền mảng rỗng []
              await updateCart(user.uid, []);
              console.log("Đã dọn dẹp giỏ hàng thành công sau khi thanh toán!");
            } catch (cartError) {
              console.error("Lỗi khi xóa giỏ hàng:", cartError);
            }
          }
        } else {
          setStatus(2); 
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái thanh toán:", error);
        setStatus(2); 
      } finally {
        setLoading(false); 
      }
    };

    // Chỉ thực hiện chạy khi user đã được định danh xong (tránh user đang null lúc khởi tạo)
    if (user !== undefined) {
      getStatusAndClearCart();
    }
  }, [appTransId, user]); // ✅ Thêm user vào dependency array để theo dõi dữ liệu người dùng

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbfa]">
        <h1 className="text-xl font-bold text-[#1a3a2f] animate-pulse">
          Đang kiểm tra kết quả và đồng bộ hệ thống...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbfa] p-6 text-center font-sans">
      <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm max-w-md w-full flex flex-col items-center gap-5">
        
        {status === 1 && (
          <>
            <div className="text-6xl">✅</div>
            <h1 className="text-2xl font-black text-emerald-600 tracking-tight">Thanh toán thành công</h1>
            <p className="text-gray-500 text-sm">Đơn hàng đã được ghi nhận và giỏ hàng của bạn đã được làm trống.</p>
          </>
        )}

        {status === 2 && (
          <>
            <div className="text-6xl">❌</div>
            <h1 className="text-2xl font-black text-red-600 tracking-tight">Thanh toán thất bại</h1>
            <p className="text-gray-500 text-sm">Giao dịch không thành công. Các mặt hàng vẫn được giữ nguyên trong giỏ.</p>
          </>
        )}

        {status === 3 && (
          <>
            <div className="text-6xl">⏳</div>
            <h1 className="text-2xl font-black text-amber-500 tracking-tight">Đang xử lý giao dịch</h1>
            <p className="text-gray-500 text-sm">Hệ thống đang chờ xác nhận cuối cùng từ ví ZaloPay.</p>
          </>
        )}

        {!status && (
          <>
            <div className="text-6xl">❓</div>
            <h1 className="text-2xl font-black text-gray-600 tracking-tight">Không tìm thấy thông tin</h1>
            <p className="text-gray-500 text-sm">Không tìm thấy mã giao dịch hợp lệ.</p>
          </>
        )}

        <div className="w-full flex flex-col sm:flex-row gap-3 mt-4 border-t border-gray-100 pt-5">
          <button 
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm py-3 px-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Trang chủ
          </button>

          <button 
            onClick={() => navigate("/shop")}
            className="flex-1 bg-[#008b66] hover:bg-[#007556] text-white font-bold text-sm py-3 px-4 rounded-xl transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Mua sắm tiếp
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentResult;