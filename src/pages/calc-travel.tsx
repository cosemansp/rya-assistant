import React from 'react';
import { useForm } from 'react-hook-form';
import { degToMin, minToDeg } from '../utils';

export function CalcVariation() {
  const { register, setValue, watch } = useForm({
    mode: 'onBlur',
    defaultValues: {
      magnetic: '',
      change: '',
      years: undefined,
      result: '',
      resultDeg: ''
    }
  });

  watch((data, { name, type }) => {
    if (name === 'result') return;
    const orgValue = (data.magnetic || "0°0'").toLowerCase();
    const orgWest = orgValue.includes('w');
    let orgMin = degToMin(orgValue.replace('w', '').replace('e', ''));
    if (orgWest) {
      orgMin = -orgMin;
    }

    const changeValue = (data.change || '0').toLowerCase();
    const changeWest = changeValue.includes('w');
    let changeMin = Number(changeValue.replace('w', '').replace('e', ''));
    if (changeWest) {
      changeMin = -changeMin;
    }
    const result = orgMin + changeMin * (data.years || 0);

    const res = `${Math.abs(Math.floor((result * 100) / 60)) / 100} ${
      result < 0 ? 'W' : 'E'
    }`;
    const res2 = `${minToDeg(Math.abs(result))} ${result < 0 ? 'W' : 'E'}`;
    setValue('result', `${res} (${res2})`);
  });

  return (
    <div className="bg-slate-200 p-2">
      <h2 className="font-bold">Calculate Variation</h2>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">
            Magnetic variation (degree)
            <br />
            <code>° = Shift-option-8</code>
          </span>
        </div>
        <input
          type="text"
          placeholder="10°w"
          {...register('magnetic')}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Annual change (min)</span>
        </div>
        <input
          type="text"
          placeholder="8w (or 8e)"
          {...register('change')}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Years</span>
        </div>
        <input
          type="text"
          placeholder="10"
          {...register('years')}
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
        variation = start + (years * change)
        <br />
        west = negative, east = positive
      </p>
    </div>
  );
}
