declare module '@studio-freight/lenis' {
    export default class Lenis {
      constructor(options?: {
        wrapper?: HTMLElement | Window;
        content?: HTMLElement;
        wheelEventsTarget?: HTMLElement;
        smoothWheel?: boolean;
        syncTouch?: boolean;
        syncTouchLerp?: number;
        touchInertiaMultiplier?: number;
        duration?: number;
        easing?: (t: number) => number;
        orientation?: 'vertical' | 'horizontal';
        gestureOrientation?: 'vertical' | 'horizontal';
        infinite?: boolean;
      });
  
      raf(time: number): void;
      on(event: string, callback: (lenis: Lenis) => void): void;
      off(event: string, callback: (lenis: Lenis) => void): void;
      destroy(): void;
      scrollTo(target: HTMLElement | number | string, options?: { offset?: number; immediate?: boolean; duration?: number; lock?: boolean }): void;
      start(): void;
      stop(): void;
    }
  }