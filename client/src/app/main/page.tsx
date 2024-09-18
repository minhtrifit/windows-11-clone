"use client";

import WindowContainer from "@/components/WindowContainer/WindowContainer";
import ContextMenuCpn from "@/components/ContextMenuCpn/ContextMenuCpn";
import AuthProtectProvider from "@/components/Providers/AuthProtectProvider/AuthProtectProvider";

const page = () => {
  return (
    <AuthProtectProvider>
      <ContextMenuCpn>
        <WindowContainer />
      </ContextMenuCpn>
    </AuthProtectProvider>
  );
};

export default page;
