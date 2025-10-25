import type { StoreApi } from "zustand";
export type SetState<T> = StoreApi<T>["setState"];