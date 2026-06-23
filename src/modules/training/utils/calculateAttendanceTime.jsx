export const calculateAttendanceTime = (time, minutes, type = "before") => {
    const [hours, mins] = time.split(":").map(Number);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins);
    date.setSeconds(0);

    if (type === "before") {
        date.setMinutes(date.getMinutes() - minutes);
    } else {
        date.setMinutes(date.getMinutes() + minutes);
    }

    return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};