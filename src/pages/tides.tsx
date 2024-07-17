import React from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { hourToMin } from '../utils';

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

const addTide = (value: string, part: number) => {
  if (!value) {
    return '';
  }
  const highWater = Number(value);
  return `${(highWater + part).toFixed(2)}m`;
};

const after = (time: number, startTime: string) => {
  const startMin = hourToMin(startTime);
  if (time > startMin - 31 && time < startMin + 61) {
    return true;
  }
  return false;
};

export function TidesPage() {
  const [hw, setHw] = React.useState(10 * 60);
  const [time, setTime] = React.useState('10:00');
  const [range, setRange] = React.useState<number>();
  const {
    register,
    watch,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      highWater: '10:00',
      startTime: '9:30',
      springHeight: '',
      neapHeight: '',
      dst: false
    }
  });

  const values = getValues();

  watch((data, { name, type }) => {
    const hw = hourToMin(data.highWater || '0:00');
    if (data.dst) {
      setHw(hw + 60);
    } else {
      setHw(hw);
    }

    const sprintHeight = Number(data.springHeight?.replace('m', '') || 0);
    const neapHeight = Number(data.neapHeight?.replace('m', '') || 0);
    setRange(sprintHeight - neapHeight);
  });

  const startTime = watch('startTime');

  return (
    <div className="flex bg-slate-200 p-1 md:p-2">
      <div className="flex flex-col">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">High Tide (time)</span>
          </div>
          <input
            type="text"
            placeholder="10:00"
            {...register('highWater')}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <div className="form-control">
          <label className="form-control mt-1 w-full max-w-xs">
            <div className="label">
              <span className="label-text">Hight Tide (m)</span>
            </div>
            <input
              type="text"
              placeholder="5m"
              {...register('springHeight')}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Low Tide (m)</span>
            </div>
            <input
              type="text"
              placeholder="2m"
              {...register('neapHeight')}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <span>Range: {(range || 0).toFixed(2)}m</span>
          <span>1/12 Range: {((range || 0) / 12).toFixed(2)}m</span>
          <br />
          <br />
          <br />
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Begin Travel (time)</span>
            </div>
            <input
              type="text"
              placeholder="10:00"
              {...register('startTime')}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
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
      <div className="ml-1 flex">
        <div className="space-y-[12px]">
          <p>H (m)</p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, -range)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, (-range / 12) * 11)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, (-range / 12) * 9)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, (-range / 12) * 6)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, (-range / 12) * 3)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, -range / 12)}
          </p>
          <p className="h-7  px-1">
            {values.springHeight ? values.springHeight + 'm' : ''}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, -range / 12)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, (-range / 12) * 3)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, (-range / 12) * 6)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, (-range / 12) * 9)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, (-range / 12) * 11)}
          </p>
          <p className="h-7 border px-1">
            {addTide(values.springHeight, -range)}
          </p>
        </div>
        <div className="mx-2 space-y-[12px]">
          <p>Hour</p>
          <p className="h-7 whitespace-nowrap border px-1">
            {addTime(hw, -6 * 60)} (-6)
          </p>
          <p className="h-7 whitespace-nowrap border px-1">
            {addTime(hw, -5 * 60)} (-5)
          </p>
          <p className="h-7 whitespace-nowrap border px-1">
            {addTime(hw, -4 * 60)} (-4)
          </p>
          <p className="h-7 whitespace-nowrap border px-1">
            {addTime(hw, -3 * 60)} (-3)
          </p>
          <p className="h-7 whitespace-nowrap border px-1">
            {addTime(hw, -2 * 60)} (-2)
          </p>
          <p className="h-7 whitespace-nowrap border px-1">
            {addTime(hw, -1 * 60)} (-1)
          </p>
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
        <div className="my-[50px]">
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
        <div className="mx-2">
          <p>Travel</p>
          <div className="my-[30px] space-y-[16px]">
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 - 6 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 - 6 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 - 5 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 - 5 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 - 4 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 - 4 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 - 3 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 - 3 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 - 2 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 - 2 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw - 30, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, -30)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 + 1 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 + 1 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 + 2 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 + 2 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 + 3 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 + 3 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 + 4 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 + 4 * 60)}
            </p>
            <p
              className={clsx(
                'h-6 border px-1',
                after(hw + 30 + 5 * 60, startTime) && 'text-red-600'
              )}
            >
              {addTime(hw, +30 + 5 * 60)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TidesPage;
