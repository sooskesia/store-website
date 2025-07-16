// admin.js - Admin Panel Logic

// Sample Data (In real app, this would come from your backend API)
let adminProducts = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, description: 'High-quality wireless headphones with noise cancellation', image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 199.99, description: 'Fitness tracker with heart rate monitor', image: '⌚' },
    { id: 3, name: 'Laptop Stand', price: 49.99, description: 'Adjustable aluminum laptop stand', image: '💻' },
    { id: 4, name: 'Coffee Mug', price: 19.99, description: 'Ceramic coffee mug with custom design', image: '☕' },
    { id: 5, name: 'Phone Case', price: 29.99, description: 'Protective phone case with wireless charging', image: '📱' },
    { id: 6, name: 'Desk Lamp', price: 79.99, description: 'LED desk lamp with adjustable brightness', image: '💡' }
];

let adminBlogs = [
    {
        id: 1,
        title: 'Welcome to Our New Store!',
        content: 'We are excited to announce the launch of our new online store. Discover amazing products with unbeatable prices and exceptional customer service.',
        author: 'Store Manager',
        date: '2024-01-15',
        image: '🎉'
    },
    {
        id: 2,
        title: 'New Product Line: Tech Accessories',
        content: 'Check out our latest collection of tech accessories including wireless chargers, phone cases, and laptop stands. Perfect for the modern professional.',
        author: 'Product Team',
        date: '2024-01-10',
        image: '📱'
    },
    {
        id: 3,
        title: 'Customer Service Excellence',
        content: 'Our commitment to customer satisfaction drives everything we do. Learn about our 30-day return policy and 24/7 customer support.',
        author: 'Customer Service',
        date: '2024-01-05',
        image: '🏆'
    }
];

// Application State
let isLoggedIn = false;
let currentAdminPage = 'dashboard';
let editingProductId = null;
let editingBlogId = null;

// Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple authentication (In real app, this would be secure backend authentication)
    if (username === 'admin' && password === 'admin123') {
        isLoggedIn = true;
        showPage('dashboard-page');
        loadDashboardData();
        alert('Login successful! Welcome to the admin panel.');
    } else {
        alert('Invalid credentials! Use username: admin, password: admin123');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        isLoggedIn = false;
        showPage('login-page');
        // Clear form data
        document.getElementById('login-form').reset();
        alert('You have been logged out successfully.');
    }
}

// Page Navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showAdminPage(pageName) {
    // Update sidebar navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show content section
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(pageName + '-content').classList.add('active');
    
    currentAdminPage = pageName;
    
    // Load page-specific data
    switch(pageName) {
        case 'products':
            loadProductsTable();
            break;
        case 'blogs':
            loadBlogsTable();
            break;
        case 'dashboard':
            loadDashboardData();
            break;
    }
}

// Dashboard Functions
function loadDashboardData() {
    document.getElementById('total-products').textContent = adminProducts.length;
    document.getElementById('total-blogs').textContent = adminBlogs.length;
    // Other stats would come from backend in real app
}

// Product Management Functions
function loadProductsTable() {
    const tbody = document.getElementById('products-table');
    
    tbody.innerHTML = adminProducts.map(product => 
        '<tr>' +
            '<td>' + product.id + '</td>' +
            '<td class="table-image">' + product.image + '</td>' +
            '<td>' + product.name + '</td>' +
            '<td>$' + product.price + '</td>' +
            '<td>' + product.description.substring(0, 50) + '...</td>' +
            '<td class="table-actions">' +
                '<button class="btn btn-warning" onclick="editProduct(' + product.id + ')">Edit</button>' +
                '<button class="btn btn-danger" onclick="deleteProduct(' + product.id + ')">Delete</button>' +
            '</td>' +
        '</tr>'
    ).join('');
}

function showAddProductForm() {
    editingProductId = null;
    document.getElementById('product-modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    showModal('product-modal');
}

function editProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (product) {
        editingProductId = productId;
        document.getElementById('product-modal-title').textContent = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-image').value = product.image;
        showModal('product-modal');
    }
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        adminProducts = adminProducts.filter(p => p.id !== productId);
        loadProductsTable();
        loadDashboardData();
        alert('Product deleted successfully!');
    }
}

function handleProductSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const productData = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
        image: formData.get('image')
    };
    
    if (editingProductId) {
        // Update existing product
        const index = adminProducts.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            adminProducts[index] = { ...adminProducts[index], ...productData };
            alert('Product updated successfully!');
        }
    } else {
        // Add new product
        const newId = Math.max(...adminProducts.map(p => p.id)) + 1;
        adminProducts.push({ id: newId, ...productData });
        alert('Product added successfully!');
    }
    
    closeModal('product-modal');
    loadProductsTable();
    loadDashboardData();
}

// Blog Management Functions
function loadBlogsTable() {
    const tbody = document.getElementById('blogs-table');
    
    tbody.innerHTML = adminBlogs.map(blog => 
        '<tr>' +
            '<td>' + blog.id + '</td>' +
            '<td>' + blog.title + '</td>' +
            '<td>' + blog.author + '</td>' +
            '<td>' + formatDate(blog.date) + '</td>' +
            '<td class="table-actions">' +
                '<button class="btn btn-warning" onclick="editBlog(' + blog.id + ')">Edit</button>' +
                '<button class="btn btn-danger" onclick="deleteBlog(' + blog.id + ')">Delete</button>' +
            '</td>' +
        '</tr>'
    ).join('');
}

function showAddBlogForm() {
    editingBlogId = null;
    document.getElementById('blog-modal-title').textContent = 'Add New Blog Post';
    document.getElementById('blog-form').reset();
    document.getElementById('blog-id').value = '';
    showModal('blog-modal');
}

function editBlog(blogId) {
    const blog = adminBlogs.find(b => b.id === blogId);
    if (blog) {
        editingBlogId = blogId;
        document.getElementById('blog-modal-title').textContent = 'Edit Blog Post';
        document.getElementById('blog-id').value = blog.id;
        document.getElementById('blog-title').value = blog.title;
        document.getElementById('blog-content').value = blog.content;
        document.getElementById('blog-author').value = blog.author;
        document.getElementById('blog-image').value = blog.image;
        showModal('blog-modal');
    }
}

function deleteBlog(blogId) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        adminBlogs = adminBlogs.filter(b => b.id !== blogId);
        loadBlogsTable();
        loadDashboardData();
        alert('Blog post deleted successfully!');
    }
}

function handleBlogSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const blogData = {
        title: formData.get('title'),
        content: formData.get('content'),
        author: formData.get('author'),
        image: formData.get('image'),
        date: new Date().toISOString().split('T')[0] // Current date
    };
    
    if (editingBlogId) {
        // Update existing blog
        const index = adminBlogs.findIndex(b => b.id === editingBlogId);
        if (index !== -1) {
            adminBlogs[index] = { ...adminBlogs[index], ...blogData };
            alert('Blog post updated successfully!');
        }
    } else {
        // Add new blog
        const newId = Math.max(...adminBlogs.map(b => b.id)) + 1;
        adminBlogs.push({ id: newId, ...blogData });
        alert('Blog post added successfully!');
    }
    
    closeModal('blog-modal');
    loadBlogsTable();
    loadDashboardData();
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// API Functions (In real app, these would make actual API calls)
async function saveProduct(productData) {
    // Simulate API call to backend
    // In real app: fetch('/api/admin/products', { method: 'POST', body: productData })
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true });
        }, 500);
    });
}

async function saveBlog(blogData) {
    // Simulate API call to backend
    // In real app: fetch('/api/admin/blogs', { method: 'POST', body: blogData })
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true });
        }, 500);
    });
}

async function fetchAdminData() {
    // Simulate API call to get admin data
    // In real app: fetch('/api/admin/dashboard')
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                products: adminProducts,
                blogs: adminBlogs
            });
        }, 300);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Product form
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    // Blog form
    const blogForm = document.getElementById('blog-form');
    if (blogForm) {
        blogForm.addEventListener('submit', handleBlogSubmit);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    });
    
    console.log('Admin panel initialized successfully');
});

// Export data functions (for connecting to backend)
function exportProducts() {
    return adminProducts;
}

function exportBlogs() {
    return adminBlogs;
}

function importProducts(products) {
    adminProducts = products;
    if (currentAdminPage === 'products') {
        loadProductsTable();
    }
    loadDashboardData();
}

function importBlogs(blogs) {
    adminBlogs = blogs;
    if (currentAdminPage === 'blogs') {
        loadBlogsTable();
    }
    loadDashboardData();
}

// Search and Filter Functions (for future enhancement)
function searchProducts(query) {
    const filtered = adminProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
}

function searchBlogs(query) {
    const filtered = adminBlogs.filter(blog => 
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase()) ||
        blog.author.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
}

// Backup and Restore Functions
function backupData() {
    const data = {
        products: adminProducts,
        blogs: adminBlogs,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'store-backup-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
}

function restoreData(fileInput) {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data.products && data.blogs) {
                    adminProducts = data.products;
                    adminBlogs = data.blogs;
                    loadDashboardData();
                    if (currentAdminPage === 'products') loadProductsTable();
                    if (currentAdminPage === 'blogs') loadBlogsTable();
                    alert('Data restored successfully!');
                } else {
                    alert('Invalid backup file format');
                }
            } catch (error) {
                alert('Error reading backup file');
            }
        };
        reader.readAsText(file);
    }
}