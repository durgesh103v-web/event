import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const FilterSelect = ({ ariaLabel, onChange, options, value }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const selected = options.find(option => option.value === value) || options[0];

  useEffect(() => {
    if (!open) return undefined;

    const closeMenu = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, [open]);

  return (
    <div ref={menuRef} style={styles.root}>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        onClick={() => setOpen(current => !current)}
        onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
        style={styles.trigger}
        type="button"
      >
        <span style={styles.value}>{selected.label}</span>
        <ChevronDown size={16} style={{ ...styles.chevron, ...(open ? styles.chevronOpen : {}) }} />
      </button>

      {open && (
        <div aria-label={`${ariaLabel} options`} role="listbox" style={styles.menu}>
          {options.map(option => {
            const active = option.value === value;

            return (
              <button
                aria-selected={active}
                key={option.value}
                onClick={() => { onChange(option.value); setOpen(false); }}
                role="option"
                style={{ ...styles.option, ...(active ? styles.optionActive : {}) }}
                type="button"
              >
                <span>{option.label}</span>
                {active && <Check size={14} color="#fb923c" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  root: { flex: 1, minWidth: 0, position: 'relative' },
  trigger: {
    alignItems: 'center',
    background: 'transparent',
    border: 0,
    color: '#f1f5f9',
    display: 'flex',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    gap: 8,
    justifyContent: 'space-between',
    minHeight: 28,
    padding: 0,
    textAlign: 'left',
    width: '100%',
  },
  value: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  chevron: { color: '#cbd5e1', flexShrink: 0, transition: 'transform 0.18s ease' },
  chevronOpen: { transform: 'rotate(180deg)' },
  menu: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: 12,
    boxShadow: '0 18px 45px rgba(0,0,0,0.45)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    left: -10,
    marginTop: 10,
    maxHeight: 280,
    minWidth: 210,
    overflowY: 'auto',
    padding: 6,
    position: 'absolute',
    right: -8,
    top: '100%',
    zIndex: 50,
  },
  option: {
    alignItems: 'center',
    background: 'transparent',
    border: 0,
    borderRadius: 8,
    color: '#cbd5e1',
    display: 'flex',
    flexShrink: 0,
    fontFamily: 'inherit',
    fontSize: '0.86rem',
    justifyContent: 'space-between',
    minHeight: 36,
    padding: '8px 10px',
    textAlign: 'left',
    width: '100%',
  },
  optionActive: { background: 'rgba(249,115,22,0.12)', color: '#fb923c', fontWeight: 700 },
};

export default FilterSelect;
