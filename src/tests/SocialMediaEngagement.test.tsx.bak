
import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialMediaEngagement from '../components/reports/social-media/SocialMediaEngagement';
import { engagementData } from '../components/reports/social-media/mock-data';

// Mock do recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: ({ dataKey, name, fill }: { dataKey: string, name: string, fill: string }) => (
    <div data-testid={`bar-${dataKey}`} data-name={name} style={{ backgroundColor: fill }}></div>
  ),
  XAxis: ({ dataKey }: { dataKey: string }) => <div data-testid="x-axis" data-key={dataKey}></div>,
  YAxis: () => <div data-testid="y-axis"></div>,
  CartesianGrid: ({ strokeDasharray }: { strokeDasharray: string }) => (
    <div data-testid="cartesian-grid" data-dash={strokeDasharray}></div>
  ),
  Tooltip: () => <div data-testid="tooltip"></div>,
  Legend: () => <div data-testid="legend"></div>,
}));

describe('SocialMediaEngagement', () => {
  it('renders the chart component correctly', () => {
    render(<SocialMediaEngagement data={engagementData} />);
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('renders all required chart elements', () => {
    render(<SocialMediaEngagement data={engagementData} />);
    
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  it('renders the correct data bars', () => {
    render(<SocialMediaEngagement data={engagementData} />);
    
    expect(screen.getByTestId('bar-engagementRate')).toBeInTheDocument();
    expect(screen.getByTestId('bar-comments')).toBeInTheDocument();
    expect(screen.getByTestId('bar-shares')).toBeInTheDocument();
  });

  it('applies correct labels to the bars', () => {
    render(<SocialMediaEngagement data={engagementData} />);
    
    expect(screen.getByTestId('bar-engagementRate')).toHaveAttribute('data-name', 'Taxa de Engajamento (%)');
    expect(screen.getByTestId('bar-comments')).toHaveAttribute('data-name', 'Comentários');
    expect(screen.getByTestId('bar-shares')).toHaveAttribute('data-name', 'Compartilhamentos');
  });
});
