# Mobile_Store_Management

This project is a comprehensive web-based application designed for managing a mobile shop. It includes features for creating mobile devices, managing customers and vendors, handling mobile purchases and sales, and generating related reports. The project supports both admin and user functionalities, with the admin being the only one capable of creating and managing user accounts.

## Project Structure

The project is organized as follows:

### 1. HTML Files

- **login.html**
  - **Path**: `Project/index.html`
  - **Purpose**: Provides a secure login interface for both admin and users. Only the admin can log in initially to create and manage user accounts.

- **asset/html/customer.html**
  - **Path**: `Project/asset/html/customer.html`
  - **Purpose**: Allows the admin to view, add, update, and delete customer information. Users can view customer details as permitted by the admin.

- **asset/html/desbord.html**
  - **Path**: `Project/asset/html/desbord.html`
  - **Purpose**: Serves as the main dashboard displaying key metrics and navigational links to other parts of the application for both admin and users.

- **asset/html/mobile.html**
  - **Path**: `Project/asset/html/mobile.html`
  - **Purpose**: Provides an optimized dashboard view for mobile devices, ensuring a responsive user experience for both admin and users.

- **asset/html/purchase.html**
  - **Path**: `Project/asset/html/purchase.html`
  - **Purpose**: Enables the admin to oversee and manage purchase transactions, including adding and updating purchase records. Users can view and interact with purchase data as permitted by the admin.

- **asset/html/report.html**
  - **Path**: `Project/asset/html/report.html`
  - **Purpose**: Displays various reports and analytics related to business operations, aiding in data-driven decision-making for both admin and users.

- **asset/html/sale.html**
  - **Path**: `Project/asset/html/sale.html`
  - **Purpose**: Allows the admin to manage sales transactions, view sales data, and generate sales reports. Users can view and interact with sales data as permitted by the admin.

### 2. CSS Files

Located in the `asset/css/` directory, these files provide the styling for different parts of the application:

- **customer.css**
  - **Path**: `Project/asset/css/customer.css`
  - **Purpose**: Styles for the customer management page, ensuring a consistent and professional look.

- **desbord.css**
  - **Path**: `Project/asset/css/desbord.css`
  - **Purpose**: Styles for the main dashboard page, enhancing the visual appeal and usability.

- **login.css**
  - **Path**: `Project/asset/css/login.css`
  - **Purpose**: Styles for the login page, providing a clean and user-friendly interface.

- **mobile.css**
  - **Path**: `Project/asset/css/mobile.css`
  - **Purpose**: Styles for the mobile-specific dashboard page, ensuring responsive design and usability on mobile devices.

- **purchase.css**
  - **Path**: `Project/asset/css/purchase.css`
  - **Purpose**: Styles for the purchase management page, ensuring clarity and ease of use.

- **report.css**
  - **Path**: `Project/asset/css/report.css`
  - **Purpose**: Styles for the reports page, enhancing readability and visual presentation of data.

- **sale.css**
  - **Path**: `Project/asset/css/sale.css`
  - **Purpose**: Styles for the sales management page, providing a clear and professional appearance.

### 3. JavaScript Files

Located in the `asset/js/` directory, these files contain the interactive functionality for different parts of the application:

- **customer.js**
  - **Path**: `Project/asset/js/customer.js`
  - **Purpose**: JavaScript for the customer management page, handling client-side logic for managing customer data for both admin and users.

- **dasbord.js**
  - **Path**: `Project/asset/js/dasbord.js`
  - **Purpose**: JavaScript for the main dashboard page, providing interactivity and data visualization for both admin and users.

- **login.js**
  - **Path**: `Project/asset/js/login.js`
  - **Purpose**: JavaScript for the login page, managing authentication and form validation for both admin and users.

- **mobile.js**
  - **Path**: `Project/asset/js/mobile.js`
  - **Purpose**: JavaScript for the mobile-specific dashboard page, ensuring smooth interactions on mobile devices for both admin and users.

- **navbar.js**
  - **Path**: `Project/asset/js/navbar.js`
  - **Purpose**: JavaScript for the navigation bar, handling menu interactions and navigation logic for both admin and users.

- **purchase.js**
  - **Path**: `Project/asset/js/purchase.js`
  - **Purpose**: JavaScript for the purchase management page, handling purchase records and transactions for both admin and users.

- **report.js**
  - **Path**: `Project/asset/js/report.js`
  - **Purpose**: JavaScript for the reports page, generating and displaying business reports for both admin and users.

- **sale.js**
  - **Path**: `Project/asset/js/sale.js`
  - **Purpose**: JavaScript for the sales management page, managing sales transactions and data for both admin and users.

## How to Run

To run this project, open the `login.html` file in your web browser. Ensure that all the associated CSS and JavaScript files are in the correct directories as outlined above.

# Pages Screenshort

## 1.Index Page
- **Username**: admin
- **Password**: admin
![image](https://github.com/user-attachments/assets/599f8786-ef2a-401d-94da-406342473b0a)

- **After Admin Login**
![image](https://github.com/user-attachments/assets/d134365c-2b21-4db3-adcb-b14e56fca333)

- **After clicking on New User**
![image](https://github.com/user-attachments/assets/795a2ae6-4551-4e70-837d-3a068d7dc227)

## 2.Mobile Page
![image](https://github.com/user-attachments/assets/5f63fc12-0298-4329-a318-0cdf0e376738)

- **After clicking on New Mobile**
![image](https://github.com/user-attachments/assets/283ac238-4e4c-4cd7-8605-6e812ab1ccd9)

## 3.Customer Page
![image](https://github.com/user-attachments/assets/ce19a6a4-c851-4aec-970f-da27595a1031)

- **After clicking on New Customer**
![image](https://github.com/user-attachments/assets/78b487c5-5f62-477e-a8de-15d583eb5d5f)

## 4.Purchase Page
![image](https://github.com/user-attachments/assets/0e95bc58-7cc1-46ad-8bd0-5334c2337bde)

- **After clicking on View**
![image](https://github.com/user-attachments/assets/bf28b897-c7df-4622-a292-ebf92fe0f167)

- **After clicking on New Purchase**
![image](https://github.com/user-attachments/assets/4987e0c7-5475-4d8b-9dfd-1f907af417ff)

## 5.Sale Page
![image](https://github.com/user-attachments/assets/bb1e705a-4812-4a82-959b-8bc9a4028d39)

- **After clicking on View**
![image](https://github.com/user-attachments/assets/bad183c3-03b7-4ce4-885c-f4b6db1a6da8)

- **After clicking on New Sale**
![image](https://github.com/user-attachments/assets/8aba6354-ff64-444f-82f7-ca27ec0a7916)

## 6.Report Page
![image](https://github.com/user-attachments/assets/1c128538-a2ee-4356-97fa-33b1d7ea1cf8)



















