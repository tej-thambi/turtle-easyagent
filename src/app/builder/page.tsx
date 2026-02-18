'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export default function BuilderPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [agentName, setAgentName] = useState('');

  const components = [
    { id: 'input', name: 'User Input', icon: '⌨️' },
    { id: 'response', name: 'AI Response', icon: '🤖' },
    { id: 'condition', name: 'Condition', icon: '🔀' },
    { id: 'action', name: 'Action', icon: '⚡' },
    { id: 'integration', name: 'Integration', icon: '🔗' },
    { id: 'feedback', name: 'Feedback', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-bold-neutral-50">
      <div className="max-w-7xl mx-auto px-lg py-2xl">
        {/* Header */}
        <div className="mb-2xl">
          <h1 className="text-4xl font-bold text-bold-neutral-900">
            Agent Builder
          </h1>
          <p className="text-bold-neutral-600 mt-sm">
            Design your AI agent by dragging and dropping components
          </p>
        </div>

        {/* Builder Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-xl">
          {/* Components Palette */}
          <Card className="h-fit">
            <h3 className="text-lg font-bold text-bold-neutral-900 mb-lg">
              Components
            </h3>
            <div className="space-y-md">
              {components.map((component) => (
                <div
                  key={component.id}
                  draggable
                  className="p-md bg-bold-primary-50 border border-bold-primary-200 rounded-lg cursor-move hover:bg-bold-primary-100 transition-colors"
                >
                  <div className="text-xl mb-xs">{component.icon}</div>
                  <p className="text-sm font-medium text-bold-neutral-900">
                    {component.name}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card className="min-h-96 bg-bold-neutral-50 border-2 border-dashed border-bold-neutral-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-md">📋</div>
                <p className="text-bold-neutral-600">
                  Drag components here to build your agent
                </p>
              </div>
            </Card>
          </div>

          {/* Properties */}
          <Card>
            <h3 className="text-lg font-bold text-bold-neutral-900 mb-lg">
              Properties
            </h3>
            <div className="space-y-lg">
              <Input
                label="Agent Name"
                placeholder="Enter agent name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              />
              <div>
                <label className="label">Agent Type</label>
                <select className="input">
                  <option>Customer Support</option>
                  <option>Lead Generation</option>
                  <option>Content Creation</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="label">Response Style</label>
                <select className="input">
                  <option>Friendly</option>
                  <option>Professional</option>
                  <option>Technical</option>
                </select>
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={() => setModalOpen(true)}
              >
                Save & Preview
              </Button>
            </div>
          </Card>
        </div>

        {/* Preview Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Agent Preview"
          size="lg"
          footer={
            <div className="flex gap-md justify-end">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Deploy Agent
              </Button>
            </div>
          }
        >
          <div className="space-y-md">
            <div>
              <p className="text-sm font-semibold text-bold-neutral-600">
                Agent Name
              </p>
              <p className="text-lg text-bold-neutral-900">
                {agentName || 'Unnamed Agent'}
              </p>
            </div>
            <div className="bg-bold-neutral-100 rounded-lg p-lg">
              <p className="text-sm text-bold-neutral-600">
                Agent configuration will be displayed here
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
