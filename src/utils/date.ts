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

const dateUtils = {
  formatSecondsToMMSS,
  formateCreateOrUpdateDate,
  formatDate,
};
export default dateUtils;
