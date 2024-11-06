import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, Users, Building2, Shield } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const menuItems = [
  {
    label: 'Profile Settings',
    icon: Settings,
    path: '/settings/profile',
    allowedRoles: ['campus_admin', 'maintenance_supervisor', 'technician', 'staff']
  },
  {
    label: 'User Management',
    icon: Users,
    path: '/settings/users',
    allowedRoles: ['campus_admin']
  },
  {
    label: 'Campus Management',
    icon: Building2,
    path: '/settings/campuses',
    allowedRoles: ['campus_admin']
  },
  {
    label: 'Access Control',
    icon: Shield,
    path: '/settings/access',
    allowedRoles: ['campus_admin']
  }
];

export default function SettingsLayout() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 space-y-1">
          {menuItems.map((item) => {
            if (!user?.role || !item.allowedRoles.includes(user.role)) return null;
            
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </aside>

        {/* Settings Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}