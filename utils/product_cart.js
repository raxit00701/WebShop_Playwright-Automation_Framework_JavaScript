/**
 * Add product to cart via API using existing page context
 * @param {Page} page - Playwright page object
 * @param {string} productPath - Product URL path (e.g., '/computing-and-internet')
 * @param {number} quantity - Quantity to add (default: 10)
 * @returns {Promise<Object>}
 */
async function addProductToCartAPI(page, productPath, quantity = 10) {
    const baseURL = 'https://demowebshop.tricentis.com';

    // Get product page to extract product ID
    const productResponse = await page.request.get(`${baseURL}${productPath}`);
    const html = await productResponse.text();

    // Extract product ID
    const productIdMatch = html.match(/data-productid="(\d+)"/);
    if (!productIdMatch) {
        throw new Error(`Product ID not found for path: ${productPath}`);
    }
    const productId = parseInt(productIdMatch[1]);

    // Add to cart via API
    const addToCartResponse = await page.request.post(
        `${baseURL}/addproducttocart/details/${productId}/${quantity}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    );

    const result = await addToCartResponse.json();

    // Extract cart count
    const cartCountMatch = result.updatetopcartsectionhtml?.match(/\((\d+)\)/);
    const cartCount = cartCountMatch ? parseInt(cartCountMatch[1]) : 0;

    // Navigate to cart page to ensure cart is updated
    await page.goto(`${baseURL}/cart`);
    await page.waitForLoadState('networkidle');

    return {
        success: result.success,
        message: result.message?.replace(/<[^>]*>/g, ''),
        productId,
        cartCount
    };
}

/**
 * Add multiple products to cart
 * @param {Page} page - Playwright page object
 * @param {Array} products - Array of {path, quantity} objects
 * @returns {Promise<Array>}
 */
async function addMultipleProducts(page, products) {
    const results = [];
    for (const product of products) {
        const result = await addProductToCartAPI(page, product.path, product.quantity || 1);
        results.push(result);
    }
    return results;
}

module.exports = {
    addProductToCartAPI,
    addMultipleProducts
};