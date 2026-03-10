import { type FC, useEffect, useRef, useState } from 'react';
import { table } from '../Table.styles';

export interface TableFilterButtonProps {
  filterableText?: string;
  filterValue: string[];
  setFilter: (values: string[]) => void;
  uniqueValues: string[];
}

const FilterIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M3 5h14M5.5 10h9M8 15h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const TableFilterButton = ({
  filterableText = 'filterable',
  filterValue,
  setFilter,
  uniqueValues,
}: TableFilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive = filterValue.length > 0;

  const classes = table({ filterButtonActive: isActive });

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleValue = (value: string) => {
    if (filterValue.includes(value)) {
      setFilter(filterValue.filter((v) => v !== value));
    } else {
      setFilter([...filterValue, value]);
    }
  };

  const ariaLabel = isActive ? `${filterableText} (active)` : filterableText;

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-flex' }}
    >
      <button
        type="button"
        className={classes.filterButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <FilterIcon className={classes.filterIcon} />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={`${filterableText} options`}
          className={classes.filterPanel}
        >
          {uniqueValues.map((value) => (
            <label key={value} className={classes.filterItem}>
              <input
                type="checkbox"
                checked={filterValue.includes(value)}
                onChange={() => toggleValue(value)}
              />
              {value}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

TableFilterButton.displayName = 'TableFilterButton';
