'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function DashboardPage() {
  const agents = [
    {
      id: 1,
      name: 'Customer Support Bot',
      status: 'active',
      interactions: 1234,
      lastUpdate: '2 hours ago',
    },
    {
      id: 2,
      name: 'Lead Qualification Agent',
      status: 'active',
      interactions: 567,
      lastUpdate: '1 hour ago',
    },
    {
      id: 3,
      name: 'Content Generator',
      status: 'inactive',
      interactions: 89,
      lastUpdate: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-bold-neutral-50">
      <div className="max-w-7xl mx-auto px-lg py-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-2xl">
          <div>
            <h1 className="text-4xl font-bold text-bold-neutral-900">
              Dashboard
            </h1>
            <p className="text-bold-neutral-600 mt-sm">
              Manage and monitor your AI agents
            </p>
          </div>
          <Button variant="primary" size="lg" href="/builder">
            Create New Agent
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mb-2xl">
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-bold-primary-500 mb-sm">
                3
              </div>
              <p className="text-bold-neutral-600">Active Agents</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-bold-success-500 mb-sm">
                1.8K
              </div>
              <p className="text-bold-neutral-600">Total Interactions</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-bold-info-500 mb-sm">
                94%
              </div>
              <p className="text-bold-neutral-600">Success Rate</p>
            </div>
          </Card>
        </div>

        {/* Agents Table */}
        <Card header={<h2 className="text-xl font-bold text-bold-neutral-900">Your Agents</h2>}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bold-neutral-200">
                  <th className="text-left py-md px-lg font-semibold text-bold-neutral-900">
                    Name
                  </th>
                  <th className="text-left py-md px-lg font-semibold text-bold-neutral-900">
                    Status
                  </th>
                  <th className="text-left py-md px-lg font-semibold text-bold-neutral-900">
                    Interactions
                  </th>
                  <th className="text-left py-md px-lg font-semibold text-bold-neutral-900">
                    Last Update
                  </th>
                  <th className="text-right py-md px-lg font-semibold text-bold-neutral-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b border-bold-neutral-100 hover:bg-bold-neutral-50 transition-colors">
                    <td className="py-md px-lg font-medium text-bold-neutral-900">
                      {agent.name}
                    </td>
                    <td className="py-md px-lg">
                      <span className={`inline-block px-md py-xs rounded-full text-xs font-semibold ${
                        agent.status === 'active'
                          ? 'bg-bold-success-100 text-bold-success-700'
                          : 'bg-bold-neutral-200 text-bold-neutral-600'
                      }`}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-md px-lg text-bold-neutral-600">
                      {agent.interactions}
                    </td>
                    <td className="py-md px-lg text-bold-neutral-600 text-sm">
                      {agent.lastUpdate}
                    </td>
                    <td className="py-md px-lg text-right">
                      <div className="flex gap-sm justify-end">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
