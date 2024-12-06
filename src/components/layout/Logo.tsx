import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  variant?: 'full' | 'compact';
}

export function Logo({ 
  className = '', 
  size = 'md', 
  withText = true,
  variant = 'full' 
}: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  const textSizes = {
    sm: { primary: 'text-xl', secondary: 'text-sm' },
    md: { primary: 'text-2xl', secondary: 'text-lg' },
    lg: { primary: 'text-4xl', secondary: 'text-2xl' },
  };

  return (
    <Link 
      to="/" 
      className={cn(
        'flex items-center transition-opacity hover:opacity-90',
        className
      )}
    >
      <div className={cn('relative flex items-center space-x-2', sizes[size])}>
        {/* Logo Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-600 rounded-lg transform rotate-45 scale-75" />
          <div className="relative z-10 flex items-center justify-center">
            <FileText className={cn(
              'text-white',
              size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-12 w-12'
            )} />
          </div>
        </div>

        {/* Logo Text */}
        {withText && (
          <div className="flex items-baseline space-x-1">
            <span className={cn(
              "font-bold text-indigo-600 dark:text-indigo-500",
              textSizes[size].primary
            )}>
              IAM
            </span>
            {variant === 'full' && (
              <span className={cn(
                "font-medium text-gray-900 dark:text-gray-100",
                textSizes[size].secondary
              )}>
                Invoicer
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}