//Adds an event listener that is a click to the "Add" button 
document.getElementById('addButton').addEventListener('click', function() { 
//Assings the variable "itemName" the input by the user on the input field      
    const input = document.getElementById('itemsInput');   
    const itemName = input.value;

if (itemName) {
      const listItem = document.createElement('li');// Create a new list item (li)
      const span = document.createElement('span');// Create the span to display the item name
      span.textContent = itemName;
      const markPurchasedButton = document.createElement('button');// Creates the "Mark Purchased" button
      markPurchasedButton.textContent = 'Mark Purchased';
      markPurchasedButton.classList.add('mark-purchased-btn');
      markPurchasedButton.addEventListener('click', function() { // Add event listener to the "Mark Purchased" button
      listItem.classList.toggle('purchased');// Toggle the "purchased" class on the list item
            
            
if (listItem.classList.contains('purchased')) {
      markPurchasedButton.textContent = 'Purchased!';//Button displays the word "Purchased!" once the button is clicked
} else {
      markPurchasedButton.textContent = 'Mark Purchased';
}
});

    listItem.appendChild(span);//Appends the span to the list item
    listItem.appendChild(markPurchasedButton);//Appends the "Mark Purchased" button to the list item
    document.getElementById('itemsDisplay').appendChild(listItem);//Appends items added through the input field to the list

input.value = '';//Clears the input fiels once one item is added to the list
}
});

//Adds an event listener to the "Clear List" button
document.getElementById('clearList').addEventListener('click', function() {
document.getElementById('itemsDisplay').innerHTML = '';//Clears the list
});

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

          listItem.appendChild(span);
          listItem.appendChild(markPurchasedButton);
          itemsDisplay.appendChild(listItem);
      });
  }