import React from 'react';
import { Building2 } from 'lucide-react';
import { Campus } from '../types';

interface CampusSelectorProps {
  selectedCampus: string | null;
  onCampusChange: (campusId: string) => void;
}

const mockCampuses: Campus[] = [
  {
    id: 'funnab',
    name: 'FUNNAB',
    location: 'Alabata Road, Abeokuta',
    address: 'Federal University of Agriculture, Abeokuta, Ogun State',
    adminIds: ['1'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ui',
    name: 'University of Ibadan',
    location: 'Ibadan, Oyo State',
    address: 'University of Ibadan, Ibadan, Oyo State',
    adminIds: ['2'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'auchi',
    name: 'Auchi Polytechnic',
    location: 'Auchi, Edo State',
    address: 'Auchi Polytechnic, Auchi, Edo State',
    adminIds: ['3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function CampusSelector({ selectedCampus, onCampusChange }: CampusSelectorProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-medium text-gray-900">Select Campus</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCampuses.map((campus) => (
          <button
            key={campus.id}
            onClick={() => onCampusChange(campus.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCampus === campus.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-medium text-gray-900">{campus.name}</h4>
            <p className="text-sm text-gray-500">{campus.location}</p>
          </button>
        ))}
      </div>
    </div>
  );
}