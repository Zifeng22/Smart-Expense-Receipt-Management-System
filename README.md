**💰 Smart Expense Tracker**

A full-stack expense tracking web application built with Spring Boot and Vanilla JavaScript, designed to help users manage personal finances, track spending, and visualize financial data through interactive dashboards and charts.

****
**🚀 Live Features**

🔐 User login & registration system

💸 Add, edit, and delete expenses

🔎 Smart filtering (date, category, amount range)

📊 Interactive dashboard analytics

📈 Expense visualization (line & pie charts)

💱 Multi-currency display system

💾 Persistent user session using localStorage


****
**🛠 Tech Stack**

**Frontend**

HTML5

CSS3 / Bootstrap 5

JavaScript (ES6)

Chart.js


    

**Backend**

Java

Spring Boot

Spring Data JPA

RESTful APIs

MySQL


****
**💱 Currency System**

The application supports multiple currencies for display purposes.


MYR (Base reference currency)

USD ($)

SGD (S$)

JPY (¥)


All expense values are stored in USD format in the database and converted dynamically in the UI based on user selection.


const rates = {

    MYR: 1,
    
    USD: 0.24,
    
    SGD: 0.32,
    
    JPY: 27.5
    
};

****
**📊 Dashboard Overview**

The dashboard provides real-time financial insights:


Total expenses

Monthly spending trends

Highest spending category

Total transaction count

Budget tracking progress bar

****
**📁 Expense Management**

Users can:


Create new expense entries

Update existing records

Delete unwanted expenses

View all transactions in a structured table


Each expense includes:

Date

Category

Description

Amount

****
**🔎 Filtering System**

Advanced client-side filtering:


Filter by date

Filter by category

Filter by minimum / maximum amount

Filters update results instantly without page reload.

****
**📈 Data Visualization**

The system includes dynamic charts powered by Chart.js:


📉 Monthly expense trend (Line chart)

🥧 Category distribution (Pie chart)

Charts update automatically based on filtered data.

****
**🧠 System Design**

Frontend communicates with backend via REST API

Data stored in MySQL database

User session stored in browser localStorage

Currency conversion handled in frontend layer

****
**📡 API Endpoints**

Method	Endpoint	Description

POST	/login	User login

POST	/register	User registration

GET	/expenses/{userId}	Get all expenses

POST	/expenses	Create expense

PUT	/expenses/{id}	Update expense

DELETE	/expenses/{id}	Delete expense

****
**⚙️ Key Highlights**

Responsive UI using Bootstrap 5

Modular JavaScript architecture

Real-time UI updates without refresh

Clean REST API integration

Interactive data visualization

****
**📌 Future Improvements**

JWT authentication security

Backend-based currency conversion

Export reports (PDF / Excel)

Mobile app version (Flutter / React Native)

Advanced analytics (AI spending prediction)

****
**👨‍💻 Author**

Smart Expense Tracker Project

Built as a personal full-stack learning project.

