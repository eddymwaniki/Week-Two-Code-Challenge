// Adds an event listener to the "Add" button.
document.getElementById('addButton').addEventListener('click', function () {
      //This fucntion holds the value of the items written in the input field
      const input = document.getElementById('itemsInput');
      const itemName = input.value;
  
      if (itemName) { //Checks if the value entered in the input field is valid
          const listItem = document.createElement('li'); // Create a new list item (li)
          const span = document.createElement('span'); // Create the span to display the item name
          span.textContent = itemName;
  
          const markPurchasedButton = document.createElement('button');// Creates the Mark Purchased button
          markPurchasedButton.textContent = 'Mark Purchased';//The button displays the text "Mark Purchased"
          markPurchasedButton.classList.add('mark-purchased-btn');//Enables us to edit the Mark Purchased button in CSS
          markPurchasedButton.addEventListener('click', function () { //Adds event listener to the Mark Purchase button
              listItem.classList.toggle('purchased'); // Adds visual indicator that the item is bought
              markPurchasedButton.textContent = listItem.classList.contains('purchased') ? 'Purchased!' : 'Mark Purchased';
              saveList(); // If item is purchased the button will display "Purchased!" if not the button will display "Mark Purchased"
          });
  
          const editButton = document.createElement('button');// Create the "Edit" button
          editButton.textContent = 'Edit';//Edit button will display the word "Edit"
          editButton.classList.add('edit-btn');//Enables us to edit the button style on css
          editButton.addEventListener('click', function () {//Adds event listener to the "Edit" button
              const editInput = document.createElement('input'); // Create an input field to edit the item
              editInput.type = 'text';//What type of input to be put in the edit input field
              editInput.value = span.textContent; // Takes whatever is in the list and assings the value of editInput.value
              listItem.insertBefore(editInput, span);
              listItem.removeChild(span); // Remove the existing span
  
              // Replace the "Edit" button with a "Save" button
              editButton.textContent = 'Save';//What the edit button displays
              editButton.removeEventListener('click', arguments.callee); // Remove current event listener that was letting user edit the list item
              editButton.addEventListener('click', function () {// This event listener now saves the new list item
              span.textContent = editInput.value;
                  listItem.insertBefore(span, editInput);
                  listItem.removeChild(editInput); // Remove the input field
                  editButton.textContent = 'Edit'; // Revert button to "Edit"
                  saveList(); // Save the updated list
              });
          });
  
          // Append elements to the list item
          listItem.appendChild(span);
          listItem.appendChild(markPurchasedButton);
          listItem.appendChild(editButton);
          document.getElementById('itemsDisplay').appendChild(listItem); // Append to the list display
  
          input.value = ''; // Clear the input field
          saveList(); // Save the updated list
      }
  });
  
  // Adds an event listener to the "Clear List" button
  document.getElementById('clearList').addEventListener('click', function () {
      document.getElementById('itemsDisplay').innerHTML = ''; // Clear the list
      localStorage.removeItem('shoppingList'); // Clear the saved list
  });
  
  function saveList() {
      const items = [];//Array that holds the shopping list items
      document.querySelectorAll('#itemsDisplay li').forEach(item => {
          const itemName = item.querySelector('span').textContent;
          const isPurchased = item.classList.contains('purchased');
          items.push({ name: itemName, purchased: isPurchased });
      });
      localStorage.setItem('shoppingList', JSON.stringify(items));
  }
  
  // Function to load the shopping list from localStorage
  function loadList() {
      const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
      savedItems.forEach(item => {
          const listItem = document.createElement('li');
          const span = document.createElement('span');
          span.textContent = item.name;
  
          const markPurchasedButton = document.createElement('button');
          markPurchasedButton.textContent = item.purchased ? 'Purchased!' : 'Mark Purchased';
          markPurchasedButton.classList.add('mark-purchased-btn');
          if (item.purchased) {
              listItem.classList.add('purchased');
          }
  
          markPurchasedButton.addEventListener('click', function () {
              listItem.classList.toggle('purchased');
              markPurchasedButton.textContent = listItem.classList.contains('purchased') ? 'Purchased!' : 'Mark Purchased';
              saveList(); // Save the updated list
          });
  
          // Add Edit button
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.classList.add('edit-btn');
          editButton.addEventListener('click', function () {
              const editInput = document.createElement('input');
              editInput.type = 'text';
              editInput.value = span.textContent;
              listItem.insertBefore(editInput, span);
              listItem.removeChild(span);
              editButton.textContent = 'Save';
              editButton.addEventListener('click', function () {
                  span.textContent = editInput.value;
                  listItem.insertBefore(span, editInput);
                  listItem.removeChild(editInput);
                  editButton.textContent = 'Edit';
                  saveList();
              }, { once: true });
          });
  
          listItem.appendChild(span);
          listItem.appendChild(markPurchasedButton);
          listItem.appendChild(editButton);
          document.getElementById('itemsDisplay').appendChild(listItem);
      });
  }
  
  // Load the list when the page loads
  document.addEventListener('DOMContentLoaded', loadList);
  