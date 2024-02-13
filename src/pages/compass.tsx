/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import React from 'react';

const getValue = (str: string | undefined | null) => {
  const value = str?.toLowerCase() || '0';
  if (value.endsWith('e')) {
    return Number(value.replace('e', ''));
  }
  if (value.endsWith('w')) {
    return -Number(value.replace('w', ''));
  }
  return 0;
};

const fixOverflow = (value: number) => {
  if (value < 0) {
    return 360 + value;
  }
  if (value > 360) {
    return value - 360;
  }
  return value;
};

// Samples
// https://www.cockpitcards.co.uk/variation-and-deviation/

function CompassPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      compass: 0,
      deviation: '',
      variation: '',
      magnetic: 0,
      leeway: '',
      stream: '',
      trueCourse: 0,

      compass2: 0,
      deviation2: '',
      variation2: '',
      magnetic2: 0,
      leeway2: '',
      stream2: '',
      trueCourse2: 0
    }
  });

  watch((data, { name, type }) => {
    if (
      name === 'trueCourse' ||
      name === 'compass2' ||
      name === 'magnetic' ||
      name === 'magnetic2'
    ) {
      return;
    }

    // M - T
    let trueCourse = Number(data.compass) || 0;
    let magnetic = Number(data.compass) || 0;

    magnetic += getValue(data.deviation);
    trueCourse += getValue(data.deviation);
    trueCourse += getValue(data.variation);
    trueCourse += getValue(data.leeway);
    trueCourse += getValue(data.stream);

    setValue('trueCourse', fixOverflow(trueCourse));
    setValue('magnetic', fixOverflow(magnetic));

    // T - M
    let compass2 = Number(data.trueCourse2) || 0;
    compass2 -= getValue(data.stream2);
    compass2 -= getValue(data.leeway2);

    let magnetic2 = compass2 || 0;
    magnetic2 -= getValue(data.variation2);

    compass2 -= getValue(data.variation2);
    compass2 -= getValue(data.deviation2);

    setValue('compass2', fixOverflow(compass2));
    setValue('magnetic2', fixOverflow(magnetic2));
  });

  return (
    <div>
      <h2 className="text-lg font-semibold">Compass calculator</h2>

      <p>
        <strong>Magnetic Variation </strong>is due to the differing positions of
        the Geographic North Pole and the Magnetic North Pole. The boat’s
        compass and a hand bearing compass point to the Magnetic Pole, but all
        bearings on charts are related to the Geographic Pole (True North).
      </p>
      <br />
      <p>
        <strong>Deviation</strong> is the error in reading a bearing from the
        compass caused by the magnetic influence of some nearby object, such as
        a metal post or an engine.
        <a
          className="underline"
          href="https://marinophorg.wordpress.com/2018/08/19/compass-variation-and-deviation/"
        >
          More info
        </a>
      </p>
      <br />

      {/* Compass -> True */}

      <div className="flex bg-slate-200 pt-3">
        <div className="w-1/2">
          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="compass">
                <strong>Compass</strong>
              </label>
            </div>
            <div className="md:w-3/4">
              <input
                className="input"
                type="number"
                id="compass"
                {...register('compass')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="deviation">Deviation</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="text"
                id="deviation"
                {...register('deviation')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="variation">Magnetic</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                disabled
                type="text"
                id="magnetic"
                {...register('magnetic')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="variation">Variation</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="text"
                id="variation"
                {...register('variation')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="leeway">Leeway</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="text"
                id="leeway"
                {...register('leeway')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="stream">Stream</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="text"
                id="stream"
                {...register('stream')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="trueCourse">True Course</label>
            </div>
            <div className="md:w-4/5">
              <input
                type="number"
                className="input"
                disabled
                id="trueCourse"
                {...register('trueCourse')}
              />
            </div>
          </div>
        </div>

        {/* True -> Compass */}

        <div className="w-1/2">
          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="trueCourse2">
                <strong>True</strong>
              </label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="number"
                id="trueCourse2"
                {...register('trueCourse2')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="stream2">Stream</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="text"
                id="stream2"
                {...register('stream2')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="leeway2">Leeway</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="text"
                id="leeway2"
                {...register('leeway2')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="variation2">Variation</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="text"
                id="variation2"
                {...register('variation2')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="magnetic2">Magnetic</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                disabled
                type="text"
                id="magnetic2"
                {...register('magnetic2')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="deviation2">Deviation</label>
            </div>
            <div className="md:w-4/5">
              <input
                className="input"
                type="text"
                id="deviation2"
                {...register('deviation2')}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <div className="w-1/4">
              <label htmlFor="compass2">Compass</label>
            </div>
            <div className="md:w-4/5">
              <input
                type="number"
                className="input"
                disabled
                id="compass2"
                {...register('compass2')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompassPage;
