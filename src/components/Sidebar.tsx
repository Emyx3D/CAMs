import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Zap,
  Thermometer,
  Shield,
  Wifi,
  Car,
  Armchair,
  TestTube2,
  Wrench,
  Settings,
  X,
} from 'lucide-react';
import type { AssetCategory } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<AssetCategory, React.ReactNode> = {
  buildings: <Building2 className="w-5 h-5" />,
  electrical: <Zap className="w-5 h-5" />,
  hvac: <Thermometer className="w-5 h-5" />,
  safety: <Shield className="w-5 h-5" />,
  it: <Wifi className="w-5 h-5" />,
  vehicles: <Car className="w-5 h-5" />,
  furniture: <Armchair className="w-5 h-5" />,
  specialized: <TestTube2 className="w-5 h-5" />,
  maintenance: <Wrench className="w-5 h-5" />,
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-900 text-white z-40
        transform transition-transform duration-300 ease-in-out md:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6" />
              CAMS
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <a
                key={category}
                href={`#${category}`}
                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
              >
                {icon}
                <span className="capitalize">{category}</span>
              </a>
            ))}
            
            <hr className="border-gray-700 my-4" />
            
            <a
              href="#settings"
              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                if (window.innerWidth < 768) {
                  onClose();
                }
              }}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </aside>
    </>
  );
}