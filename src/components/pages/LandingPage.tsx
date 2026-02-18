import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';

export function LandingPage() {
  const features = [
    {
      icon: '🚀',
      title: 'Quick Setup',
      description: 'Launch your AI agents in minutes with our intuitive builder interface',
    },
    {
      icon: '🧠',
      title: 'Intelligent Automation',
      description: 'Harness the power of AI to automate complex tasks and workflows',
    },
    {
      icon: '📊',
      title: 'Real-time Monitoring',
      description: 'Track agent performance with detailed analytics and insights',
    },
    {
      icon: '🔄',
      title: 'Continuous Learning',
      description: 'Agents improve over time by learning from interactions',
    },
    {
      icon: '🛡️',
      title: 'Enterprise Security',
      description: 'Bank-grade security and compliance for sensitive operations',
    },
    {
      icon: '🌐',
      title: 'Global Scale',
      description: 'Deploy agents across regions with automatic load balancing',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <span className="inline-flex items-center gap-2 bg-pink/10 text-pink font-bold text-sm px-4 py-2 rounded-full">
              ✨ Welcome to the Future of Automation
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-dark-900 mb-6 leading-tight">
            Build AI Agents <span className="bg-gradient-pink-purple bg-clip-text text-transparent">Effortlessly</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Create, deploy, and manage intelligent AI agents without complex coding. EasyAgent makes automation accessible to everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/dashboard">
              <Button size="lg" bold>
                Get Started Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" bold>
              Watch Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="bg-gradient-to-br from-pink/20 via-purple/20 to-amber/20 rounded-3xl p-12 border border-pink/10 shadow-bold-lg">
            <div className="bg-dark-900 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-white text-lg font-semibold">Agent Builder Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-dark-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">Everything you need to build and manage AI agents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} variant="default" elevated>
                <CardContent>
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-dark-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card variant="gradient" elevated>
            <CardContent>
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-white mb-4">
                  Ready to automate?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of teams building the future with intelligent AI agents.
                </p>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" bold>
                    Start Building Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
