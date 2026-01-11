import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  number: string;
  label: string;
  delay: number;
}

function StatItem({ number, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Extract number from string (e.g., "800+" -> 800)
    const targetNumber = parseInt(number.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, number]);

  const displayNumber = number.includes('+') 
    ? `${count}+`
    : count.toString();

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="text-5xl sm:text-6xl md:text-7xl text-purple-900 mb-3 sm:mb-4">
        {isVisible ? displayNumber : '0'}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-gray-700">{label}</div>
    </motion.div>
  );
}

interface StatsProps {
  stats?: { number: string; label: string }[];
}

export function AboutStats({ stats }: StatsProps) {
  const items =
    stats ?? [
      { number: '6', label: 'Premium Facilities' },
      { number: '5000+', label: 'Happy Visitors' },
      { number: '50+', label: 'Expert Staff' },
    ];

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 md:gap-16">
          {items.map((item, index) => (
            <StatItem
              key={index}
              number={item.number}
              label={item.label}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
