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
  if (!hour.includes(':')) {
    return Number(hour) * 60;
  }
  const [h, m] = hour.split(':').map(Number);
  return h * 60 + m;
};
