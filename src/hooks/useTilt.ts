import { useRef, useCallback } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

const MAX_TILT = 12;
const SCALE = 1.03;

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const stateRef = useRef<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = px * MAX_TILT * 2;
    const rotateX = -py * MAX_TILT * 2;
    stateRef.current = { rotateX, rotateY, scale: SCALE };
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${SCALE})`;
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    stateRef.current = { rotateX: 0, rotateY: 0, scale: 1 };
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  }, []);

  return { ref, handleMove, handleLeave };
}
