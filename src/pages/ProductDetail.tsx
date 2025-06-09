import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockFirestore } from "@/lib/firebase";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";
import { Clock, Users } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const docRef = mockFirestore.collection('products').doc(id);
          const docSnapshot = await docRef.get();
          
          if (docSnapshot.exists) {
            setProduct({
              id: docSnapshot.id,
              ...docSnapshot.data()
            } as Product);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto py-8">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
                <p className="text-muted-foreground">
                  The product you're looking for doesn't exist or has been removed.
                </p>
                <Button className="mt-4" onClick={() => navigate("/products")}>
                  Back to Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <CardDescription>{product.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Price</h3>
                  <p className="text-2xl font-bold text-orange-600">₹{product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  {product.servings && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{product.servings} servings</span>
                    </div>
                  )}
                  {product.cookingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{product.cookingTime}</span>
                    </div>
                  )}
                </div>
                {product.ingredients && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Ingredients</h3>
                    <p className="text-muted-foreground">{product.ingredients}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/products")}>
              Back to Products
            </Button>
            <Button 
              onClick={handleAddToCart}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;