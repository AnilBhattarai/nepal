import React from 'react';
import SideMenu from '../Components/SideMenu';
import AdminLoginLog from '../../../UserLoginLogs';

function AdminLoginLogs() {
  return (
    <div className="flex justify-between py-4">
      <div className="w-1/4 bg-white rounded shadow">
        <SideMenu />
      </div>
      <div className="w-3/4 bg-white rounded ml-2 p-4 shadow">
        <AdminLoginLog />
      </div>
    </div>
  );
}
export default AdminLoginLogs;
