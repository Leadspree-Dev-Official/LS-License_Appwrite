import AdminLicenseGeneration from "@/components/admin/AdminLicenseGeneration";

const AdminLicensesPage = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">License Management</h1>
        <p className="text-muted-foreground">Generate unlimited licenses for any software</p>
      </div>
      <AdminLicenseGeneration />
    </div>
  );
};

export default AdminLicensesPage;
