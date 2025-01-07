# Kickstarter Projects Table - Frontend Assignment

## Overview
This project fetches details of highly-rated Kickstarter projects and displays them in a paginated table format. The project uses React for the frontend and Axios to make AJAX calls to an external API to fetch the required data.

The table displays the following information for each project:
- **S.No.**: Serial Number of the project (pagination-based)
- **Percentage Funded**: The percentage of funding achieved by the project.
- **Amount Pledged**: The total amount pledged for the project.

## Requirements

### Functional Requirements:
- Fetch the details of Kickstarter projects from the API:  
  [Kickstarter API JSON](https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json)
- Display the following details for each project:
  1. **S.No.** (Serial Number)
  2. **Percentage Funded**
  3. **Amount Pledged**
  
- The table should be paginated with a maximum of **5 records per page**.
- Pagination should work correctly:
  - Show the correct page number.
  - Disable navigation buttons when the user is on the first or last page.
- The UI should be aesthetically pleasing, with styling resembling modern e-commerce websites (e.g., Amazon, Flipkart).
- The page should gracefully handle edge cases such as:
  - Empty data from the API.
  - Handling the last page and preventing users from going past it.
  
### Non-Functional Requirements:
- Responsive design that works on mobile and desktop devices.
- Clear loading/error messages when fetching data or if there are issues with the API.

## Setup

### Prerequisites:
- Node.js and npm (Node Package Manager) should be installed.

### Installation:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open the app in a browser at [http://localhost:3000](http://localhost:3000).

## Functionality

### Data Fetching
The data is fetched from an external API (`https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json`) using Axios in the `useEffect` hook. The response contains an array of project objects, which is then stored in the component's state.

### Pagination
- Pagination logic is implemented to show only **5 records per page**.
- The page number and navigation buttons (`Previous`, `Next`) are dynamically updated based on the current page.
- When the user clicks `Next`, it increments the page number if it is not the last page.
- The `Previous` button works similarly, decrementing the page number if it is not the first page.

### Error Handling
- A loading state (`Loading...`) is displayed while fetching data.
- If an error occurs (e.g., API failure), an error message is shown to the user.
- If the data fetched from the API is empty or doesn't match the expected structure, an error message is displayed.

### UI/UX Design
The layout is designed to resemble modern e-commerce websites like Amazon or Flipkart, with:
- A clean and responsive design.
- Paginated table with clear distinction for each row.
- Interactive buttons with hover and disabled states for pagination.
  
## Key Code Insights:
- **useState** and **useEffect** hooks are used for managing component state and fetching data from the API.
- **Axios** is used to handle asynchronous API requests.
- The component is fully styled with inline CSS for better control and responsiveness.
- **Pagination logic** handles slicing of records based on the current page and limits the records to 5 per page.

## Example Output

| S.No. | Percentage Funded | Amount Pledged |
|-------|-------------------|----------------|
| 1     | 186               | 15283          |
| 2     | 230               | 18700          |
| 3     | 120               | 13500          |
| 4     | 50                | 5000           |
| 5     | 89                | 11200          |

## Technologies Used
- **React**: JavaScript library for building the user interface.
- **Axios**: For making HTTP requests.
- **CSS**: For styling the application.
