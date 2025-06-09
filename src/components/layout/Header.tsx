
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  Settings, 
  ChefHat,
  Package,
  Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-600">
              Desi Catering
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Menu
            </Link>
            {user?.role === 'admin' && (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/admin/products" 
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  Manage Menu
                </Link>
              </>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Cart (only for regular users) */}
                {user.role === 'user' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                    onClick={() => navigate('/cart')}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span className="hidden sm:inline">{user.name || user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    
                    {user.role === 'user' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/orders')}>
                          <Package className="mr-2 h-4 w-4" />
                          My Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/cart')}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Cart ({totalItems})
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    {user.role === 'admin' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/admin/orders')}>
                          <Package className="mr-2 h-4 w-4" />
                          Manage Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/admin/products')}>
                          <ChefHat className="mr-2 h-4 w-4" />
                          Manage Menu
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')} className="bg-orange-600 hover:bg-orange-700">
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
