import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Package, FileKey, Settings } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalSoftware: number;
  totalLicenses: number;
  totalAllocations: number;
}

interface License {
  id: string;
  license_key: string;
  buyer_name: string;
  buyer_email: string;
  created_at: string;
  software: { name: string };
}

const AdminDashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalSoftware: 0,
    totalLicenses: 0,
    totalAllocations: 0,
  });
  const [recentLicenses, setRecentLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const [usersRes, softwareRes, licensesRes, allocationsRes] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("software").select("*", { count: "exact", head: true }),
        supabase.from("licenses").select("*", { count: "exact", head: true }),
        supabase.from("reseller_allocations").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        totalSoftware: softwareRes.count || 0,
        totalLicenses: licensesRes.count || 0,
        totalAllocations: allocationsRes.count || 0,
      });

      // Fetch recent licenses
      const { data: licenses } = await supabase
        .from("licenses")
        .select("id, license_key, buyer_name, buyer_email, created_at, software(name)")
        .order("created_at", { ascending: false })
        .limit(10);

      setRecentLicenses(licenses || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600" },
    { title: "Software Products", value: stats.totalSoftware, icon: Package, color: "text-green-600" },
    { title: "Total Licenses", value: stats.totalLicenses, icon: FileKey, color: "text-purple-600" },
    { title: "Allocations", value: stats.totalAllocations, icon: Settings, color: "text-orange-600" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Licenses</CardTitle>
          <CardDescription>Your latest generated licenses across all resellers</CardDescription>
        </CardHeader>
        <CardContent>
          {recentLicenses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No licenses generated yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Key</TableHead>
                  <TableHead>Software</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLicenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-mono text-sm">{license.license_key}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{license.software.name}</Badge>
                    </TableCell>
                    <TableCell>{license.buyer_name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{license.buyer_email}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(license.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;
