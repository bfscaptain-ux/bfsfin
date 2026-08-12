import React from 'react';
import Sidebar from '@/components/partner/Sidebar';
import { ThemeProvider } from '@/components/partner/ThemeProvider';

export const metadata = {
  title: 'Partner Dashboard | BFSFIN',
  description: 'Manage your referrals, track leads, and view earnings.',
};

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Sidebar>
        {children}
      </Sidebar>
    </ThemeProvider>
  );
}
