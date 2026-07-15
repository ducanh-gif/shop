/**
 * ============================================================
 * Context: AuthContext — Quản lý Authentication bằng Firebase
 * ============================================================
 *
 * Mục đích:
 *   - Quản lý trạng thái đăng nhập/đăng xuất TOÀN CỤC cho ứng dụng.
 *   - Sử dụng Firebase Authentication thay vì giả lập (fake data).
 *   - Lấy và lưu trữ ID Token (JWT) từ Firebase để xác thực API.
 *
 * Firebase Auth so với cách cũ (localStorage):
 *
 *   ┌─────────────────────┬──────────────────────────────────────┐
 *   │   CŨ (localStorage) │   MỚI (Firebase Auth)                │
 *   ├─────────────────────┼──────────────────────────────────────┤
 *   │ Fake data, hardcode │ Xác thực thật qua Firebase server    │
 *   │ Lưu user vào        │ Firebase tự quản lý session          │
 *   │   localStorage      │   (IndexedDB + cookie)               │
 *   │ Token giả ("fake-") │ JWT Token thật, có thể verify        │
 *   │ Không bảo mật       │ Bảo mật cao, được Google quản lý     │
 *   │ Tự kiểm tra email/  │ Firebase kiểm tra + hash password    │
 *   │   password          │   an toàn trên server                │
 *   └─────────────────────┴──────────────────────────────────────┘
 *
 * ID Token (JWT) là gì?
 *   - JWT = JSON Web Token, một chuỗi mã hóa chứa thông tin user.
 *   - Firebase cấp cho mỗi user sau khi đăng nhập thành công.
 *   - Token có thời hạn ~1 giờ, sau đó Firebase tự động refresh.
 *   - Dùng để gửi kèm request đến backend API (Authorization header).
 *   - Backend có thể verify token này với Firebase Admin SDK.
 *
 *   Ví dụ sử dụng token khi gọi API:
 *     fetch("/api/data", {
 *       headers: { Authorization: `Bearer ${token}` }
 *     })
 *
 * Các giá trị cung cấp qua context:
 *   - user:     Object user Firebase (hoặc null nếu chưa login)
 *   - token:    ID Token JWT (string) dùng để xác thực API
 *   - loading:  Boolean - đang kiểm tra trạng thái auth ban đầu
 *   - login:    Hàm đăng nhập bằng email/password
 *   - register: Hàm đăng ký tài khoản mới
 *   - logout:   Hàm đăng xuất
 * ============================================================
 */

import { createContext, useContext, useState, useEffect } from "react";

// ── Import Firebase Auth functions ──
// Mỗi function có một nhiệm vụ cụ thể:
import {
    signInWithEmailAndPassword,
    // → Đăng nhập bằng email + password
    // → Trả về UserCredential chứa thông tin user
    // → Throw error nếu sai email/password

    createUserWithEmailAndPassword,
    // → Tạo tài khoản mới bằng email + password
    // → Firebase tự hash password trước khi lưu (an toàn)
    // → Throw error nếu email đã tồn tại hoặc password yếu

    signOut,
    // → Đăng xuất user hiện tại
    // → Xóa session khỏi Firebase (IndexedDB + cookie)
    // → Trigger onAuthStateChanged với user = null

    onAuthStateChanged,
    // → Listener theo dõi thay đổi trạng thái đăng nhập
    // → Được gọi khi: đăng nhập, đăng xuất, token refresh, mở lại tab
    // → Là cách CHÍNH XÁC NHẤT để biết user đang login hay không
    // → Trả về hàm unsubscribe để hủy listener

    updateProfile,
    // → Cập nhật thông tin profile (displayName, photoURL)
    // → Dùng sau khi register để gắn tên người dùng vào account

    signInWithPopup,
    // → Đăng nhập bằng nhà cung cấp bên ngoài (Google, Facebook, GitHub...)
    // → Mở popup để user chọn tài khoản và xác thực
    // → Trả về UserCredential chứa thông tin user từ Google
    // → Firebase tự động tạo tài khoản nếu lần đầu đăng nhập
    //    hoặc liên kết với tài khoản cũ nếu email đã tồn tại
} from "firebase/auth";

// ── Import Firebase Auth instance và Google Provider ──
// `auth` đã được khởi tạo trong firebase.js bằng getAuth(app)
// `googleProvider` là instance của GoogleAuthProvider, dùng cho signInWithPopup()
import { auth, googleProvider } from "../firebase/firebase";

// ══════════════════════════════════════════
// TẠO CONTEXT
// ══════════════════════════════════════════

/**
 * createContext() tạo một "kênh truyền dữ liệu" xuyên suốt component tree.
 * Thay vì truyền props qua từng tầng (prop drilling), context cho phép
 * bất kỳ component con nào cũng truy cập được dữ liệu auth.
 *
 * Giá trị mặc định là null (sẽ được cung cấp bởi AuthProvider).
 */
const AuthContext = createContext(null);

// ══════════════════════════════════════════
// AUTH PROVIDER - Component cung cấp auth state
// ══════════════════════════════════════════

/**
 * AuthProvider - Bọc toàn bộ ứng dụng, cung cấp authentication state.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Các component con (toàn bộ app)
 *
 * Vị trí trong component tree:
 *   <BrowserRouter>          ← main.jsx
 *     <AuthProvider>         ← App.jsx (component này)
 *       <Routes>
 *         <Route ... />
 *       </Routes>
 *     </AuthProvider>
 *   </BrowserRouter>
 */
export const AuthProvider = ({ children }) => {
    // ══════════════════════════════════════════
    // STATE
    // ══════════════════════════════════════════

    /**
     * user: Object chứa thông tin Firebase User
     *
     * Khi CHƯA đăng nhập: null
     * Khi ĐÃ đăng nhập:  Firebase User object chứa:
     *   {
     *     uid:          "abc123...",         // ID duy nhất của user (Firebase tạo)
     *     email:        "user@gmail.com",   // Email đăng ký
     *     displayName:  "Nguyễn Văn A",     // Tên hiển thị (set bằng updateProfile)
     *     photoURL:     "https://...",      // URL ảnh đại diện
     *     emailVerified: true/false,        // Email đã xác thực chưa
     *     metadata: {
     *       creationTime:    "...",          // Thời gian tạo tài khoản
     *       lastSignInTime:  "...",          // Lần đăng nhập cuối
     *     },
     *     // ... và nhiều properties khác
     *   }
     */
    const [user, setUser] = useState(null);

    /**
     * token: ID Token (JWT) từ Firebase
     *
     * Đây là chuỗi JWT dài (~800-1200 ký tự) dùng để:
     *   1. Gửi kèm request đến backend API (Authorization header)
     *   2. Backend verify token bằng Firebase Admin SDK
     *   3. Xác định user nào đang gọi API
     *
     * Token tự động refresh sau ~1 giờ.
     * Giá trị null khi chưa đăng nhập.
     */
    const [token, setToken] = useState(null);

    /**
     * loading: Trạng thái đang kiểm tra auth ban đầu
     *
     * Khi app mới mở, Firebase cần thời gian (~100-500ms) để:
     *   1. Kiểm tra IndexedDB xem có session cũ không
     *   2. Verify session với Firebase server
     *   3. Trả về user object (hoặc null)
     *
     * Trong thời gian này, loading = true → KHÔNG render children
     * → Tránh flash (nhấp nháy) giữa trạng thái login/logout
     *
     * Ví dụ nếu KHÔNG có loading:
     *   App mở → user=null → hiện Login → Firebase verify xong → user=object → hiện Dashboard
     *   → User thấy trang Login nhấp nháy 1 giây rồi mới vào Dashboard (UX tệ)
     */
    const [loading, setLoading] = useState(true);

    // ══════════════════════════════════════════
    // EFFECT: Lắng nghe trạng thái đăng nhập
    // ══════════════════════════════════════════

    /**
     * useEffect + onAuthStateChanged
     *
     * Đây là TRÁI TIM của authentication flow.
     * onAuthStateChanged là listener (bộ lắng nghe) của Firebase,
     * được gọi NGAY LẬP TỨC khi:
     *
     *   1. App mới mở      → Firebase kiểm tra session → callback(user hoặc null)
     *   2. User đăng nhập   → callback(user)
     *   3. User đăng xuất   → callback(null)
     *   4. Token refresh     → callback(user) với token mới
     *
     * Tại sao dùng onAuthStateChanged thay vì tự quản lý?
     *   - Firebase QUẢN LÝ SESSION TỰ ĐỘNG (IndexedDB, cookie)
     *   - Không cần localStorage nữa!
     *   - Token tự refresh khi hết hạn
     *   - Hoạt động đúng khi mở nhiều tab
     *   - Đồng bộ trạng thái auth giữa các component
     *
     * QUAN TRỌNG: Hàm unsubscribe
     *   onAuthStateChanged trả về hàm unsubscribe.
     *   Khi component unmount (bị xóa khỏi DOM), React gọi cleanup function
     *   → unsubscribe() → hủy listener → tránh memory leak.
     *
     * Dependency array []:
     *   Mảng rỗng = chỉ chạy MỘT LẦN khi component mount (tương tự componentDidMount).
     *   Listener sẽ tồn tại suốt vòng đời của app.
     */
    useEffect(() => {
        // ── Đăng ký listener theo dõi auth state ──
        // `firebaseUser` là user object từ Firebase (hoặc null)
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // ── User ĐÃ đăng nhập ──

                /**
                 * getIdToken(): Lấy JWT Token từ Firebase
                 *
                 * - Đây là async function (trả về Promise)
                 * - Token có dạng: "eyJhbGciOiJSUzI1NiIs..." (chuỗi dài ~1000 ký tự)
                 * - Token chứa: uid, email, exp (hết hạn), iat (thời gian tạo)
                 * - Tham số `true` = force refresh token mới
                 *   (không truyền tham số = dùng cached token nếu còn hạn)
                 *
                 * Cấu trúc JWT Token (3 phần ngăn cách bởi dấu chấm):
                 *   Header.Payload.Signature
                 *   - Header:    Thuật toán mã hóa (RS256)
                 *   - Payload:   Dữ liệu user (uid, email, exp...)
                 *   - Signature: Chữ ký số để verify tính toàn vẹn
                 */
                const idToken = await firebaseUser.getIdToken();
                console.log("✅ User đăng nhập:", firebaseUser.uid);
                // Lưu user và token vào state
                setUser(firebaseUser);
                setToken(idToken);

                // Log token ra console để debug (có thể xóa trong production)
                console.log("🔑 Firebase ID Token:", idToken);
            } else {
                // ── User CHƯA đăng nhập (hoặc vừa đăng xuất) ──
                setUser(null);
                setToken(null);
            }

            // ── Tắt loading sau khi kiểm tra xong ──
            // Dù user login hay chưa, loading đều = false
            // → App sẵn sàng render giao diện
            setLoading(false);
        });

        // ── Cleanup function ──
        // React gọi hàm này khi AuthProvider bị unmount
        // → Hủy listener để tránh memory leak
        return () => unsubscribe();
    }, []); // [] = chạy 1 lần khi mount

    // ══════════════════════════════════════════
    // AUTHENTICATION FUNCTIONS
    // ══════════════════════════════════════════

    /**
     * login - Đăng nhập bằng email và password qua Firebase
     *
     *@param {string} email    - Email đã đăng ký
     * @param {string} password - Mật khẩu
     * @returns {Object} { success: true } hoặc { error: "..." }
     *
     * Luồng hoạt động:
     *   1. Gọi signInWithEmailAndPassword(auth, email, password)
     *   2. Firebase gửi request đến server để xác thực
     *   3. Nếu đúng → trả về UserCredential → onAuthStateChanged tự cập nhật state
     *   4. Nếu sai → throw error → catch và trả về thông báo lỗi
     *
     * LƯU Ý QUAN TRỌNG:
     *   Không cần gọi setUser() ở đây!
     *   Khi đăng nhập thành công, onAuthStateChanged sẽ TỰ ĐỘNG được trigger
     *   → callback function sẽ cập nhật user và token.
     *   Đây là lý do tại sao onAuthStateChanged là "trái tim" của auth flow.
     *
     * Các mã lỗi Firebase Authentication phổ biến:
     *   - auth/user-not-found:      Email chưa đăng ký
     *   - auth/wrong-password:      Sai mật khẩu
     *   - auth/invalid-email:       Email không đúng format
     *   - auth/user-disabled:       Tài khoản bị vô hiệu hóa
     *   - auth/too-many-requests:   Quá nhiều lần thử → bị khóa tạm
     *   - auth/invalid-credential:  Thông tin xác thực không hợp lệ
     */
    const login = async (email, password) => {
        try {
            // ── Gửi request đăng nhập đến Firebase server ──
            // signInWithEmailAndPassword là async function
            // Trả về UserCredential object chứa:
            //   - user: Firebase User object
            //   - providerId: "password" (vì dùng email/password)
            //   - operationType: "signIn"
            await signInWithEmailAndPassword(auth, email, password);

            // Đăng nhập thành công
            // KHÔNG cần setUser() → onAuthStateChanged sẽ tự cập nhật
            return { success: true };
        } catch (error) {
            // ── Xử lý lỗi ──
            // `error.code` chứa mã lỗi Firebase (ví dụ: "auth/wrong-password")
            // Dùng getFirebaseErrorMessage() để chuyển mã lỗi thành tiếng Việt
            console.error("❌ Lỗi đăng nhập:", error.code, error.message);
            return { error: getFirebaseErrorMessage(error.code) };
        }
    };

    /**
     * register - Đăng ký tài khoản mới qua Firebase
     *
     * @param {string} username - Tên hiển thị của user
     * @param {string} email    - Email đăng ký (phải là email chưa dùng)
     * @param {string} password - Mật khẩu (Firebase yêu cầu tối thiểu 6 ký tự)
     * @returns {Object} { success: true } hoặc { error: "..." }
     *
     * Luồng hoạt động:
     *   1. createUserWithEmailAndPassword() → Tạo account trên Firebase
     *   2. updateProfile() → Gắn displayName vào account
     *   3. onAuthStateChanged tự cập nhật state
     *
     * Tại sao cần updateProfile()?
     *   - createUserWithEmailAndPassword chỉ tạo account với email + password
     *   - displayName mặc định là null
     *   - Cần gọi updateProfile() riêng để gắn tên vào account
     *   - Sau khi update, user.displayName sẽ có giá trị
     */
    const register = async (username, email, password) => {
        try {
            // ── Bước 1: Tạo tài khoản mới trên Firebase ──
            // Firebase tự động:
            //   - Kiểm tra email chưa tồn tại
            //   - Hash password bằng thuật toán an toàn (scrypt)
            //   - Tạo UID duy nhất cho user
            //   - Tự động đăng nhập user sau khi tạo xong
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // ── Bước 2: Cập nhật displayName ──
            // userCredential.user là Firebase User object vừa tạo
            // updateProfile() cập nhật thông tin lên Firebase server
            await updateProfile(userCredential.user, {
                displayName: username, // Gắn tên người dùng
                // photoURL: "https://example.com/avatar.jpg"  // Có thể thêm ảnh đại diện
            });

            // Đăng ký thành công (user đã tự động được đăng nhập bởi Firebase)
            return { success: true };
        } catch (error) {
            console.error("❌ Lỗi đăng ký:", error.code, error.message);
            return { error: getFirebaseErrorMessage(error.code) };
        }
    };

    /**
     * logout - Đăng xuất user hiện tại
     *
     * signOut(auth) thực hiện:
     *   1. Xóa session khỏi Firebase (IndexedDB + cookie)
     *   2. Trigger onAuthStateChanged với user = null
     *   3. State user và token sẽ được set về null trong listener
     *
     * KHÔNG cần setUser(null) hay xóa localStorage!
     * onAuthStateChanged xử lý hết.
     */
    const logout = async () => {
        try {
            await signOut(auth);
            // onAuthStateChanged sẽ tự cập nhật: setUser(null), setToken(null)
        } catch (error) {
            console.error("❌ Lỗi đăng xuất:", error.message);
        }
    };

    // ══════════════════════════════════════════
    // GOOGLE SIGN-IN
    // ══════════════════════════════════════════

    /**
     * loginWithGoogle - Đăng nhập bằng tài khoản Google
     *
     * @returns {Object} { success: true } hoặc { error: "..." }
     *
     * Luồng hoạt động chi tiết:
     *
     *   1. Gọi signInWithPopup(auth, googleProvider)
     *      → Mở cửa sổ popup của Google (accounts.google.com)
     *      → User chọn tài khoản Google của mình
     *
     *   2. Google xác thực và trả về token:
     *      → Google verify user (password/2FA nếu cần)
     *      → Google gửi OAuth token về cho Firebase
     *
     *   3. Firebase xử lý:
     *      → Nếu lần đầu: Tạo tài khoản Firebase mới với thông tin Google
     *         (email, displayName, photoURL từ Google Account)
     *      → Nếu đã có: Liên kết với tài khoản Firebase cũ
     *      → Trả về UserCredential chứa thông tin user
     *
     *   4. onAuthStateChanged tự động được trigger:
     *      → Cập nhật state user và token
     *      → Không cần gọi setUser() thủ công
     *
     * So sánh với signInWithRedirect:
     *   ┌──────────────────────┬────────────────────────────────────┐
     *   │  signInWithPopup      │  signInWithRedirect                    │
     *   ├──────────────────────┼────────────────────────────────────┤
     *   │  Mở cửa sổ popup      │  Redirect toàn bộ trang đến Google    │
     *   │  Không rời trang     │  Rời trang rồi quay lại              │
     *   │  Nhanh, UX tốt      │  Chậm hơn nhưng tương thích mobile  │
     *   │  Bị chặn nếu popup   │  Không bị chặn popup                │
     *   │    blocker bật      │                                      │
     *   └──────────────────────┴────────────────────────────────────┘
     *
     * Các mã lỗi có thể xảy ra:
     *   - auth/popup-closed-by-user:  User đóng popup trước khi hoàn thành
     *   - auth/popup-blocked:         Trình duyệt chặn popup
     *   - auth/cancelled-popup-request: Mở popup mới khi popup cũ chưa đóng
     *   - auth/account-exists-with-different-credential:
     *       Email đã đăng ký bằng phương thức khác (email/password)
     */
    const loginWithGoogle = async () => {
        try {
            // ── Mở popup đăng nhập Google ──
            // signInWithPopup() nhận 2 tham số:
            //   1. auth:           Firebase Auth instance
            //   2. googleProvider: GoogleAuthProvider instance (từ firebase.js)
            // Trả về UserCredential chứa:
            //   - user:         Firebase User object (với đầy đủ thông tin từ Google)
            //   - providerId:   "google.com"
            //   - operationType: "signIn"
            await signInWithPopup(auth, googleProvider);

            // Đăng nhập thành công!
            // KHÔNG cần setUser() → onAuthStateChanged sẽ tự động cập nhật
            // User sẽ có sẵn: displayName, email, photoURL từ Google Account
            return { success: true };
        } catch (error) {
            // ── Xử lý lỗi ──
            console.error("❌ Lỗi đăng nhập Google:", error.code, error.message);

            // Nếu user tự đóng popup → không hiển lỗi (hành động có chủ đích)
            if (error.code === "auth/popup-closed-by-user") {
                return { cancelled: true };
            }

            return { error: getFirebaseErrorMessage(error.code) };
        }
    };
    

    
    // ══════════════════════════════════════════
    
    // HELPER: Chuyển mã lỗi Firebase → tiếng Việt
    
    // ══════════════════════════════════════════
    

    
    /**
     * 
     * getFirebaseErrorMessage - Dịch mã lỗi Firebase sang tiếng Việt
     * 
     *
     * Firebase trả về mã lỗi dạng "auth/error-code" (tiếng Anh, kỹ thuật).
     * Hàm này chuyển thành thông báo thân thiện cho người dùng.
     *
     * @param {string} errorCode - Mã lỗi Firebase (ví dụ: "auth/wrong-password")
     * @returns {string} Thông báo lỗi bằng tiếng Việt
     */
    const getFirebaseErrorMessage = (errorCode) => {
        // Dùng object mapping thay vì switch-case (ngắn gọn hơn)
        const errorMessages = {
            "auth/user-not-found": "Email này chưa được đăng ký!",
            "auth/wrong-password": "Sai mật khẩu!",
            "auth/invalid-email": "Email không hợp lệ!",
            "auth/email-already-in-use": "Email này đã được sử dụng!",
            "auth/weak-password": "Mật khẩu phải có ít nhất 6 ký tự!",
            "auth/too-many-requests":
                "Quá nhiều lần thử! Vui lòng thử lại sau.",
            "auth/invalid-credential":
                "Email hoặc mật khẩu không chính xác!",
            "auth/network-request-failed":
                "Lỗi kết nối mạng! Kiểm tra internet.",

            // ── Lỗi liên quan đến Google Sign-In ──
            "auth/popup-blocked":
                "Popup bị chặn! Vui lòng cho phép popup trong trình duyệt.",
            "auth/cancelled-popup-request":
                "Yêu cầu đăng nhập bị hủy! Vui lòng thử lại.",
            "auth/account-exists-with-different-credential":
                "Email này đã đăng ký bằng phương thức khác! Hãy thử đăng nhập bằng email/password.",
        };

        // Trả về message tương ứng, hoặc message mặc định nếu không tìm thấy
        return errorMessages[errorCode] || `Đã xảy ra lỗi: ${errorCode}`;
    };

    // ══════════════════════════════════════════
    // RENDER PROVIDER
    // ══════════════════════════════════════════

    return (
        /**
         * AuthContext.Provider:
         *   - Cung cấp value cho tất cả component con sử dụng useAuth().
         *   - Khi bất kỳ giá trị nào trong value thay đổi,
         *     TẤT CẢ component đang dùng useAuth() sẽ RE-RENDER.
         *
         * value chứa:
         *   - user:           Firebase User object (hoặc null)
         *   - token:          JWT ID Token (string hoặc null)
         *   - loading:        Boolean - đang kiểm tra auth
         *   - login:          Function - đăng nhập bằng email/password
         *   - register:       Function - đăng ký bằng email/password
         *   - logout:         Function - đăng xuất
         *   - loginWithGoogle: Function - đăng nhập/đăng ký bằng Google
         */
        <AuthContext.Provider
            value={{ user, token, loading, login, register, logout, loginWithGoogle }}
        >
            {/**
             * Chỉ render children khi loading = false
             *
             * Tại sao?
             *   Khi app mới mở, Firebase đang kiểm tra session.
             *   Nếu render ngay → ProtectedRoute thấy user=null → redirect /login
             *   → Sau đó Firebase xong → user có giá trị → lại redirect /dashboard
             *   → User thấy nhấp nháy (flash of unauthenticated content)
             *
             *   Bằng cách đợi loading=false, ta đảm bảo:
             *   - Đã biết chắc user login hay chưa
             *   - Render đúng trang ngay từ đầu
             *   - Không có flash/nhấp nháy
             */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// ══════════════════════════════════════════
// CUSTOM HOOK: useAuth
// ══════════════════════════════════════════

/**
 * useAuth - Custom hook để truy cập AuthContext
 *
 * Tại sao tạo custom hook thay vì dùng useContext(AuthContext) trực tiếp?
 *
 *   1. Ngắn gọn hơn:
 *      - Không cần: const context = useContext(AuthContext);
 *      - Chỉ cần:   const { user, login } = useAuth();
 *
 *   2. Error handling:
 *      - Nếu quên bọc <AuthProvider>, sẽ throw error rõ ràng
 *      - Thay vì nhận undefined và debug mãi không ra
 *
 *   3. Encapsulation:
 *      - Component con không cần biết AuthContext tồn tại
 *      - Chỉ cần biết useAuth() hook
 *
 * @returns {Object} { user, token, loading, login, register, logout }
 * @throws {Error} Nếu sử dụng ngoài <AuthProvider>
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    // Guard clause: đảm bảo hook được dùng bên trong AuthProvider
    if (!context) {
        throw new Error("useAuth phải được sử dụng bên trong <AuthProvider>");
    }

    return context;
};
