export function formatDuration(seconds) {
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

    let result = [];
    if (hours >= 1) result.push(`${hours.toFixed(2)} hour${hours !== 1 ? 's' : ''}`);
    if (hours < 1 && minutes > 0) result.push(`${minutes.toFixed(2)} minute${minutes !== 1 ? 's' : ''}`);

    return result.length > 0 ? result.join(' ') : '0 minutes';
}

export function formatDistance(meters) {
    if (meters >= 1000) {
        // Convert to km with 2 decimals
        return `${(meters / 1000).toFixed(2)} km`;
    } else {
        // Show meters with 2 decimals
        return `${meters?.toFixed(2)} m`;
    }
}