import { useEffect, useCallback } from 'react';

interface KeyboardActions {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onSearch?: () => void;
}

export function useKeyboardNavigation(actions: KeyboardActions, enabled: boolean = true) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      // Only handle Escape in inputs
      if (event.key === 'Escape' && actions.onEscape) {
        actions.onEscape();
        event.preventDefault();
      }
      return;
    }
    
    switch (event.key) {
      case 'ArrowUp':
        if (actions.onUp) {
          actions.onUp();
          event.preventDefault();
        }
        break;
      case 'ArrowDown':
        if (actions.onDown) {
          actions.onDown();
          event.preventDefault();
        }
        break;
      case 'ArrowLeft':
        if (actions.onLeft) {
          actions.onLeft();
          event.preventDefault();
        }
        break;
      case 'ArrowRight':
        if (actions.onRight) {
          actions.onRight();
          event.preventDefault();
        }
        break;
      case 'Enter':
        if (actions.onEnter) {
          actions.onEnter();
          event.preventDefault();
        }
        break;
      case 'Escape':
        if (actions.onEscape) {
          actions.onEscape();
          event.preventDefault();
        }
        break;
      case '/':
        if (actions.onSearch) {
          actions.onSearch();
          event.preventDefault();
        }
        break;
    }
  }, [actions]);
  
  useEffect(() => {
    if (!enabled) return;
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}
