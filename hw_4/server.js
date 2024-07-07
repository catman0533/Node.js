const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Helper function to read users from file
const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write users to file
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// Get all users
app.get('/users', (req, res) => {
  const users = readUsersFromFile();
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
  const users = readUsersFromFile();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body,
  };
  users.push(newUser);
  writeUsersToFile(users);
  res.status(201).json(newUser);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;
  writeUsersToFile(users);
  res.json(updatedUser);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const updatedUsers = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length === updatedUsers.length) {
    return res.status(404).json({ message: 'User not found' });
  }
  writeUsersToFile(updatedUsers);
  res.status(204).send();
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
