import React from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

const hourToMin = (hour: string) => {
  if (!hour.includes(':')) {
    return Number(hour) * 60;
  }
  const [h, m] = hour.split(':').map(Number);
  return h * 60 + m;
};

const minToHour = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const addTime = (time: number, min: number) => {
  const t = time + min;
  if (t < 0) {
    return minToHour(t + 24 * 60);
  }
  if (t > 24 * 60) {
    return minToHour(t - 24 * 60);
  }
  if (t === 24 * 60) {
    return '00:00';
  }
  return minToHour(t);
};

const after = (time: number, startTime: string) => {
  const startMin = hourToMin(startTime);
  if (time > startMin - 29 && time < startMin + 90) {
    return true;
  }
  return false;
};

export function TidesPage() {
  const [hw, setHw] = React.useState(10 * 60);
  const [time, setTime] = React.useState('10:00');
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      highWater: '10:00',
      startTime: '9:30',
      dst: false
    }
  });

  watch((data, { name, type }) => {
    // if (name === 'highWater') {
    const hw = hourToMin(data.highWater || '0:00');
    if (data.dst) {
      setHw(hw + 60);
    } else {
      setHw(hw);
    }
  });

  const startTime = watch('startTime');

  return (
    <div className="flex bg-slate-200 p-2">
      <div className="flex flex-col">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">High Water</span>
          </div>
          <input
            type="text"
            placeholder="10:00"
            {...register('highWater')}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Start Time</span>
          </div>
          <input
            type="text"
            placeholder="10:00"
            {...register('startTime')}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">DST</span>
            <input
              type="checkbox"
              {...register('dst')}
              className="checkbox-primary checkbox"
            />
          </label>
        </div>
      </div>
      <div className="ml-3 flex">
        <div className="space-y-[12px]">
          <p className="h-7 border px-1">{addTime(hw, -6 * 60)} (-6)</p>
          <p className="h-7 border px-1">{addTime(hw, -5 * 60)} (-5)</p>
          <p className="h-7 border px-1">{addTime(hw, -4 * 60)} (-4)</p>
          <p className="h-7 border px-1">{addTime(hw, -3 * 60)} (-3)</p>
          <p className="h-7 border px-1">{addTime(hw, -2 * 60)} (-2)</p>
          <p className="h-7 border px-1">{addTime(hw, -1 * 60)} (-1)</p>
          <p className="h-7 rounded border border-slate-600 px-1">
            {addTime(hw, 0)}
          </p>
          <p className="h-7 border px-1">{addTime(hw, 1 * 60)} (+1)</p>
          <p className="h-7 border px-1">{addTime(hw, 2 * 60)} (+2)</p>
          <p className="h-7 border px-1">{addTime(hw, 3 * 60)} (+3)</p>
          <p className="h-7 border px-1">{addTime(hw, 4 * 60)} (+4)</p>
          <p className="h-7 border px-1">{addTime(hw, 5 * 60)} (+5)</p>
          <p className="h-7 border px-1">{addTime(hw, 6 * 60)} (+6)</p>
        </div>
        <div className="m-1 my-[15px]">
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right  h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />

          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
          <div className="crossed-right h-4 w-4" />
          <div className="crossed-left mt-2 h-4 w-4" />
        </div>
        <div className="my-[20px] space-y-[16px]">
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 - 6 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 - 6 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 - 5 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 - 5 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 - 4 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 - 4 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 - 3 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 - 3 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 - 2 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 - 2 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw - 30, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, -30)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 + 1 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 + 1 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 + 2 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 + 2 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 + 3 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 + 3 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 + 4 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 + 4 * 60)}
          </p>
          <p
            className={clsx(
              'h-6 border px-1',
              after(hw + 30 + 5 * 60, startTime) && 'text-green-600'
            )}
          >
            {addTime(hw, +30 + 5 * 60)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TidesPage;
