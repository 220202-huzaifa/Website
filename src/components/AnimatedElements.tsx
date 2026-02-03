import React, { useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  duration = 2, 
  delay = 0 
}) => {
  return (
    <div
      className="animate-float"
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

interface StaggeredFadeInProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  baseDelay?: number;
}

export const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({ 
  children, 
  staggerDelay = 100,
  className = '',
  baseDelay = 0
}) => {
  return (
    <div className={`staggered-fade-in ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="animate-fadeInUp"
          style={{
            animationDelay: `${baseDelay + (index * staggerDelay)}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};