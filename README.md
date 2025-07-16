# My Store - Full Stack E-commerce Website

A complete e-commerce store with customer-facing website and admin management panel.

## 🏗️ Project Structure

```
my-website/
├── 📁 public/              # Customer website (Frontend)
│   ├── index.html          # Main homepage
│   ├── styles.css          # Public website styles
│   └── app.js              # Public website functionality
│
├── 📁 admin/               # Admin panel (Frontend)
│   ├── admin.html          # Admin dashboard
│   ├── admin-styles.css    # Admin panel styles
│   └── admin.js            # Admin functionality
│
├── 📁 backend/             # Server (Backend)
│   ├── server.js           # Main Express server
│   ├── package.json        # Dependencies
│   └── README.md           # This file
│
└── 📁 database/            # Database storage
    └── store.db            # SQLite database (auto-created)
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Access the Website
- **Customer Website:** http://localhost:3000/
- **Admin Panel:** http://localhost:3000/admin
- **API Endpoints:** http://localhost:3000/api/

## 🔐 Admin Login
- **Username:** admin
- **Password:** admin123

## ⚡ Tech Stack

### Frontend
- **HTML5** - Structure and markup
- **CSS3** - Styling and responsive design
- **JavaScript** - Interactive functionality
- **Responsive Design** - Mobile and desktop friendly

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Database
- **CORS** - Cross-origin resource sharing

## 📊 Features

### Customer Website (`/public`)
- ✅ Homepage with featured products
- ✅ Store page with all products
- ✅ About Us page
- ✅ Blog posts section
- ✅ Add to cart functionality
- ✅ Responsive design

### Admin Panel (`/admin`)
- ✅ Secure login system
- ✅ Dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Blog post management (CRUD)
- ✅ Order overview
- ✅ Customer management

### Backend API (`/backend`)
- ✅ RESTful API endpoints
- ✅ SQLite database
- ✅ CRUD operations
- ✅ Authentication
- ✅ Error handling

## 🔗 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Blogs
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get single blog post
- `POST /api/blogs` - Create new blog post
- `PUT /api/blogs/:id` - Update blog post
- `DELETE /api/blogs/:id` - Delete blog post

### Authentication
- `POST /api/login` - Admin login

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🛠️ Development

### Run in Development Mode
```bash
npm run dev
```

### Database
The SQLite database is automatically created when you start the server for the first time. Sample data is inserted automatically.

### File Structure Details
- **Public files** are served at the root URL
- **Admin files** are served at `/admin`
- **API endpoints** are available at `/api/*`

## 📝 Sample Data

The application comes with sample products and blog posts:

### Products
- Wireless Headphones ($99.99)
- Smart Watch ($199.99)
- Laptop Stand ($49.99)
- Coffee Mug ($19.99)
- Phone Case ($29.99)
- Desk Lamp ($79.99)

### Blog Posts
- Welcome to Our New Store!
- New Product Line: Tech Accessories
- Customer Service Excellence

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```
PORT=3000
DB_PATH=./database/store.db
```

### Database Schema
The SQLite database contains these tables:
- `products` - Store products
- `blogs` - Blog posts
- `users` - Admin users
- `orders` - Customer orders

## 🚀 Deployment

### Local Development
1. Run `npm install` in the backend directory
2. Run `npm start` to start the server
3. Access the website at http://localhost:3000

### Production Deployment
1. Set environment variables
2. Ensure database directory exists
3. Run the server with `npm start`

## 📱 Mobile Responsive

Both the customer website and admin panel are fully responsive and work on:
- 📱 Mobile phones
- 📲 Tablets
- 💻 Desktop computers

## 🔄 Future Enhancements

- User registration and login
- Shopping cart persistence
- Order processing system
- Payment integration
- Email notifications
- Product categories
- Search functionality
- Image upload for products

## 📄 License

MIT License - feel free to use this project for learning or building your own store!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify the database file is created
4. Check file permissions

---

**Happy coding! 🎉**