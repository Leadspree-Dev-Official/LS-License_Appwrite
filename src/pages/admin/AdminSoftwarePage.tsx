import SoftwareManagement from "@/components/admin/SoftwareManagement";

const AdminSoftwarePage = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Software Management</h1>
        <p className="text-muted-foreground">Manage your software products and versions</p>
      </div>
      <SoftwareManagement />
    </div>
  );
};

export default AdminSoftwarePage;
