import { useState, useEffect, useCallback } from "react";
import { fetchEvents } from "../database/fetchEvents";
import { formatEventDate, formatTime } from "../utils/formatDates";

export const useEvents = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedEvents = await fetchEvents();
      const eventsByDate = {};

      fetchedEvents.forEach((evt) => {
        try {
          const jsDate = formatEventDate(evt.date);
          const dateString = jsDate.toISOString().split("T")[0];

          if (!eventsByDate[dateString]) {
            eventsByDate[dateString] = [];
          }

          eventsByDate[dateString].push({
            ...evt,
            hour: formatTime(jsDate),
            duration: "1h",
          });
        } catch (error) {
          console.error("Error processing event:", error);
        }
      });

      const formattedItems = Object.keys(eventsByDate).map((date) => ({
        title: date,
        data: eventsByDate[date],
      }));

      formattedItems.sort((a, b) => a.title.localeCompare(b.title));
      setItems(formattedItems);
      setError(null);
    } catch (error) {
      console.error("Error loading events:", error);
      setError(error.message || "Failed to load events");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    items,
    isLoading,
    error,
    refresh: loadEvents,
  };
};
