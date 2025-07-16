// server.js - Main Express Server

const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Database setup
const db = new sqlite3.Database('./database/store.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    // Create products table
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create blogs table
    db.run(`
        CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            image TEXT,
            date DATE DEFAULT CURRENT_DATE
        )
    `);

    // Create users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'admin'
        )
    `);

    // Create orders table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            total REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Insert sample data if tables are empty
    insertSampleData();
}

// Insert sample data
function insertSampleData() {
    // Check if products exist
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (row.count === 0) {
            const sampleProducts = [
                { name: 'Wireless Headphones', price: 99.99, description: 'High-quality wireless headphones with noise cancellation', image: '🎧' },
                { name: 'Smart Watch', price: 199.99, description: 'Fitness tracker with heart rate monitor', image: '⌚' },
                { name: 'Laptop Stand', price: 49.99, description: 'Adjustable aluminum laptop stand', image: '💻' },
                { name: 'Coffee Mug', price: 19.99, description: 'Ceramic coffee mug with custom design', image: '☕' },
                { name: 'Phone Case', price: 29.99, description: 'Protective phone case with wireless charging', image: '📱' },
                { name: 'Desk Lamp', price: 79.99, description: 'LED desk lamp with adjustable brightness', image: '💡' }
            ];

            const stmt = db.prepare("INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)");
            sampleProducts.forEach(product => {
                stmt.run(product.name, product.price, product.description, product.image);
            });
            stmt.finalize();
            console.log('Sample products inserted');
        }
    });

    // Check if blogs exist
    db.get("SELECT COUNT(*) as count FROM blogs", (err, row) => {
        if (row.count === 0) {
            const sampleBlogs = [
                {
                    title: 'Welcome to Our New Store!',
                    content: 'We are excited to announce the launch of our new online store. Discover amazing products with unbeatable prices and exceptional customer service.',
                    author: 'Store Manager',
                    image: '🎉'
                },
                {
                    title: 'New Product Line: Tech Accessories',
                    content: 'Check out our latest collection of tech accessories including wireless chargers, phone cases, and laptop stands. Perfect for the modern professional.',
                    author: 'Product Team',
                    image: '📱'
                },
                {
                    title: 'Customer Service Excellence',
                    content: 'Our commitment to customer satisfaction drives everything we do. Learn about our 30-day return policy and 24/7 customer support.',
                    author: 'Customer Service',
                    image: '🏆'
                }
            ];

            const stmt = db.prepare("INSERT INTO blogs (title, content, author, image) VALUES (?, ?, ?, ?)");
            sampleBlogs.forEach(blog => {
                stmt.run(blog.title, blog.content, blog.author, blog.image);
            });
            stmt.finalize();
            console.log('Sample blogs inserted');
        }
    });

    // Insert default admin user
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
        if (row.count === 0) {
            db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", 
                   ['admin', 'admin123', 'admin'], (err) => {
                if (!err) console.log('Default admin user created');
            });
        }
    });
}

// API Routes

// Products API
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products ORDER BY id DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    });
});

app.post('/api/products', (req, res) => {
    const { name, price, description, image } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    db.run("INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)", 
           [name, price, description, image], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, message: 'Product created successfully' });
        }
    });
});

app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, description, image } = req.body;

    db.run("UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?", 
           [name, price, description, image, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json({ message: 'Product updated successfully' });
        }
    });
});

app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    
    db.run("DELETE FROM products WHERE id = ?", [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json({ message: 'Product deleted successfully' });
        }
    });
});

// Blogs API
app.get('/api/blogs', (req, res) => {
    db.all("SELECT * FROM blogs ORDER BY date DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/blogs/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM blogs WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    });
});

app.post('/api/blogs', (req, res) => {
    const { title, content, author, image } = req.body;
    
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    db.run("INSERT INTO blogs (title, content, author, image) VALUES (?, ?, ?, ?)", 
           [title, content, author, image], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, message: 'Blog post created successfully' });
        }
    });
});

app.put('/api/blogs/:id', (req, res) => {
    const id = req.params.id;
    const { title, content, author, image } = req.body;

    db.run("UPDATE blogs SET title = ?, content = ?, author = ?, image = ? WHERE id = ?", 
           [title, content, author, image, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.json({ message: 'Blog post updated successfully' });
        }
    });
});

app.delete('/api/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    db.run("DELETE FROM blogs WHERE id = ?", [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.json({ message: 'Blog post deleted successfully' });
        }
    });
});

// Authentication API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", 
           [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json({ 
                success: true, 
                message: 'Login successful',
                user: { id: row.id, username: row.username, role: row.role }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Dashboard Stats API
app.get('/api/dashboard/stats', (req, res) => {
    Promise.all([
        new Promise((resolve, reject) => {
            db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        }),
        new Promise((resolve, reject) => {
            db.get("SELECT COUNT(*) as count FROM blogs", (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        }),
        new Promise((resolve, reject) => {
            db.get("SELECT COUNT(*) as count FROM orders", (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        })
    ]).then(([products, blogs, orders]) => {
        res.json({
            totalProducts: products,
            totalBlogs: blogs,
            totalOrders: orders,
            totalRevenue: 2450 // Static for now
        });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// Serve the public website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve the admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/admin.html'));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Public website: http://localhost:${PORT}/`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});