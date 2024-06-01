import { create } from "zustand";

export const useEventStore = create((set) => ({
  eventName: "",
  eventDateStart: "",
  eventDateEnd: "",
  location: "",
  description: "",
  capacity: 0,
  pricePerNftTicket: 0,
  charityPercentage: 0,
  charityWalletAddress: "",
  setEventName: (eventName: string) => set(() => ({ eventName })),
  setEventDateStart: (eventDateStart: string) =>
    set(() => ({ eventDateStart })),
  setEventDateEnd: (eventDateEnd: string) => set(() => ({ eventDateEnd })),
  setLocation: (location: string) => set(() => ({ location })),
  setDescription: (description: string) => set(() => ({ description })),
  setCapacity: (capacity: number) => set(() => ({ capacity })),
  setPricePerNftTicket: (pricePerNftTicket: number) =>
    set(() => ({ pricePerNftTicket })),
  setCharityPercentage: (charityPercentage: number) =>
    set(() => ({ charityPercentage })),
  setCharityWalletAddress: (charityWalletAddress: string) =>
    set(() => ({ charityWalletAddress })),
}));
