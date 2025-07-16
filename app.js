// app.js - Public Website Logic

// Sample Data (In real app, this would come from your backend API)
const sampleProducts = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, description: 'High-quality wireless headphones with noise cancellation', image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 199.99, description: 'Fitness tracker with heart rate monitor', image: '⌚' },
    { id: 3, name: 'Laptop Stand', price: 49.99, description: 'Adjustable aluminum laptop stand', image: '💻' },
    { id: 4, name: 'Coffee Mug', price: 19.99, description: 'Ceramic coffee mug with custom design', image: '☕' },
    { id: 5, name: 'Phone Case', price: 29.99, description: 'Protective phone case with wireless charging', image: '📱' },
    { id: 6, name: 'Desk Lamp', price: 79.99, description: 'LED desk lamp with adjustable brightness', image: '💡' }
];

const sampleBlogs = [
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
let currentPage = 'home';
let products = [];
let blogs = [];

// Navigation Functions
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageName + '-page').classList.add('active');
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-links button');
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.getElementById('nav-' + pageName).classList.add('active');
    
    currentPage = pageName;
    
    // Load page-specific content
    if (pageName === 'store') {
        loadAllProducts();
    }
}

// Product Functions
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const featuredProducts = products.slice(0, 3);
    
    container.innerHTML = featuredProducts.map(product => 
        '<div class="product-card">' +
            '<div class="product-image">' + product.image + '</div>' +
            '<h3 class="product-name">' + product.name + '</h3>' +
            '<p class="product-price">$' + product.price + '</p>' +
        '</div>'
    ).join('');
}

function loadAllProducts() {
    const container = document.getElementById('all-products');
    
    container.innerHTML = products.map(product => 
        '<div class="product-card">' +
            '<div class="product-image">' + product.image + '</div>' +
            '<h3 class="product-name">' + product.name + '</h3>' +
            '<p class="product-description">' + product.description + '</p>' +
            '<p class="product-price">$' + product.price + '</p>' +
            '<button class="btn" onclick="addToCart(' + product.id + ')">Add to Cart</button>' +
        '</div>'
    ).join('');
}

function addToCart(productId) {
    // In real app, this would add to cart and update cart count
    const product = products.find(p => p.id === productId);
    alert('Added ' + product.name + ' to cart!');
}

// Blog Functions
function loadBlogPosts() {
    const container = document.getElementById('blog-posts');
    
    container.innerHTML = blogs.map(blog => 
        '<div class="blog-card">' +
            '<div class="blog-image">' + blog.image + '</div>' +
            '<h3 class="blog-title">' + blog.title + '</h3>' +
            '<p class="blog-content">' + blog.content + '</p>' +
            '<div class="blog-meta">' +
                '<span>By ' + blog.author + '</span>' +
                '<span>' + formatDate(blog.date) + '</span>' +
            '</div>' +
            '<a href="#" class="read-more" onclick="readFullBlog(' + blog.id + ')">Read More →</a>' +
        '</div>'
    ).join('');
}

function readFullBlog(blogId) {
    // In real app, this would show full blog post
    const blog = blogs.find(b => b.id === blogId);
    alert('Full blog post: ' + blog.title);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// API Functions (In real app, these would make actual API calls)
async function fetchProducts() {
    // Simulate API call to backend
    // In real app: fetch('/api/products')
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(sampleProducts);
        }, 500);
    });
}

async function fetchBlogs() {
    // Simulate API call to backend
    // In real app: fetch('/api/blogs')
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(sampleBlogs);
        }, 300);
    });
}

// Initialize Application
async function initializeApp() {
    try {
        // Show loading state
        showLoading('featured-products');
        showLoading('blog-posts');
        
        // Load data from backend (simulated)
        products = await fetchProducts();
        blogs = await fetchBlogs();
        
        // Load initial content
        loadFeaturedProducts();
        loadBlogPosts();
        
        console.log('Public website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
        alert('Error loading website data. Please refresh the page.');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Utility Functions
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading"></div>';
    }
}

function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

// Cart Functions (for future implementation)
function updateCartCount() {
    // Update cart count in navigation
    console.log('Cart updated');
}

function getCartItems() {
    // Get items from cart (localStorage or backend)
    return [];
}

function clearCart() {
    // Clear all items from cart
    console.log('Cart cleared');
}

// Search Functions (for future implementation)
function searchProducts(query) {
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
}

// Contact Form Handler (for future implementation)
function handleContactForm(event) {
    event.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted');
}