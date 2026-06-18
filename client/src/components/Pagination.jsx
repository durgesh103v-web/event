import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StyleSheet } from '../styles/StyleSheet';

const getVisiblePages = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'dots', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, 'dots', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'dots-left', currentPage - 1, currentPage, currentPage + 1, 'dots-right', totalPages];
};

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) return null;

  const currentPage = Number(pagination.page) || 1;
  const totalPages = Number(pagination.pages) || 1;
  const pageItems = getVisiblePages(currentPage, totalPages);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav aria-label="Event pagination" style={styles.shell}>
      <button
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        style={{
          ...styles.iconButton,
          ...(currentPage === 1 ? styles.disabledButton : null)
        }}
        type="button"
      >
        <ChevronLeft size={28} />
      </button>

      <div style={styles.pageList}>
        {pageItems.map((page) => {
          if (typeof page === 'string') {
            return (
              <span key={page} style={styles.dots}>
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              aria-current={isActive ? 'page' : undefined}
              key={page}
              onClick={() => goToPage(page)}
              style={{
                ...styles.pageButton,
                ...(isActive ? styles.activePageButton : null)
              }}
              type="button"
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        style={{
          ...styles.iconButton,
          ...(currentPage === totalPages ? styles.disabledButton : null)
        }}
        type="button"
      >
        <ChevronRight size={28} />
      </button>
    </nav>
  );
};

const styles = StyleSheet.create({
  shell: {
    alignItems: 'center',
    background: '#0f172a',
    border: '1px solid #273449',
    borderRadius: 999,
    boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
    display: 'flex',
    gap: 14,
    justifyContent: 'center',
    margin: '32px auto 0',
    maxWidth: 'max-content',
    padding: '8px 14px'
  },
  pageList: {
    alignItems: 'center',
    display: 'flex',
    gap: 12
  },
  iconButton: {
    alignItems: 'center',
    background: 'transparent',
    border: 0,
    color: '#94a3b8',
    display: 'inline-flex',
    fontWeight: 800,
    height: 32,
    justifyContent: 'center',
    width: 32
  },
  pageButton: {
    alignItems: 'center',
    background: 'transparent',
    border: 0,
    borderRadius: 999,
    color: '#cbd5e1',
    display: 'inline-flex',
    fontSize: '0.92rem',
    fontWeight: 800,
    height: 34,
    justifyContent: 'center',
    width: 34
  },
  activePageButton: {
    background: '#f97316',
    boxShadow: '0 7px 16px rgba(249, 115, 22, 0.22)',
    color: '#ffffff'
  },
  disabledButton: {
    color: '#475569',
    cursor: 'not-allowed'
  },
  dots: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    fontWeight: 800,
    minWidth: 16,
    textAlign: 'center'
  }
});

export default Pagination;
