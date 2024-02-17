import React from 'react';
import { useForm } from 'react-hook-form';
import { minToHour } from '../utils';

export function CalcTime() {
  const { register, setValue, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      distance: '',
      speed: '',
      result: ''
    }
  });

  watch((data, { name, type }) => {
    if (name === 'result') return;
    const distance = Number(data.distance || '0');
    const speed = Number(data.speed || '1');
    const result = distance / speed;
    setValue('result', `${minToHour(result * 60)}`);
  });

  return (
    <div className="w-full bg-slate-200 p-2 md:w-[250px]">
      <h2 className="font-bold">Time Calculator</h2>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Distance (NM)</span>
        </div>
        <input
          type="text"
          placeholder="10"
          {...register('distance')}
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">
            Speed (knots)
            <p>A “knot” is a nautical mile per hour</p>
          </span>
        </div>
        <input
          type="text"
          placeholder="5"
          {...register('speed')}
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Result</span>
        </div>
        <input
          type="text"
          disabled
          {...register('result')}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <p className="mt-3 border border-slate-400 p-3">
        time = distance / speed
      </p>
    </div>
  );
}
