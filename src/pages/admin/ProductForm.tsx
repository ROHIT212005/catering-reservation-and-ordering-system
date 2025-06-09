import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { mockFirestore } from '@/lib/firebase';
import { Product } from '@/types';
import { toast } from '@/hooks/use-toast';
import { ChevronLeft, Save, Plus, X } from 'lucide-react';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ingredient, setIngredient] = useState('');
  
  // Form state
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '/placeholder.svg',
    adminId: '',
    available: true,
    servings: 1,
    cookingTime: '',
    ingredients: [],
  });

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    // Update adminId in form data
    setFormData(prev => ({
      ...prev,
      adminId: user.id
    }));
    
    if (isEditMode) {
      loadProduct();
    } else {
      setLoading(false);
    }
  }, [user, id, navigate, isEditMode]);

  const loadProduct = async () => {
    if (!id) return;
    
    try {
      // In a real app, you would fetch the product by ID from the database
      // For this mock implementation, we'll get all products and find the one with matching ID
      const result = await mockFirestore.collection('products').get();
      const productsData = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: new Date(doc.data().createdAt),
        updatedAt: new Date(doc.data().updatedAt)
      })) as Product[];
      
      const product = productsData.find(p => p.id === id);
      
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
          adminId: product.adminId,
          available: product.available,
          servings: product.servings,
          cookingTime: product.cookingTime,
          ingredients: product.ingredients,
        });
      } else {
        toast({
          title: "Error",
          description: "Product not found",
          variant: "destructive",
        });
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast({
        title: "Error",
        description: "Failed to load product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'servings' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      available: checked
    }));
  };

  const addIngredient = () => {
    if (ingredient.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient.trim()]
      }));
      setIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.category || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setSaving(true);
      
      if (isEditMode) {
        // Update existing product
        await mockFirestore.collection('products').doc(id!).update({
          ...formData,
          updatedAt: new Date().toISOString()
        });
        
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        // Create new product
        await mockFirestore.collection('products').add({
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} product`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/products')}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Main Course">Main Course</SelectItem>
                      <SelectItem value="Appetizers">Appetizers</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Rice Dishes">Rice Dishes</SelectItem>
                      <SelectItem value="Breads">Breads</SelectItem>
                      <SelectItem value="Desserts">Desserts</SelectItem>
                      <SelectItem value="Beverages">Beverages</SelectItem>
                      <SelectItem value="Regional">Regional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>

                {/* Servings */}
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings *</Label>
                  <Input
                    id="servings"
                    name="servings"
                    type="number"
                    min="1"
                    step="1"
                    value={formData.servings}
                    onChange={handleChange}
                    placeholder="Number of servings"
                    required
                  />
                </div>

                {/* Cooking Time */}
                <div className="space-y-2">
                  <Label htmlFor="cookingTime">Cooking Time *</Label>
                  <Input
                    id="cookingTime"
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleChange}
                    placeholder="e.g. 30 minutes"
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows={4}
                  required
                />
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <Label>Ingredients</Label>
                <div className="flex gap-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    placeholder="Add an ingredient"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={addIngredient}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.ingredients.map((ing, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1"
                    >
                      <span>{ing}</span>
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="available">Available for ordering</Label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/products')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-orange-600 hover:bg-orange-700"
                  disabled={saving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Product'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductForm;