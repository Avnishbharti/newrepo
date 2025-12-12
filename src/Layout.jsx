import React, { useEffect } from "react";
import Header from "./header/Header";
import { Outlet, useParams } from "react-router-dom";
import Footer from "./footer/Footer";
import { useDispatch } from "react-redux";
import { getAllServices } from "./toolkit/slices/serviceSlice";
import { getBlogList } from "./toolkit/slices/blogSlice";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getBlogList());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
