import React, { useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Activity,
} from 'lucide-react';
import CampusSelector from './CampusSelector';

interface CampusStats {
  [key: string]: {
    totalAssets: string;
    requiresAttention: string;
    operational: string;
    pendingMaintenance: string;
    recentActivity: Array<{
      id: number;
      action: string;
      asset: string;
      location: string;
      timestamp: string;
    }>;
    upcomingMaintenance: Array<{
      id: number;
      task: string;
      location: string;
      timing: string;
      status: 'urgent' | 'upcoming' | 'scheduled';
    }>;
  };
}

const campusData: CampusStats = {
  funnab: {
    totalAssets: '3,247',
    requiresAttention: '15',
    operational: '3,128',
    pendingMaintenance: '104',
    recentActivity: [
      {
        id: 1,
        action: 'Generator Maintenance',
        asset: 'GEN-001',
        location: 'COLNAS Building',
        timestamp: '1 hour ago',
      },
      {
        id: 2,
        action: 'AC Repair Completed',
        asset: 'HVAC-238',
        location: 'COLERM Lab',
        timestamp: '3 hours ago',
      },
      {
        id: 3,
        action: 'Network Equipment Update',
        asset: 'NET-102',
        location: 'ICT Center',
        timestamp: '5 hours ago',
      },
    ],
    upcomingMaintenance: [
      {
        id: 1,
        task: 'Solar Panel Inspection',
        location: 'COLANIM Building',
        timing: 'Tomorrow',
        status: 'urgent',
      },
      {
        id: 2,
        task: 'Laboratory Equipment Service',
        location: 'COLPHYS',
        timing: 'Next Week',
        status: 'upcoming',
      },
      {
        id: 3,
        task: 'Elevator Maintenance',
        location: 'Senate Building',
        timing: 'In 2 Weeks',
        status: 'scheduled',
      },
    ],
  },
  ui: {
    totalAssets: '4,892',
    requiresAttention: '23',
    operational: '4,721',
    pendingMaintenance: '148',
    recentActivity: [
      {
        id: 1,
        action: 'Emergency Generator Repair',
        asset: 'GEN-UI-005',
        location: 'Kenneth Dike Library',
        timestamp: '30 mins ago',
      },
      {
        id: 2,
        action: 'Smart Board Installation',
        asset: 'SB-045',
        location: 'Faculty of Science',
        timestamp: '2 hours ago',
      },
      {
        id: 3,
        action: 'Water Treatment Service',
        asset: 'WTP-002',
        location: 'Mellanby Hall',
        timestamp: '4 hours ago',
      },
    ],
    upcomingMaintenance: [
      {
        id: 1,
        task: 'Central AC Maintenance',
        location: 'Senate Building',
        timing: 'Tomorrow',
        status: 'urgent',
      },
      {
        id: 2,
        task: 'Network Infrastructure Upgrade',
        location: 'Campus-wide',
        timing: 'Next Week',
        status: 'upcoming',
      },
      {
        id: 3,
        task: 'Sports Complex Equipment Service',
        location: 'Sports Center',
        timing: 'In 2 Weeks',
        status: 'scheduled',
      },
    ],
  },
  auchi: {
    totalAssets: '2,156',
    requiresAttention: '18',
    operational: '2,048',
    pendingMaintenance: '90',
    recentActivity: [
      {
        id: 1,
        action: 'Workshop Equipment Repair',
        asset: 'WS-021',
        location: 'Engineering Workshop',
        timestamp: '1 hour ago',
      },
      {
        id: 2,
        action: 'Projector Installation',
        asset: 'PRJ-112',
        location: 'Mass Comm Auditorium',
        timestamp: '3 hours ago',
      },
      {
        id: 3,
        action: 'Power Backup System Check',
        asset: 'UPS-015',
        location: 'Computer Center',
        timestamp: '6 hours ago',
      },
    ],
    upcomingMaintenance: [
      {
        id: 1,
        task: 'Workshop Machinery Service',
        location: 'Technical Workshop',
        timing: 'Tomorrow',
        status: 'urgent',
      },
      {
        id: 2,
        task: 'Library AC System Service',
        location: 'Central Library',
        timing: 'Next Week',
        status: 'upcoming',
      },
      {
        id: 3,
        task: 'Campus CCTV Maintenance',
        location: 'All Blocks',
        timing: 'In 2 Weeks',
        status: 'scheduled',
      },
    ],
  },
};

export default function Dashboard() {
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-yellow-100 text-yellow-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = selectedCampus ? [
    { 
      label: 'Total Assets', 
      value: campusData[selectedCampus].totalAssets, 
      icon: BarChart3,
      color: 'bg-blue-500' 
    },
    { 
      label: 'Requires Attention', 
      value: campusData[selectedCampus].requiresAttention, 
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    { 
      label: 'Operational', 
      value: campusData[selectedCampus].operational, 
      icon: CheckCircle2,
      color: 'bg-green-500'
    },
    { 
      label: 'Pending Maintenance', 
      value: campusData[selectedCampus].pendingMaintenance, 
      icon: Clock,
      color: 'bg-yellow-500'
    },
  ] : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <CampusSelector
        selectedCampus={selectedCampus}
        onCampusChange={setSelectedCampus}
      />

      {selectedCampus ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl md:text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {campusData[selectedCampus].recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">
                        {activity.asset} • {activity.location}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Upcoming Maintenance</h3>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {campusData[selectedCampus].upcomingMaintenance.map((maintenance) => (
                  <div
                    key={maintenance.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{maintenance.task}</p>
                      <p className="text-sm text-gray-500">{maintenance.location}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(maintenance.status)}`}>
                      {maintenance.timing}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Select a campus to view dashboard</h3>
          <p className="mt-2 text-sm text-gray-500">Choose a campus from above to see its assets and activities</p>
        </div>
      )}
    </div>
  );
}