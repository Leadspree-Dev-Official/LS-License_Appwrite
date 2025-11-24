import AllocationsManagement from "@/components/admin/AllocationsManagement";

const AdminAllocationsPage = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Reseller Allocations</h1>
        <p className="text-muted-foreground">Manage license allocations for resellers</p>
      </div>
      <AllocationsManagement />
    </div>
  );
};

export default AdminAllocationsPage;
