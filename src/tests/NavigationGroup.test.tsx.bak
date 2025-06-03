
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationGroup from '../components/sidebar/NavigationGroup';

// Mock do componente Collapsible
jest.mock('@/components/ui/collapsible', () => ({
  Collapsible: ({ defaultOpen, children }: { defaultOpen: boolean, children: React.ReactNode }) => (
    <div data-testid="collapsible" data-default-open={defaultOpen}>{children}</div>
  ),
  CollapsibleTrigger: ({ className, children }: { className: string, children: React.ReactNode }) => (
    <button data-testid="collapsible-trigger" className={className}>{children}</button>
  ),
  CollapsibleContent: ({ className, children }: { className: string, children: React.ReactNode }) => (
    <div data-testid="collapsible-content" className={className}>{children}</div>
  ),
}));

describe('NavigationGroup', () => {
  it('renders with title correctly', () => {
    render(
      <NavigationGroup title="Test Group">
        <div>Test Content</div>
      </NavigationGroup>
    );
    
    expect(screen.getByText('Test Group')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with icon when provided', () => {
    const TestIcon = () => <svg data-testid="test-icon" />;
    
    render(
      <NavigationGroup title="Test Group" icon={TestIcon}>
        <div>Test Content</div>
      </NavigationGroup>
    );
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('defaults to collapsed state when defaultOpen is not provided', () => {
    render(
      <NavigationGroup title="Test Group">
        <div>Test Content</div>
      </NavigationGroup>
    );
    
    const collapsible = screen.getByTestId('collapsible');
    expect(collapsible).toHaveAttribute('data-default-open', 'false');
  });

  it('respects defaultOpen prop when provided', () => {
    render(
      <NavigationGroup title="Test Group" defaultOpen={true}>
        <div>Test Content</div>
      </NavigationGroup>
    );
    
    const collapsible = screen.getByTestId('collapsible');
    expect(collapsible).toHaveAttribute('data-default-open', 'true');
  });
});
