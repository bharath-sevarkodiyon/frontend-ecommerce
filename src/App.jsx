import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/Provider/CartProvider";
import { AuthProvider } from "./components/Provider/AuthContext";
import { ProductProvider } from "./components/Provider/ProductProvider";
import { LoginForm } from "./components/login/LoginForm";
import { SignupForm } from "./components/signup/SignupForm";
import Home from "./components/home/Home";
import SelectedProductList from "./components/SelectedProductCategory/SelectedProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
import { OrderProvider } from "./components/Provider/OrderProvider";
import UserOrders from "./components/Orders/UserOrders";
import { Toaster } from "sonner";
import AdminDashboard from "./components/Admin/Home/AdminDashboard";

function App() {
  return (
    <div className="md:w-screen">
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
              <Toaster richColors/>
                <Routes>
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/signup" element={<SignupForm />} />
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/product/:categoryName"
                    element={<SelectedProductList />}
                  />
                  <Route
                    path="/product-details/:productName"
                    element={<ProductDetails />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout/:id" element={<Checkout />} />
                  <Route path="/order" element={<Orders />} />
                  <Route path="/userorders" element={<UserOrders />} />
                  {/* <Route path="/admin" element={<AdminDashboard />} /> */}
                </Routes>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
