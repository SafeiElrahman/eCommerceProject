# Add to Cart Functionality Test Plan

## Application Overview

Comprehensive test plan for the Add to Cart functionality on the Automation Practice Site (https://practice.automationtesting.in/shop). This plan covers testing the e-commerce shopping cart workflow including product selection, adding items to cart, quantity management, price calculations, and checkout initiation. Tests follow the existing POM (Page Object Model) pattern used in the project.

## Test Scenarios

### 1. Add to Cart - Happy Path Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add single product to cart from shop page

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Navigate to shop page at https://practice.automationtesting.in/shop/
    - expect: Shop page loads successfully
    - expect: Product list is displayed
    - expect: Each product shows 'Add to basket' button
  2. Click the 'Add to basket' button for 'Android Quick Start Guide'
    - expect: Success message is displayed with product name
    - expect: Cart counter in header updates to show '1 item'
    - expect: Total price is updated in header
  3. Verify the success notification contains the product name
    - expect: Message shows 'Android Quick Start Guide' has been added to cart
    - expect: Success message is visible and readable

#### 1.2. Add product with sale price to cart

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Navigate to shop page
    - expect: Shop page loads successfully with product list
  2. Locate a product with sale badge (showing both original and discounted price)
    - expect: 'Thinking in HTML' product is visible
    - expect: Product shows original price ₹450.00 and sale price ₹400.00
  3. Click 'Add to basket' for the sale product
    - expect: Success message is displayed
    - expect: Cart is updated with sale price (₹400.00), not original price

#### 1.3. Add product to cart and verify cart totals

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add 'Mastering JavaScript' (₹350.00) to cart
    - expect: Product is added successfully
    - expect: Success message is displayed
  2. Click 'View basket' link in success message
    - expect: Cart/Basket page loads
    - expect: Product 'Mastering JavaScript' is listed
    - expect: Subtotal shows ₹350.00
  3. Verify tax calculation and total price
    - expect: Tax amount is calculated and displayed
    - expect: Total = Subtotal + Tax
    - expect: Price formatting uses ₹ currency symbol

#### 1.4. Add multiple different products to cart

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Navigate to shop page
    - expect: Shop page loads successfully
  2. Add 'Functional Programming in JS' (₹250.00) to cart
    - expect: Product added successfully
    - expect: Success message displayed
  3. Add 'HTML5 Forms' (₹280.00) to cart
    - expect: Second product added successfully
    - expect: Success message displayed for second product
  4. Navigate to basket and verify both products
    - expect: Basket contains both products
    - expect: Cart total shows combined price (₹250 + ₹280 + tax)

### 2. Add to Cart - Quantity & Updates

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add same product multiple times

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Navigate to shop page
    - expect: Shop page loads successfully
  2. Click 'Add to basket' for 'Selenium Ruby'
    - expect: Product added successfully
    - expect: Success message shown
  3. Click 'Add to basket' for 'Selenium Ruby' again
    - expect: Product added successfully (second time)
    - expect: Success message shown again
  4. Navigate to basket
    - expect: 'Selenium Ruby' appears once in basket
    - expect: Quantity field shows '2'
    - expect: Total price reflects quantity (₹500.00 × 2)

#### 2.2. Update product quantity in basket

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add a product to cart and navigate to basket
    - expect: Product is in basket with quantity 1
  2. Click on the quantity field (Qty spinbutton)
    - expect: Quantity field is editable/interactive
  3. Change quantity from 1 to 3
    - expect: Quantity field shows '3'
  4. Click 'Update Basket' button
    - expect: Basket updates with new quantity
    - expect: Total price is recalculated (price × 3)

#### 2.3. Verify cart counter updates with quantity changes

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add a product to cart and note the item count in header
    - expect: Header shows correct item count
  2. Add same product again
    - expect: Header item count increases
    - expect: Shows total number of items, not products

### 3. Add to Cart - Price Verification

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify individual product prices in cart

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add 'HTML5 WebApp Development' (₹180.00) to cart
    - expect: Product added successfully
  2. Navigate to basket
    - expect: Product price is displayed as ₹180.00
  3. Verify total price calculation (price × quantity)
    - expect: Total = ₹180.00 × 1 = ₹180.00

#### 3.2. Verify tax calculation in cart

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add products totaling ₹450.00 to cart
    - expect: Subtotal shows ₹450.00
  2. Check tax amount in cart totals section
    - expect: Tax is calculated and displayed
    - expect: Tax appears to be approximately 2% of subtotal
  3. Verify total = subtotal + tax
    - expect: Total price = ₹450.00 + tax amount

### 4. Add to Cart - Remove & Clear

**Seed:** `tests/seed.spec.ts`

#### 4.1. Remove product from cart

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add a product to cart and navigate to basket
    - expect: Product is in basket
  2. Click the 'Remove' button (×) for the product
    - expect: Product is removed from basket
    - expect: Basket becomes empty
    - expect: Cart counter shows '0 items'

#### 4.2. Verify cart behavior when empty

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add a product and then remove it from basket
    - expect: Product is removed
  2. Check basket page
    - expect: Basket shows empty state or 'Your basket is empty' message
    - expect: Cart total shows ₹0.00 or similar

### 5. Add to Cart - Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 5.1. Navigate to checkout from basket

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add a product to cart
    - expect: Product successfully added
  2. Navigate to basket
    - expect: Basket page loads with product
  3. Click 'Proceed to Checkout' button
    - expect: Checkout page loads successfully
    - expect: Product and price information is preserved

#### 5.2. Verify cart contents persist through navigation

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add 'Thinking in HTML' to cart
    - expect: Product added successfully
  2. Navigate back to shop page
    - expect: Shop page loads
  3. Check cart counter in header
    - expect: Cart still shows '1 item' and product price
  4. Add another product to the existing cart
    - expect: New product adds to existing cart
    - expect: Cart now shows 2 items

### 6. Add to Cart - Edge Cases & Validation

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify success message appears for each add-to-cart action

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add a product to empty cart
    - expect: Success message displays product name and 'added to cart' text
  2. Add another product to cart
    - expect: New success message appears (not same as previous)
    - expect: Message shows the newly added product name

#### 6.2. Add products in different price ranges

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Add cheapest product 'JS Data Structures' (₹150.00)
    - expect: Product added successfully
  2. Add most expensive product 'Selenium Ruby' (₹500.00)
    - expect: Product added successfully
  3. Navigate to basket and verify both prices
    - expect: Both products displayed with correct prices
    - expect: Total = ₹150 + ₹500 + tax

#### 6.3. Test cart with all product categories

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Navigate to shop page
    - expect: Shop page shows products from Android, HTML, JavaScript, and Selenium categories
  2. Add one product from each category: Android (Android Quick Start Guide), HTML (HTML5 Forms), JavaScript (Mastering JavaScript), Selenium (Selenium Ruby)
    - expect: All 4 products add to cart successfully
  3. Verify basket contains all 4 products
    - expect: All products listed in basket with correct prices

#### 6.4. Verify add-to-cart button state and accessibility

**File:** `tests/TestCases/addToCart.spec.js`

**Steps:**
  1. Inspect the 'Add to basket' buttons on the shop page
    - expect: All buttons are visible and clickable
    - expect: Buttons are properly labeled as 'Add to basket'
  2. Click multiple 'Add to basket' buttons in rapid succession
    - expect: All products add successfully
    - expect: No duplicate entries or errors
