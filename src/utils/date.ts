function formatSecondsToMMSS(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

const formateCreateOrUpdateDate = (
  dateString?: string | Date | undefined,
  options: Partial<Intl.DateTimeFormatOptions> = {}
) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
    ...options,
  });
};

const formatDate = (dateString?: string | Date | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric", day: "numeric" });
};

const formatDateTime = (
  dateInput?: string | Date | undefined,
  options: Partial<Intl.DateTimeFormatOptions> = {}
): string => {
  if (!dateInput) return "";
  const date = new Date(dateInput);

  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...options,
  });
};

// Format date as YYYY-MM-DD in local timezone (avoids UTC conversion issues)
const formatDateLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const dateUtils = {
  formatSecondsToMMSS,
  formateCreateOrUpdateDate,
  formatDate,
  formatDateTime,
  formatDateLocal,
};
export default dateUtils;
