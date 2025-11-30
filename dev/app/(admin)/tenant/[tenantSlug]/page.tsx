import React from 'react'
import { RouteGuard } from '@/components/RouteGuard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface TenantDashboardPageProps {
  params: {
    tenantSlug: string
  }
}

function TenantDashboardContent({ tenantSlug }: { tenantSlug: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Tenant: {tenantSlug}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Active users in this tenant</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Products available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Orders this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to the Admin Dashboard</CardTitle>
              <CardDescription>
                Manage your tenant settings, products, orders, and more from here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is the foundation of your multi-tenant admin application. Start building your custom admin interface here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function TenantDashboardPage({
  params,
}: TenantDashboardPageProps) {
  return (
    <RouteGuard>
      <TenantDashboardContent tenantSlug={params.tenantSlug} />
    </RouteGuard>
  )
}
