import React from "react";

import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
  IconNews,
} from "@tabler/icons";

const Page = () => {
  return (
    <div className="flex flex-wrap items-center justify-center h-screen w- bg-gray-400">
      <div className="lg:w-[20rem] h-full bg-pink-200">
        {tabs.account.map((item, index) => {
          return <p key={index}>{item.label}</p>;
        })}
      </div>
      <div className="flex-1 h-full bg-yellow-200">
        {tabs.account.map((item, index) => {
          return <p key={index}>{item.label}</p>;
        })}
      </div>
      <div className="flex-1 h-full bg-blue-200">
        {tabs.account.map((item, index) => {
          return <p key={index}>{item.label}</p>;
        })}
      </div>
    </div>
  );
};

const tabs = {
  account: [
    { link: "", label: "Fetch news", icon: IconNews },
    { link: "", label: "Notifications", icon: IconBellRinging },
    { link: "", label: "Billing", icon: IconReceipt2 },
    { link: "", label: "Security", icon: IconFingerprint },
    { link: "", label: "SSH Keys", icon: IconKey },
    { link: "", label: "Databases", icon: IconDatabaseImport },
    { link: "", label: "Authentication", icon: Icon2fa },
    { link: "", label: "Other Settings", icon: IconSettings },
  ],
  general: [
    { link: "", label: "Orders", icon: IconShoppingCart },
    { link: "", label: "Receipts", icon: IconLicense },
    { link: "", label: "Reviews", icon: IconMessage2 },
    { link: "", label: "Messages", icon: IconMessages },
    { link: "", label: "Customers", icon: IconUsers },
    { link: "", label: "Refunds", icon: IconReceiptRefund },
    { link: "", label: "Files", icon: IconFileAnalytics },
  ],
};

export default Page;
