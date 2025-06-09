import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { mockFirestore } from '@/lib/firebase';
import { Order, User } from '@/types';
import { Search, Calendar, Clock, MapPin, Phone, FileText, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Order['status']>('pending');
  const [users, setUsers] = useState<Record<string, User>>({});
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user) {
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    loadOrders();
    loadUsers();
  }, [user, navigate]);

  const loadOrders = async () => {
    try {
      const result = await mockFirestore.collection('orders').get();
      const ordersData = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: new Date(doc.data().createdAt),
        updatedAt: new Date(doc.data().updatedAt)
      })) as Order[];
      
      // Sort orders by createdAt (newest first)
      ordersData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const result = await mockFirestore.collection('users').get();
      const usersData = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as User[];
      
      // Create a map of user IDs to user objects for quick lookup
      const usersMap = usersData.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<string, User>);
      
      setUsers(usersMap);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const filterOrders = () => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search term (order ID or customer name/email)
    if (searchTerm) {
      filtered = filtered.filter(order => {
        const user = users[order.userId];
        return (
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user && user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user && user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.contactNumber.includes(searchTerm)
        );
      });
    }

    setFilteredOrders(filtered);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      await mockFirestore.collection('orders').doc(selectedOrder.id).update({
        status: newStatus,
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setOrders(prev => 
        prev.map(order => 
          order.id === selectedOrder.id 
            ? { ...order, status: newStatus, updatedAt: new Date() } 
            : order
        )
      );

      toast({
        title: "Success",
        description: `Order status updated to ${newStatus}`,
      });

      setStatusUpdateOpen(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { variant: 'secondary', className: 'bg-yellow-100 text-yellow-800' };
      case 'confirmed':
        return { variant: 'secondary', className: 'bg-blue-100 text-blue-800' };
      case 'preparing':
        return { variant: 'secondary', className: 'bg-purple-100 text-purple-800' };
      case 'ready':
        return { variant: 'secondary', className: 'bg-indigo-100 text-indigo-800' };
      case 'delivered':
        return { variant: 'secondary', className: 'bg-green-100 text-green-800' };
      case 'cancelled':
        return { variant: 'secondary', className: 'bg-red-100 text-red-800' };
      default:
        return { variant: 'secondary', className: '' };
    }
  };

  const formatDate = (date: Date) => {
    return format(date, 'MMM dd, yyyy h:mm a');
  };

  const calculateTotalItems = (order: Order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No orders found.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        {users[order.userId] ? (
                          <div>
                            <div>{users[order.userId].name}</div>
                            <div className="text-sm text-gray-500">{users[order.userId].email}</div>
                          </div>
                        ) : (
                          <div className="text-gray-500">Unknown User</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{calculateTotalItems(order)} items</TableCell>
                      <TableCell className="font-medium">₹{order.totalAmount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={getStatusBadgeVariant(order.status).className}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setOrderDetailsOpen(true);
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setNewStatus(order.status);
                              setStatusUpdateOpen(true);
                            }}
                          >
                            Update Status
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="font-medium w-32">Order ID:</span>
                        <span>{selectedOrder.id}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-32">Status:</span>
                        <Badge 
                          variant="secondary"
                          className={getStatusBadgeVariant(selectedOrder.status).className}
                        >
                          {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-32">Date:</span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{formatDate(selectedOrder.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-32">Last Updated:</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{formatDate(selectedOrder.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="font-medium w-32">Name:</span>
                        <span>{users[selectedOrder.userId]?.name || 'Unknown'}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-32">Email:</span>
                        <span>{users[selectedOrder.userId]?.email || 'Unknown'}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-32">Phone:</span>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{selectedOrder.contactNumber}</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-32">Address:</span>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{selectedOrder.deliveryAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                                <img
                                  src={item.product.image || '/placeholder.svg'}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{item.product.name}</div>
                                <div className="text-xs text-gray-500">{item.product.category}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>₹{item.price}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">₹{item.price * item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    {selectedOrder.specialInstructions && (
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Special Instructions:</div>
                          <div className="text-gray-700">{selectedOrder.specialInstructions}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="text-2xl font-bold text-orange-600">₹{selectedOrder.totalAmount}</div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setOrderDetailsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setOrderDetailsOpen(false);
                      setStatusUpdateOpen(true);
                      setNewStatus(selectedOrder.status);
                    }}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Status Update Dialog */}
        <Dialog open={statusUpdateOpen} onOpenChange={setStatusUpdateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="py-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Current Status:</p>
                  <Badge 
                    variant="secondary"
                    className={getStatusBadgeVariant(selectedOrder.status).className}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">New Status:</p>
                  <Select value={newStatus} onValueChange={(value: Order['status']) => setNewStatus(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setStatusUpdateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateStatus}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Update Status
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminOrders;