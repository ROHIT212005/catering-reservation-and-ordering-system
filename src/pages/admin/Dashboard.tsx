
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { 
  ChefHat, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Package,
  DollarSign,
  Clock,
  Star
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Mock data for charts and stats
  const salesData = [
    { name: 'Mon', revenue: 2400, orders: 24 },
    { name: 'Tue', revenue: 1398, orders: 18 },
    { name: 'Wed', revenue: 9800, orders: 45 },
    { name: 'Thu', revenue: 3908, orders: 32 },
    { name: 'Fri', revenue: 4800, orders: 38 },
    { name: 'Sat', revenue: 3800, orders: 28 },
    { name: 'Sun', revenue: 4300, orders: 35 },
  ];

  const categoryData = [
    { name: 'Main Course', value: 400, color: '#f97316' },
    { name: 'Appetizers', value: 300, color: '#fb923c' },
    { name: 'Desserts', value: 200, color: '#fdba74' },
    { name: 'Beverages', value: 100, color: '#fed7aa' },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#f97316",
    },
    orders: {
      label: "Orders",
      color: "#fb923c",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}! Here's what's happening with your catering business.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Revenue & Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: '#1234', customer: 'John Doe', amount: '₹1,299', status: 'Delivered', time: '2 hours ago' },
                  { id: '#1235', customer: 'Jane Smith', amount: '₹899', status: 'Preparing', time: '4 hours ago' },
                  { id: '#1236', customer: 'Mike Johnson', amount: '₹1,599', status: 'Confirmed', time: '6 hours ago' },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{order.id} - {order.customer}</div>
                      <div className="text-sm text-gray-500">{order.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{order.amount}</div>
                      <div className="text-sm text-orange-600">{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/admin/orders')}
              >
                View All Orders
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="h-20 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700"
                  onClick={() => navigate('/admin/products/new')}
                >
                  <ChefHat className="h-6 w-6 mb-2" />
                  Add Product
                </Button>
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => navigate('/admin/orders')}
                >
                  <Package className="h-6 w-6 mb-2" />
                  Manage Orders
                </Button>
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => navigate('/admin/products')}
                >
                  <Package className="h-6 w-6 mb-2" />
                  View Products
                </Button>
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
