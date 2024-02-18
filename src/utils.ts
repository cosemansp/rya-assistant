/**
 * 12°34' => 12*60 + 34 = 754
 */
export function degToMin(value: string) {
  const theValue = value.replace('_', '°');
  const [deg, min] = theValue.split('°');
  const degree = Number(deg);
  if (!min) {
    // only degree
    return degree * 60;
  }

  const minutes = min.replace("'", '');
  return degree * 60 + Number(minutes);
}

/**
 * 754 => 12°34'
 */
export function minToDeg(min: number) {
  const deg = Math.floor(min / 60);
  const m = min % 60;
  return `${deg}°${m.toString().padStart(2, '0')}'`;
}

/**
 * 120 => 02:00
 */
export const minToHour = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toFixed(0).padStart(2, '0')}:${m.toFixed(0).padStart(2, '0')}`;
};

/**
 * 10:00 -> 600 (min)
 */
export const hourToMin = (hour: string) => {
  if (hour.length === 2) {
    return Number(hour) * 60;
  }

  if (hour.includes(':')) {
    const [h, m] = hour.split(':').map(Number);
    return h * 60 + m;
  }

  if (hour.length != 4) {
    return NaN;
  }

  const hourPart = hour.substring(0, hour.length - 2);
  const minPart = hour.substring(2, hour.length);
  return Number(hourPart) * 60 + Number(minPart);
};
