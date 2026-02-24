import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from '../components/StatCard';
import React from 'react';
import { DollarSign } from 'lucide-react';

describe('StatCard Component', () => {
    it('should render the title and formatted amount', () => {
        render(<StatCard title="Total Balance" amount={1234.56} icon={<DollarSign />} color="blue" />);

        expect(screen.getByText('Total Balance')).toBeInTheDocument();
        expect(screen.getByText('$1,234.56')).toBeInTheDocument();
    });

    it('should handle zero amounts', () => {
        render(<StatCard title="Total Balance" amount={0} icon={<DollarSign />} color="blue" />);
        expect(screen.getByText('$0')).toBeInTheDocument();
    });
});
