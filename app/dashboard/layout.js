import Sidebar from "@/components/pageContent/Sidebar";
import DashboardBreadcrumb from "@/components/tools/DashboardBreadcrumb";

export default function DashboardLayout({ children }) {
  return (
    <div className='min-h-screen bg-background'>
      <Sidebar />
      <div className='md:ml-64 flex flex-col min-h-screen'>
        <DashboardBreadcrumb />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
