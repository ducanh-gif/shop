/**
 * ============================================================
 * File: firebase.js - Cấu hình và khởi tạo Firebase
 * ============================================================
 *
 * Mục đích:
 *   - Khởi tạo Firebase App (kết nối ứng dụng React với Firebase Project).
 *   - Export các Firebase services cần dùng: Auth, Firestore, Storage...
 *   - File này là "trung tâm" để mọi component trong app truy cập Firebase.
 *
 * Cách sử dụng:
 *   Trong bất kỳ component nào cần dùng Firebase:
 *     import { auth, db } from "../firebase/firebase";
 *
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  ⚠️  QUAN TRỌNG: Thay thế firebaseConfig bên dưới          ║
 * ║      bằng config từ Firebase Console của bạn!               ║
 * ║                                                              ║
 * ║  Các bước lấy config:                                       ║
 * ║  1. Truy cập: https://console.firebase.google.com           ║
 * ║  2. Chọn project (hoặc tạo project mới)                    ║
 * ║  3. Vào Project Settings (⚙️ biểu tượng gear)               ║
 * ║  4. Kéo xuống phần "Your apps" → chọn Web app (</>)         ║
 * ║  5. Copy firebaseConfig object                               ║
 * ║  6. Paste vào đây thay thế config mẫu bên dưới             ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Kiến trúc Firebase trong React:
 *
 *   ┌─────────────┐     import      ┌──────────────────┐
 *   │  Component   │ ──────────────→ │  firebase.js      │
 *   │  (Login.jsx) │                 │  (file này)       │
 *   └─────────────┘                 └────────┬─────────┘
 *                                             │
 *                                    initializeApp()
 *                                             │
 *                                    ┌────────▼─────────┐
 *                                    │  Firebase Cloud   │
 *                                    │  (Google Server)  │
 *                                    └──────────────────┘
 * ============================================================
 */

// ══════════════════════════════════════════
// IMPORT Firebase SDK modules
// ══════════════════════════════════════════

/**
 * initializeApp:
 *   - Hàm khởi tạo Firebase App.
 *   - Nhận vào object config chứa thông tin project.
 *   - Trả về Firebase App instance (đại diện cho kết nối tới Firebase).
 *   - CHỈ GỌI MỘT LẦN trong toàn bộ ứng dụng.
 */
import { initializeApp } from "firebase/app";

/**
 * getAuth:
 *   - Lấy Firebase Authentication service instance.
 *   - Cung cấp các phương thức:
 *     + signInWithEmailAndPassword()  → Đăng nhập bằng email/password
 *     + createUserWithEmailAndPassword() → Đăng ký tài khoản mới
 *     + signOut()                     → Đăng xuất
 *     + onAuthStateChanged()          → Lắng nghe thay đổi trạng thái đăng nhập
 *     + signInWithPopup()             → Đăng nhập bằng Google/Facebook popup
 */
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/**
 * GoogleAuthProvider:
 *   - Provider (nhà cung cấp) cho phương thức đăng nhập bằng Google.
 *   - Tạo instance của GoogleAuthProvider để dùng với signInWithPopup().
 *   - Khi user đăng nhập bằng Google:
 *     1. Hiện popup chọn tài khoản Google
 *     2. User chọn tài khoản → Google xác thực
 *     3. Firebase nhận token từ Google → tạo/liên kết tài khoản Firebase
 *     4. onAuthStateChanged tự động cập nhật user state
 *   - User sẽ có displayName, email, photoURL từ Google Account.
 */

/**
 * getFirestore:
 *   - Lấy Cloud Firestore service instance (NoSQL Database).
 *   - Cung cấp các phương thức:
 *     + collection(), doc()     → Truy cập collection/document
 *     + addDoc(), setDoc()      → Thêm/cập nhật dữ liệu
 *     + getDoc(), getDocs()     → Đọc dữ liệu
 *     + deleteDoc()             → Xóa dữ liệu
 *     + onSnapshot()            → Lắng nghe thay đổi realtime
 *     + query(), where()        → Truy vấn có điều kiện
 */
import { getFirestore } from "firebase/firestore";


// ══════════════════════════════════════════
// FIREBASE CONFIGURATION
// ══════════════════════════════════════════

/**
 * firebaseConfig - Object cấu hình Firebase
 *
 * Các trường (fields) quan trọng:
 *
 *   apiKey:            Khóa API để xác thực request từ app.
 *                      ⚠️ KHÔNG phải secret key! Khóa này an toàn khi expose
 *                      ở client vì Firebase dùng Security Rules để bảo vệ data.
 *
 *   authDomain:        Domain dùng cho Firebase Authentication.
 *                      Firebase tự tạo domain này khi bạn tạo project.
 *
 *   projectId:         ID duy nhất của Firebase project.
 *                      Dùng để xác định project nào trên Firebase.
 *
 *   storageBucket:     URL của Cloud Storage bucket.
 *                      Nơi lưu trữ file (ảnh, video...) trên Firebase.
 *
 *   messagingSenderId: ID cho Firebase Cloud Messaging (push notifications).
 *                      Dùng khi muốn gửi thông báo đẩy.
 *
 *   appId:             ID duy nhất của web app trong Firebase project.
 *                      Một project có thể có nhiều app (web, iOS, Android).
 *
 *   measurementId:     ID cho Google Analytics (tùy chọn).
 *                      Dùng để theo dõi hành vi người dùng.
 */
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: "G-8295HNG4MX"
    // measurementId: "YOUR_MEASUREMENT_ID"  // (Tùy chọn) Chỉ cần nếu dùng Analytics
};

// ══════════════════════════════════════════
// KHỞI TẠO FIREBASE
// ══════════════════════════════════════════

/**
 * Bước 1: Khởi tạo Firebase App
 *
 * initializeApp() nhận config và trả về Firebase App instance.
 * Instance này là "cầu nối" giữa React app và Firebase Cloud.
 * Chỉ gọi MỘT LẦN → sử dụng lại qua biến `app`.
 */
const app = initializeApp(firebaseConfig);

/**
 * Bước 2: Khởi tạo các Firebase Services
 *
 * Mỗi service (Auth, Firestore, Storage) cần được khởi tạo
 * từ Firebase App instance bằng hàm getter tương ứng.
 */

// ── Authentication Service ──
// Quản lý đăng nhập, đăng ký, đăng xuất, quản lý phiên (session)
const auth = getAuth(app);

// ── Google Auth Provider ──
// Tạo instance GoogleAuthProvider để dùng khi đăng nhập bằng Google.
// Có thể tùy chỉnh thêm scope (quyền truy cập) nếu cần:
//   googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// Hoặc chỉ định ngôn ngữ hiển thị popup:
//   auth.languageCode = 'vi';  // Hiển thị popup bằng tiếng Việt
const googleProvider = new GoogleAuthProvider();

// ── Firestore Database Service ──
// Database NoSQL theo cấu trúc: Collection → Document → Fields
// Ví dụ: users (collection) → userId123 (document) → { name, email } (fields)
const db = getFirestore(app);


export { auth, db, googleProvider };