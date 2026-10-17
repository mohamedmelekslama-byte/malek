// Local Storage User Database Helper

const USERS_KEY = 'db_users';

export function getUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading user database:', error);
    return [];
  }
}

export function registerUser(name, email, password) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password;

  if (!trimmedName || !trimmedEmail || !trimmedPassword) {
    return { success: false, error: 'All fields are required.' };
  }

  const users = getUsers();
  const exists = users.some(u => u.email === trimmedEmail);

  if (exists) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser = {
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword,
    createdAt: new Date().toISOString()
  };

  try {
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, user: { name: trimmedName, email: trimmedEmail } };
  } catch (error) {
    console.error('Error writing user registration:', error);
    return { success: false, error: 'Database error. Please try again later.' };
  }
}

export function authenticateUser(email, password) {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password;

  if (!trimmedEmail || !trimmedPassword) {
    return { success: false, error: 'Email and password are required.' };
  }

  const users = getUsers();
  const user = users.find(u => u.email === trimmedEmail);

  if (!user) {
    return { success: false, error: 'No account found with this email.' };
  }

  if (user.password !== trimmedPassword) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  return { success: true, user: { name: user.name, email: user.email } };
}
