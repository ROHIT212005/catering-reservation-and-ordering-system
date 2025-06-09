
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChefHat, 
  Star, 
  Clock, 
  Users, 
  Truck,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: ChefHat,
      title: "Authentic Indian Cuisine",
      description: "Traditional recipes passed down through generations, prepared with authentic spices and ingredients."
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Fresh ingredients sourced daily, ensuring the highest quality in every dish we serve."
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Reliable delivery service ensuring your food arrives fresh and on time for your events."
    },
    {
      icon: Users,
      title: "Any Event Size",
      description: "From intimate gatherings to large celebrations, we cater to events of all sizes."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Amazing food quality and service! They made our wedding celebration absolutely perfect."
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Best catering service in the area. Fresh, delicious food and professional staff."
    },
    {
      name: "Anita Patel",
      location: "Ahmedabad",
      rating: 5,
      comment: "Highly recommend for corporate events. They delivered excellent food for our office party."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Authentic Indian Catering
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Bringing the rich flavors of traditional Indian cuisine to your special occasions. 
              From intimate gatherings to grand celebrations, we make every event memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                    <Link to="/products">Explore Menu</Link>
                  </Button>
                  {user.role === 'admin' && (
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
                      <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
                    <Link to="/products">View Menu</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine traditional cooking methods with modern service standards to deliver exceptional catering experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Dishes</h2>
            <p className="text-lg text-gray-600">Some of our most loved traditional Indian delicacies</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Butter Chicken",
                description: "Tender chicken in rich, creamy tomato-based sauce",
                image: "/placeholder.svg",
                category: "Main Course",
                popular: true
              },
              {
                name: "Biryani Platter",
                description: "Aromatic basmati rice with perfectly spiced meat",
                image: "/placeholder.svg",
                category: "Rice Dishes",
                popular: true
              },
              {
                name: "Paneer Tikka",
                description: "Grilled cottage cheese marinated in traditional spices",
                image: "/placeholder.svg",
                category: "Vegetarian",
                popular: false
              }
            ].map((dish, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <ChefHat className="h-16 w-16 text-orange-400" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{dish.name}</h3>
                    {dish.popular && (
                      <Badge variant="destructive">Popular</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{dish.description}</p>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    {dish.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link to="/products">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Trusted by thousands of satisfied customers across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8">
            Experience the authentic taste of India at your next event. Let us make it unforgettable!
          </p>
          {user ? (
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link to="/products">Start Ordering</Link>
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                <Link to="/register">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <span className="text-xl font-bold">Desi Catering</span>
              </div>
              <p className="text-gray-400">
                Bringing authentic Indian flavors to your special occasions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/products" className="hover:text-white">Menu</Link></li>
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@desicatering.com
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Mumbai, Maharashtra
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Desi Catering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
