import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function DashboardPage() {
  const agents = [
    {
      id: 1,
      name: 'Email Assistant',
      status: 'active',
      tasks: 1_234,
      lastRun: '2 minutes ago',
    },
    {
      id: 2,
      name: 'Data Processor',
      status: 'active',
      tasks: 5_678,
      lastRun: '15 minutes ago',
    },
    {
      id: 3,
      name: 'Chat Bot',
      status: 'idle',
      tasks: 892,
      lastRun: '1 hour ago',
    },
  ];

  const stats = [
    { label: 'Active Agents', value: '2', color: 'text-pink' },
    { label: 'Total Tasks', value: '7,804', color: 'text-purple' },
    { label: 'Success Rate', value: '98.5%', color: 'text-amber' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-dark-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your AI agents</p>
          </div>
          <Link href="/agent-builder">
            <Button size="lg" bold>
              + New Agent
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} variant="default" elevated>
              <CardContent>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className={`text-4xl font-extrabold mt-2 ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Agents List */}
        <Card variant="default" elevated>
          <CardHeader>
            <CardTitle>Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg text-dark-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">
                      {agent.tasks.toLocaleString()} tasks • Last run: {agent.lastRun}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        agent.status === 'active'
                          ? 'bg-bold-success-100 text-bold-success-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {agent.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
