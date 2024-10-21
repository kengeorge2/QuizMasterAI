import React, { useState } from 'react';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { User } from '../types/user';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', email: 'john@example.com', role: 'teacher', displayName: 'John Doe' },
    { id: '2', email: 'jane@example.com', role: 'student', displayName: 'Jane Smith' },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    email: '',
    role: 'student',
    displayName: '',
  });

  const handleCreateUser = () => {
    const user: User = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers([...users, user]);
    setShowCreateForm(false);
    setNewUser({
      email: '',
      role: 'student',
      displayName: '',
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">User Management</h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <PlusCircle className="mr-2" size={18} />
          Create User
        </button>
      </div>
      {showCreateForm && (
        <div className="mb-4 p-4 border rounded">
          <h4 className="text-lg font-semibold mb-2">Create New User</h4>
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Display Name"
            value={newUser.displayName}
            onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleCreateUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      )}
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{user.displayName}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">Role: {user.role}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;