import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    query,
    orderBy,
    where
} from "firebase/firestore";
//  Sửa thành đường dẫn tương đối cùng cấp thư mục
import { db } from "./firebase"; 

export const fetchProducts = async () => {
    try {
        const productsCol = collection(db, "products");
        const q = query(productsCol, orderBy("name"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchProductById = async (productId) => {
    try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Product not found");
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const catsRef = collection(db, "categories");
        const q = query(catsRef, orderBy("order"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }   
};

export const fetchCart = async (userId) => {
    try {
        if (!userId) return [];
        const cartDocRef = doc(db, "carts", userId);
        const docSnap = await getDoc(cartDocRef);
        // console.log("Fetched cart document snapshot:",  docSnap.data());
        if (docSnap.exists() && docSnap.data().cart) {
            return docSnap.data().cart; 
            
        }
        return []; 
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
};

export const updateCart = async (userId, items) => {
    try {
        if (!userId) return;
        const cartDocRef = doc(db, "carts", userId);
        console.log("Updating cart for user:", userId, "with items:", items);
        return await setDoc(cartDocRef, { cart: items }, { merge: true });
    } catch (error) {
        console.error("Error updating cart:", error);
        throw error;
    }
};


export const fetchWishlist = async (userId) => {
    try {
        if (!userId) return [];
        const wishlistDocRef = doc(db, "wishlists", userId);
        const docSnap = await getDoc(wishlistDocRef);
        
        if (docSnap.exists() && docSnap.data().wishlist) {
            return docSnap.data().wishlist; 
        }
        return []; 
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw error;
    }
};

// 2. Cập nhật hoặc thêm mới danh sách Wishlist của User trên Firestore
export const updateWishlist = async (userId, items) => {
    try {
        if (!userId) return;
        const wishlistDocRef = doc(db, "wishlists", userId);
        console.log("Updating wishlist for user:", userId, "with items:", items);
        return await setDoc(wishlistDocRef, { wishlist: items }, { merge: true });
    } catch (error) {
        console.error("Error updating wishlist:", error);
        throw error;
    }
};