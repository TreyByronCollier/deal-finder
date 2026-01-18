import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "savedDeals";

interface SavedDealsContextValue {
  savedIds: string[];
  saveDeal: (id: string) => void;
  unsaveDeal: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedDealsContext = createContext<SavedDealsContextValue | undefined>(
  undefined,
);

export const SavedDealsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Load saved deals once on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        try {
          setSavedIds(JSON.parse(data));
        } catch {}
      }
    });
  }, []);

  const persist = useCallback(async (ids: string[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  const saveDeal = useCallback(
    (id: string) => {
      setSavedIds((prev) => {
        if (!prev.includes(id)) {
          const next = [...prev, id];
          persist(next);
          return next;
        }
        return prev;
      });
    },
    [persist],
  );

  const unsaveDeal = useCallback(
    (id: string) => {
      setSavedIds((prev) => {
        const next = prev.filter((x) => x !== id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  return (
    <SavedDealsContext.Provider
      value={{ savedIds, saveDeal, unsaveDeal, isSaved }}
    >
      {children}
    </SavedDealsContext.Provider>
  );
};

export function useSavedDeals() {
  const context = useContext(SavedDealsContext);
  if (!context)
    throw new Error("useSavedDeals must be used within SavedDealsProvider");
  return context;
}
