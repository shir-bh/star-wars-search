# Star Wars Search Application

## Overview

The Star Wars Search Application is a React-based web app that allows users to search for Star Wars entities (people, planets, starships, etc.) and view the results categorized accordingly. Users can navigate to individual category pages, where they can see the results, and have the ability to edit, delete, and add new entries.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies required for the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Application Content

- **Search Page**: 
  - Provides a search input and displays results categorized by type.
  - Each category shows a few results with a "View All" button linking to the category page.

- **Category Pages**:
  - Displays all results for the selected category in a paginated table.
  - Features include inline editing, deleting, and adding new entries.

## Usage

1. **Search for Entities**:
   - Use the search input on the main page to search for Star Wars entities.
   - Results will be displayed under their respective categories.

2. **View Category Results**:
   - Click on "View All" under any category to see all results for that category.

3. **Edit Entries**:
   - Inline edit functionality allows you to modify entries directly within the table.
   - To save press on the edit button again.
   - Changes are local and not persisted across refreshes.

4. **Delete Entries**:
   - Use the delete button to remove entries from the list.

5. **Add New Entries**:
   - Use the "Create" button above the table to add new entries.
   - Newly added entries are local and not persisted across refreshes.
     
