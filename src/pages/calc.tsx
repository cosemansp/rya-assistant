import React from 'react';
import { set, useForm } from 'react-hook-form';

function degToMin(value: string) {
  const [deg, min] = value.split('°');
  const degree = Number(deg);
  if (!min) {
    // only degree
    return degree * 60;
  }

  const minutes = min.replace("'", '');
  return degree * 60 + Number(minutes);
}

function minToDeg(min: number) {
  const deg = Math.floor(min / 60);
  const m = min % 60;
  return `${deg}°${m.toString().padStart(2, '0')}'`;
}

const minToHour = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

function CalcVariation() {
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
            <code>Shift-option-8</code>
          </span>
        </div>
        <input
          type="text"
          placeholder="10°"
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
          placeholder="8'"
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
        variation = (start * 60 + (year * change)) / 60
        <br />
        west = negative, east = positive
      </p>
    </div>
  );
}

function CalcTravelTime() {
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
    <div className="bg-slate-200 p-2">
      <h2 className="font-bold">Calculate Travel Time</h2>
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
          <span className="label-text">
            Speed (knots)
            <p>A “knot” is a nautical mile per hour</p>
          </span>
        </div>
        <input
          type="text"
          placeholder="5"
          {...register('speed')}
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
        minutes = ( distance / speed ) * 60
      </p>
    </div>
  );
}

function CalcPage() {
  return (
    <div className="flex gap-x-2">
      <CalcVariation />
      <CalcTravelTime />
    </div>
  );
}

export default CalcPage;
