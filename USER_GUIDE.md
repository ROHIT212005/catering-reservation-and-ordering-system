# Rural Catering Market - User Guide

This guide will help you navigate and use the Rural Catering Market application effectively.

## Getting Started

1. Open your browser and navigate to the application URL (http://localhost:8080 in development mode)
2. You'll land on the home page showcasing the catering service offerings

## User Accounts

### Logging In

1. Click on "Login" in the top-right corner of the page
2. Enter your email and password
3. Click "Sign In"

For demo purposes, you can use:
- **Admin**: admin@demo.com / password123
- **User**: user@demo.com / password123

### Registering a New Account

1. Click on "Register" in the top-right corner
2. Fill in the required information:
   - Email
   - Password
   - Name
3. Click "Create Account"

## Customer Features

### Browsing Products

1. Click on "Menu" in the navigation bar
2. Browse through available catering items
3. Use the search bar to find specific items
4. Filter by category using the dropdown

### Adding Items to Cart

1. While browsing products, click "Add to Cart" on any item
2. The item will be added to your cart
3. A notification will confirm the addition

### Managing Your Cart

1. Click on the cart icon in the top-right corner
2. Review items in your cart
3. Adjust quantities using the + and - buttons
4. Remove items by clicking the trash icon
5. Click "Proceed to Checkout" when ready

### Checkout Process

1. Fill in your delivery information
2. Add any special instructions
3. Review your order summary
4. Click "Place Order" to complete your purchase

### Viewing Orders

1. Click on your profile icon in the top-right corner
2. Select "My Orders" from the dropdown
3. View details of your past and current orders

## Admin Features

### Accessing Admin Dashboard

1. Log in with admin credentials
2. Click on your profile icon in the top-right corner
3. Select "Dashboard" from the dropdown

### Managing Products

1. From the admin dashboard, click "Manage Menu"
2. View all products in a table format
3. Search and filter products as needed

### Adding a New Product

1. On the product management page, click "Add Product"
2. Fill in the product details:
   - Name
   - Description
   - Price
   - Category
   - Servings
   - Cooking Time
   - Ingredients
   - Image URL (optional)
3. Toggle availability as needed
4. Click "Save Product"

### Editing a Product

1. On the product management page, find the product you want to edit
2. Click the edit (pencil) icon
3. Update the product details
4. Click "Save Product"

### Deleting a Product

1. On the product management page, find the product you want to delete
2. Click the delete (trash) icon
3. Confirm deletion in the popup dialog

### Managing Orders

1. From the admin dashboard, click "Manage Orders" or navigate to the Orders section from the profile dropdown
2. View all customer orders in a table format
3. Search orders by customer name, email, order ID, or delivery address
4. Filter orders by status (pending, confirmed, preparing, ready, delivered, cancelled)

### Viewing Order Details

1. On the order management page, find the order you want to view
2. Click "View Details" to see comprehensive information about the order:
   - Order information (ID, status, dates)
   - Customer information (name, email, phone, address)
   - Order items with quantities and prices
   - Special instructions
   - Total amount

### Updating Order Status

1. On the order management page, find the order you want to update
2. Click "Update Status"
3. Select the new status from the dropdown:
   - Pending
   - Confirmed
   - Preparing
   - Ready
   - Delivered
   - Cancelled
4. Click "Update Status" to save the changes

## Logging Out

1. Click on your profile icon in the top-right corner
2. Select "Logout" from the dropdown

## Troubleshooting

- **Can't log in?** Make sure you're using the correct email and password
- **Items not appearing in cart?** Ensure you're logged in before adding items
- **Changes not saving?** The demo uses localStorage, so clearing browser data will reset all information

For additional help, refer to the README.md file in the project repository.