"use client";
import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

interface IAutoLogoutConfig {
  timeoutMinutes?: number;
  warningMinutes?: number;
  checkInterval?: number;
  showConfirmation?: boolean;
}

interface IAutoLogoutReturn {
  resetTimer: () => void;
  cleanup: () => void;
  isActive: () => boolean;
  timeUntilLogout: () => number;
}

type LogoutCallback = () => void | Promise<void>;

const useAutoLogout = (
  logoutCallback: LogoutCallback,
  timeoutMinutes: number = 10,
  config: IAutoLogoutConfig = {}
): IAutoLogoutReturn => {
  const { warningMinutes = 2, checkInterval = 30000, showConfirmation = true } = config;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef<boolean>(true);
  const lastActivityRef = useRef<number>(Date.now());
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isSSRRef = useRef<boolean>(typeof window === "undefined");

  // Convert minutes to milliseconds
  const timeoutMs: number = timeoutMinutes * 60 * 1000;
  const warningMs: number = timeoutMs - warningMinutes * 60 * 1000;

  // Auto logout function with safety checks
  const performAutoLogout = useCallback(async (): Promise<void> => {
    // Skip if SSR or window is not available
    if (isSSRRef.current || typeof window === "undefined") return;

    // Double check if we should actually logout
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;

    if (timeSinceLastActivity >= timeoutMs && isActiveRef.current) {
      toast.error("Session expired due to inactivity");
      try {
        await logoutCallback();
      } catch (error) {
        console.error("Error during auto-logout:", error);
        // Force logout even if callback fails
        try {
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        } catch (redirectError) {
          console.error("Failed to redirect to login:", redirectError);
        }
      }
    }
  }, [logoutCallback, timeoutMs]);

  // Warning function
  const showWarning = useCallback((): void => {
    // Skip if SSR or window is not available
    if (isSSRRef.current || typeof window === "undefined") return;

    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;

    // Only show warning if user is still inactive
    if (timeSinceLastActivity >= warningMs && isActiveRef.current) {
      toast.warning(`Session will expire in ${warningMinutes} minutes due to inactivity`);
    }
  }, [warningMs, warningMinutes, showConfirmation]);

  // Record user activity
  const recordActivity = useCallback((): void => {
    if (!isActiveRef.current || isSSRRef.current) return;

    const now = Date.now();
    lastActivityRef.current = now;

    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Set new timers
    warningTimeoutRef.current = setTimeout(showWarning, warningMs);
    timeoutRef.current = setTimeout(() => {
      performAutoLogout();
    }, timeoutMs);
  }, [showWarning, performAutoLogout, timeoutMs, warningMs]);

  // Periodic check for missed activities (fallback)
  const periodicCheck = useCallback((): void => {
    if (!isActiveRef.current || isSSRRef.current) return;

    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;

    if (timeSinceLastActivity >= timeoutMs) {
      performAutoLogout();
    } else if (timeSinceLastActivity >= warningMs) {
      // Show warning if not already shown
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
        showWarning();
      }
    }
  }, [timeoutMs, warningMs, performAutoLogout, showWarning]);

  // Throttled activity handler to prevent excessive timer resets
  const handleActivity = useCallback((): void => {
    if (!isActiveRef.current || isSSRRef.current) return;

    const now = Date.now();
    const timeSinceLastReset = now - lastActivityRef.current;

    // Only reset if it"s been more than 1 second since last activity
    // This prevents excessive timer resets during rapid user interactions
    if (timeSinceLastReset > 1000) {
      recordActivity();
    }
  }, [recordActivity]);

  // Handle page visibility changes
  const handleVisibilityChange = useCallback((): void => {
    if (isSSRRef.current || typeof document === "undefined") return;

    if (document.hidden) {
      // Page is hidden, don"t track activity
      isActiveRef.current = false;
    } else {
      // Page is visible again, resume tracking
      isActiveRef.current = true;
      recordActivity();
    }
  }, [recordActivity]);

  // Handle page focus/blur
  const handleFocus = useCallback((): void => {
    if (isSSRRef.current) return;
    isActiveRef.current = true;
    recordActivity();
  }, [recordActivity]);

  const handleBlur = useCallback((): void => {
    if (isSSRRef.current) return;
    isActiveRef.current = false;
  }, []);

  // Clean up function
  const cleanup = useCallback((): void => {
    isActiveRef.current = false;

    // Clear all timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
  }, []);

  // Manual reset function
  const resetTimer = useCallback((): void => {
    if (isActiveRef.current && !isSSRRef.current) {
      recordActivity();
    }
  }, [recordActivity]);

  // Check if user is active
  const isActive = useCallback((): boolean => {
    return isActiveRef.current;
  }, []);

  // Get time until logout in milliseconds
  const timeUntilLogout = useCallback((): number => {
    if (isSSRRef.current) return timeoutMs;

    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;
    const remaining = timeoutMs - timeSinceLastActivity;
    return Math.max(0, remaining);
  }, [timeoutMs]);

  useEffect(() => {
    // Check if we"re on the client side
    isSSRRef.current = typeof window === "undefined";

    // Skip if SSR
    if (isSSRRef.current) return;

    // Validate inputs
    if (typeof logoutCallback !== "function") {
      console.error("useAutoLogout: logoutCallback must be a function");
      return;
    }

    if (timeoutMinutes <= 0) {
      console.error("useAutoLogout: timeoutMinutes must be positive");
      return;
    }

    if (warningMinutes >= timeoutMinutes) {
      console.error("useAutoLogout: warningMinutes must be less than timeoutMinutes");
      return;
    }

    // List of events to track user activity
    const events: (keyof DocumentEventMap)[] = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
      "keydown",
      "wheel",
      "touchmove",
      "touchend",
    ];

    // Initialize
    isActiveRef.current = true;
    lastActivityRef.current = Date.now();

    // Start initial timer
    recordActivity();

    // Set up periodic check as fallback
    checkIntervalRef.current = setInterval(periodicCheck, checkInterval);

    // Add event listeners for user activity
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, {
        passive: true,
        capture: true,
      });
    });

    // Add visibility change listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Add beforeunload listener to clean up
    window.addEventListener("beforeunload", cleanup);

    // Cleanup function
    return () => {
      // Remove event listeners

      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          passive: true,
          capture: true,
        });
      });

      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", cleanup);

      // Clean up timers and intervals
      cleanup();
    };
  }, [
    logoutCallback,
    timeoutMinutes,
    warningMinutes,
    checkInterval,
    handleActivity,
    handleVisibilityChange,
    handleFocus,
    handleBlur,
    recordActivity,
    periodicCheck,
    cleanup,
  ]);

  // Return control functions
  return {
    resetTimer,
    cleanup,
    isActive,
    timeUntilLogout,
  };
};

export default useAutoLogout;
