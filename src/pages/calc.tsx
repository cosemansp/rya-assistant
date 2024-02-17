import React from 'react';
import { set, useForm } from 'react-hook-form';
import { minToHour } from '../utils';
import { CalcVariation } from './calc-travel';
import { CalcTime } from './calc-time';
import { CalcSpeed } from './calc-speed';
import { CalcDistance } from './calc-distance';

function CalcPage() {
  return (
    <div className="flex flex-wrap gap-2">
      <CalcTime />
      <CalcSpeed />
      <CalcDistance />
      <CalcVariation />
    </div>
  );
}

export default CalcPage;
