import { useMemo } from "react";

export function useMovieStats(list) {
    return useMemo(() => {
        const totals = list.reduce(
            (acc, movie) => {
                acc.budget += movie.budget || 0;
                acc.revenue += movie.revenue || 0;
                acc.runtime += movie.runtime || 0;
                const rating = Number(movie.vote_average);
                if (!Number.isNaN(rating)) acc.rating += rating;
                return acc;
            },
            { budget: 0, revenue: 0, runtime: 0, rating: 0 }
        );

        const counts = list.reduce(
            (acc, movie) => {
                if (movie.budget > 0) acc.budget++;
                if (movie.revenue > 0) acc.revenue++;
                if (movie.runtime > 0) acc.runtime++;
                const rating = Number(movie.vote_average);
                if (!Number.isNaN(rating)) acc.rating++;
                return acc;
            },
            { budget: 0, revenue: 0, runtime: 0, rating: 0 }
        );

        const totalRuntimeHrs = (totals.runtime / 60).toFixed(1);
        const profit = totals.revenue - totals.budget;
        const increase = (profit / totals.budget) * 100;
        const avgBudget = counts.budget > 0 ? Math.round(totals.budget / counts.budget) : 0;
        const avgRevenue = counts.revenue > 0 ? Math.round(totals.revenue / counts.revenue) : 0;
        const avgRuntime = counts.runtime > 0 ? Math.round(totals.runtime / counts.runtime) : 0;
        const avgRating = counts.rating > 0 ? (totals.rating / counts.rating).toFixed(2) : "N/A";

        const highestBudget = list.reduce((max, movie) => Math.max(max, movie.budget || 0), 0);
        const highestRevenue = list.reduce((max, movie) => Math.max(max, movie.revenue || 0), 0);
        const highestRuntime = list.reduce((max, movie) => Math.max(max, movie.runtime || 0), 0);
        const highestRating = list.reduce((max, movie) => Math.max(max, movie.vote_average || 0), 0);

        const budgets = list.map(m => m.budget).filter(b => b > 0);
        const revenues = list.map(m => m.revenue).filter(r => r > 0);

        const lowestBudget = budgets.length > 0 ? Math.min(...budgets) : 0;
        const lowestRevenue = revenues.length > 0 ? Math.min(...revenues) : 0;
        const lowestRuntime = list.length > 0 ? Math.min(...list.map(m => m.runtime || 0)) : 0;
        const lowestRating = list.length > 0 ? Math.min(...list.map(m => m.vote_average || 0)) : 0;

        return {
            totals,
            avgBudget,
            avgRevenue,
            avgRuntime,
            avgRating,
            totalRuntimeHrs,
            profit,
            increase,
            highestBudget,
            highestRevenue,
            highestRuntime,
            highestRating,
            lowestBudget,
            lowestRevenue,
            lowestRuntime,
            lowestRating,
        };
    }, [list]);
}

/* Derives totals, averages, highest/lowest, and profit from an array of TMDB movie detail objects. Memoised so it only recalculates when the list changes. */