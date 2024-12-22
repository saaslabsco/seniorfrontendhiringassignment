#!/bin/bash

echo "Removing Cypress from the project..."

# Uninstall Cypress
if npm uninstall cypress; then
    echo "Cypress successfully uninstalled."
else
    echo "Failed to uninstall Cypress. Exiting."
    exit 1
fi

# Remove Cypress configuration file
if [ -f "cypress.config.js" ]; then
    rm cypress.config.js
    echo "Removed cypress.config.js"
fi

# Remove Cypress environment file
if [ -f ".cypress.env.json" ]; then
    rm .cypress.env.json
    echo "Removed .cypress.env.json"
fi

# Remove Cypress folder
if [ -d "cypress" ]; then
    rm -rf cypress
    echo "Removed cypress/ folder."
fi

# Remove Cypress-related scripts from package.json
if [ -f "package.json" ]; then
    echo "Cleaning up Cypress scripts in package.json..."
    npx json -I -f package.json -e "delete this.scripts['test:cypress']; delete this.scripts['test:cypress:run']"
    echo "Cleaned up package.json."
fi

# Remove residual files
echo "Cleaning up node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Inform about CI configurations
echo "Reminder: Please manually check and remove Cypress-related steps from CI/CD workflows if present (e.g., GitHub Actions or GitLab CI)."

echo "Cypress has been completely removed from your project!"

