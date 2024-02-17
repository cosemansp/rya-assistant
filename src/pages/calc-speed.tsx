import React from 'react';
import { useForm } from 'react-hook-form';
import { hourToMin, minToHour } from '../utils';

export function CalcSpeed() {
  const { register, setValue, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      distance: '',
      time: '',
      result: ''
    }
  });

  watch((data, { name, type }) => {
    if (name === 'result') return;
    const distance = Number(data.distance || '0');
    const time = hourToMin(data.time || '0:00');

    const result = (distance / time) * 60;
    setValue('result', `${result.toFixed(2)} knot(s)`);
  });

  return (
    <div className="w-full bg-slate-200 p-2 md:w-[250px]">
      <h2 className="font-bold">Speed Calculator</h2>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Distance (NM)</span>
        </div>
        <input
          type="text"
          placeholder="10"
          {...register('distance')}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Time (hh:mm)</span>
        </div>
        <input
          type="text"
          placeholder="1:00"
          {...register('time')}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
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
        speed = distance * time
      </p>
    </div>
  );
}
