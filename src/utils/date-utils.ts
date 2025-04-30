
import { format, formatDistance, formatRelative, isToday, isYesterday, parseISO } from 'date-fns';

/**
 * Formats a date string into a human-readable format
 */
export function formatDate(dateString: string, formatStr: string = 'MMM d, yyyy'): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.error('Invalid date format', error);
    return 'Invalid date';
  }
}

/**
 * Returns a relative time string (e.g., "2 hours ago" or "yesterday")
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistance(date, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Invalid date format', error);
    return 'Unknown time';
  }
}

/**
 * Returns a smart formatted date:
 * - For today: "Today at 2:30 PM"
 * - For yesterday: "Yesterday at 2:30 PM"
 * - For this year: "Mar 15 at 2:30 PM"
 * - For older dates: "Mar 15, 2022 at 2:30 PM"
 */
export function getSmartDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    
    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    }
    
    if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    }
    
    const isCurrentYear = new Date().getFullYear() === date.getFullYear();
    
    if (isCurrentYear) {
      return format(date, 'MMM d') + ` at ${format(date, 'h:mm a')}`;
    }
    
    return format(date, 'MMM d, yyyy') + ` at ${format(date, 'h:mm a')}`;
  } catch (error) {
    console.error('Invalid date format', error);
    return 'Invalid date';
  }
}

/**
 * Format a date relative to another date
 */
export function getRelativeDateFormat(dateString: string, baseDate: Date = new Date()): string {
  try {
    const date = parseISO(dateString);
    return formatRelative(date, baseDate);
  } catch (error) {
    console.error('Invalid date format', error);
    return 'Invalid date';
  }
}

/**
 * Determines if a date is in the past
 */
export function isPastDate(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    return date < new Date();
  } catch {
    return false;
  }
}

/**
 * Returns time remaining until a future date in a human-readable format
 */
export function getTimeRemaining(dateString: string): string {
  try {
    const targetDate = parseISO(dateString);
    const now = new Date();
    
    if (targetDate <= now) {
      return 'Expired';
    }
    
    return formatDistance(targetDate, now, { addSuffix: false });
  } catch (error) {
    console.error('Invalid date format', error);
    return 'Unknown';
  }
}
