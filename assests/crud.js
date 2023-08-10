    const todoForm = document.getElementById("todoForm");
    const todoTable = document.getElementById("todoTable").getElementsByTagName('tbody')[0];

    const apiUrl = "https://jsonplaceholder.typicode.com/todos";

    // Function to fetch all todos and populate the table
    function fetchTodos() {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((todos) => {
          todoTable.innerHTML = "";
          todos.forEach((todo) => {
            todoTable.innerHTML += `
              <tr data-id="${todo.id}">
                <td>${todo.id}</td>
                <td>${todo.title}</td>
                <td>
                  <button onclick="editTodo(${todo.id})">Edit</button>
                  <button onclick="deleteTodo(${todo.id})">Delete</button>
                </td>
              </tr>
            `;
          });
        })
        .catch((error) => console.error("Error fetching todos:", error));
    }

    // Function to add a new todo
    function addTodo() {
      const title = document.getElementById("title").value;
      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
        title: title,
        completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          fetchTodos();
        })
        .catch((error) => console.error("Error adding todo:", error));
    }

    // Function to update an existing todo
    function updateTodo(id, title) {
      fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          fetchTodos();
        })
        .catch((error) => console.error("Error updating todo:", error));
    }

    // Function to delete a todo
    function deleteTodo(id) {
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          fetchTodos();
        })
        .catch((error) => console.error("Error deleting todo:", error));
    }

    // Event listener for form submission to add new todo
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addTodo();
      todoForm.reset();
    });

    // Function to handle the edit of a todo
    function editTodo(id) {
      const row = document.querySelector(`[data-id="${id}"]`);
      const titleCell = row.querySelector("td:nth-child(2)");
      const title = titleCell.textContent;
      const newTitle = prompt("Edit Todo:", title);
      if (newTitle !== null && newTitle !== "") {
        updateTodo(id, newTitle);
      }
    }

    // Initial fetch of todos when the page loads
    fetchTodos();