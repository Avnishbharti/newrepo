import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import Layout from "./Layout";
import AdminLayout from "./admin/AdminLayout";
import Login from "./admin/login/Login";
import Category from "./admin/category/Category";
import Service from "./services/Service";
import SubCategory from "./admin/subcategory/SubCategory";
import Services from "./admin/service/Services";
import Blogs from "./admin/blogs/Blogs";
import Dashboard from "./admin/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="service" element={<Service />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/:userId/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="category/:categoryId/subcategory"
            element={
              <ProtectedRoute>
                <SubCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="category/:categoryId/subcategory/:subcategoryId/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
