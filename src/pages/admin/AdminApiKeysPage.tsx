import ApiKeysManagement from "@/components/admin/ApiKeysManagement";

const AdminApiKeysPage = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">API Keys</h1>
        <p className="text-muted-foreground">Manage API keys for license verification</p>
      </div>
      <ApiKeysManagement />
    </div>
  );
};

export default AdminApiKeysPage;
