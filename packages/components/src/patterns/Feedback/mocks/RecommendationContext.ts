import { createContext, useContext } from 'react';

export type Recommendation = 'alert' | 'toast' | 'modal' | null;

export const RecommendationContext = createContext<Recommendation>(null);
export const useRecommendation = () => useContext(RecommendationContext);
