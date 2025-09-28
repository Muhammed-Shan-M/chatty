export function formateTime(isoString: string) {
    const date = new Date(isoString);

    const formatted = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return formatted
}