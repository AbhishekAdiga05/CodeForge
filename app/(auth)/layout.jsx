import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      {children}
    </main>
  );
};

export default AuthLayout;
