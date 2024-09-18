"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthChange } from "@/lib/firebase.auth";

interface AuthContextType {
  user: any;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthChange((authUser) => {
  //     setUser(authUser);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
