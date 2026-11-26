import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { initialState, type DemoState } from "@/lib/passport-data";
const KEY = "refugeeskills-passport-demo-v1";
const DemoContext = createContext<{
  state: DemoState;
  update: (next: Partial<DemoState>) => void;
  ready: boolean;
}>({ state: initialState, update: () => {}, ready: false });
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const value = JSON.parse(raw);
        if (
          value?.profile &&
          Array.isArray(value.projects) &&
          value.assessments &&
          Array.isArray(value.mentorRequests)
        )
          setState(value);
      }
    } catch {
      /* Demo storage is optional. */
    }
    setReady(true);
  }, []);
  const update = (next: Partial<DemoState>) =>
    setState((previous) => {
      const value = { ...previous, ...next };
      try {
        localStorage.setItem(KEY, JSON.stringify(value));
      } catch {
        /* Continue in-memory when storage is unavailable. */
      }
      return value;
    });
  return <DemoContext.Provider value={{ state, update, ready }}>{children}</DemoContext.Provider>;
}
export const useDemo = () => useContext(DemoContext);
