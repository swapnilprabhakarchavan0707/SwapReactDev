import React from 'react';
import { useAppContext } from '../../context/AppContext';

const UsersManagement = () => {
  const { users } = useAppContext();
  const customerUsers = users.filter(u => u.role === 'customer');

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Member Since</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Active Loans</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {customerUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.memberSince}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.activeLoans}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;