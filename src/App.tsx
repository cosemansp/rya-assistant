import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import CompassPage from './pages/compass';
import TidesPage from './pages/tides';
import CalcPage from './pages/calc';

// Samples
// https://www.cockpitcards.co.uk/variation-and-deviation/

function Layout() {
  return (
    <div className="m-3">
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul className="flex space-x-2">
          <li>
            <Link className="underline" to="/">
              Compass
            </Link>
          </li>
          <li>
            <Link className="underline" to="/tides">
              Tides
            </Link>
          </li>
          <li>
            <Link className="underline" to="/calc">
              Calc`
            </Link>
          </li>
        </ul>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we de  fined above. */}
      <div className="mt-3">
        <Outlet />
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 className="mx-3 mt-3 text-2xl font-bold">RYA Assistant</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<CompassPage />} />
          <Route path="/tides" element={<TidesPage />} />
          <Route path="/calc" element={<CalcPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  //   formState: { errors }
  // } = useForm({
  //   mode: 'onBlur',
  //   defaultValues: {
  //     compass: 0,
  //     deviation: '',
  //     variation: '',
  //     magnetic: 0,
  //     leeway: '',
  //     stream: '',
  //     trueCourse: 0,
  //     compass2: 0,
  //     deviation2: '',
  //     variation2: '',
  //     magnetic2: 0,
  //     leeway2: '',
  //     stream2: '',
  //     trueCourse2: 0
  //   }
  // });
  // watch((data, { name, type }) => {
  //   if (
  //     name === 'trueCourse' ||
  //     name === 'compass2' ||
  //     name === 'magnetic' ||
  //     name === 'magnetic2'
  //   ) {
  //     return;
  //   }
  //   // M - T
  //   let trueCourse = Number(data.compass) || 0;
  //   const deviation = data.deviation?.toLowerCase() || '';
  //   if (deviation.endsWith('e')) {
  //     trueCourse = trueCourse + Number(deviation.replace('e', ''));
  //   }
  //   if (deviation.endsWith('w')) {
  //     trueCourse = trueCourse - Number(deviation.replace('w', ''));
  //   }
  //   let magnetic = Number(data.compass) || 0;
  //   if (deviation.endsWith('e')) {
  //     magnetic = magnetic + Number(deviation.replace('e', ''));
  //   }
  //   if (deviation.endsWith('w')) {
  //     magnetic = magnetic - Number(deviation.replace('w', ''));
  //   }
  //   const variation = data.variation?.toLowerCase() || '';
  //   if (variation.endsWith('e')) {
  //     trueCourse = trueCourse + Number(variation.replace('e', ''));
  //   }
  //   if (variation.endsWith('w')) {
  //     trueCourse = trueCourse - Number(variation.replace('w', ''));
  //   }
  //   const leeway = data.leeway?.toLowerCase() || '';
  //   if (leeway.endsWith('e')) {
  //     trueCourse = trueCourse + Number(leeway.replace('e', ''));
  //   }
  //   if (leeway.endsWith('w')) {
  //     trueCourse = trueCourse - Number(leeway.replace('w', ''));
  //   }
  //   const stream = data.stream?.toLowerCase() || '';
  //   if (stream.endsWith('e')) {
  //     trueCourse = trueCourse + Number(stream.replace('e', ''));
  //   }
  //   if (stream.endsWith('w')) {
  //     trueCourse = trueCourse - Number(stream.replace('w', ''));
  //   }
  //   if (trueCourse < 0) {
  //     trueCourse = 360 + trueCourse;
  //   }
  //   if (trueCourse > 360) {
  //     trueCourse = trueCourse - 360;
  //   }
  //   setValue('trueCourse', trueCourse);
  //   setValue('magnetic', magnetic);
  //   // T - M
  //   let compass2 = Number(data.trueCourse2) || 0;
  //   // console.log('compass2', compass2);
  //   const stream2 = data.stream2?.toLowerCase() || '';
  //   if (stream2.endsWith('e')) {
  //     compass2 = compass2 - Number(stream2.replace('e', ''));
  //   }
  //   if (stream2.endsWith('w')) {
  //     compass2 = compass2 + Number(stream2.replace('w', ''));
  //   }
  //   const leeway2 = data.leeway2?.toLowerCase() || '';
  //   if (leeway2.endsWith('e')) {
  //     compass2 = compass2 - Number(leeway2.replace('e', ''));
  //   }
  //   if (leeway2.endsWith('w')) {
  //     compass2 = compass2 + Number(leeway2.replace('w', ''));
  //   }
  //   let magnetic2 = compass2 || 0;
  //   const variation2 = data.variation2?.toLowerCase() || '';
  //   if (variation2.endsWith('e')) {
  //     compass2 = compass2 - Number(variation2.replace('e', ''));
  //   }
  //   if (variation2.endsWith('w')) {
  //     compass2 = compass2 + Number(variation2.replace('w', ''));
  //   }
  //   if (variation2.endsWith('e')) {
  //     magnetic2 = magnetic2 - Number(variation2.replace('e', ''));
  //   }
  //   if (variation2.endsWith('w')) {
  //     magnetic2 = magnetic2 + Number(variation2.replace('w', ''));
  //   }
  //   const deviation2 = data.deviation2?.toLowerCase() || '';
  //   if (deviation2.endsWith('e')) {
  //     compass2 = compass2 - Number(deviation2.replace('e', ''));
  //   }
  //   if (deviation2.endsWith('w')) {
  //     compass2 = compass2 + Number(deviation2.replace('w', ''));
  //   }
  //   if (compass2 < 0) {
  //     compass2 = 360 + compass2;
  //   }
  //   if (compass2 > 360) {
  //     compass2 = compass2 - 360;
  //   }
  //   setValue('compass2', compass2);
  //   setValue('magnetic2', magnetic2);
  // });
  // return (
  //   <div>
  //     <h1 className="text-2xl font-bold">Compass calculator</h1>
  //     <p className="prosa">
  //       <strong>Magnetic Variation </strong>is due to the differing positions of
  //       the Geographic North Pole and the Magnetic North Pole. The boat’s
  //       compass and a hand bearing compass point to the Magnetic Pole, but all
  //       bearings on charts are related to the Geographic Pole (True North).
  //     </p>
  //     <br />
  //     <p>
  //       <strong>Deviation</strong> is the error in reading a bearing from the
  //       compass caused by the magnetic influence of some nearby object, such as
  //       a metal post or an engine.
  //       <a
  //         className="underline"
  //         href="https://marinophorg.wordpress.com/2018/08/19/compass-variation-and-deviation/"
  //       >
  //         More info
  //       </a>
  //     </p>
  //     <br />
  //     {/* Compass -> True */}
  //     <div className="flex bg-slate-200 pt-3">
  //       <div className="w-1/2">
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="compass">
  //               <strong>Compass</strong>
  //             </label>
  //           </div>
  //           <div className="md:w-3/4">
  //             <input
  //               className="input"
  //               type="number"
  //               id="compass"
  //               {...register('compass')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="deviation">Deviation</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="text"
  //               id="deviation"
  //               {...register('deviation')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="variation">Magnetic</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               disabled
  //               type="text"
  //               id="magnetic"
  //               {...register('magnetic')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="variation">Variation</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="text"
  //               id="variation"
  //               {...register('variation')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="leeway">Leeway</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="text"
  //               id="leeway"
  //               {...register('leeway')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="stream">Stream</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="text"
  //               id="stream"
  //               {...register('stream')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="trueCourse">True Course</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               type="number"
  //               className="input"
  //               disabled
  //               id="trueCourse"
  //               {...register('trueCourse')}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       {/* True -> Compass */}
  //       <div className="w-1/2">
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="trueCourse2">
  //               <strong>True</strong>
  //             </label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="number"
  //               id="trueCourse2"
  //               {...register('trueCourse2')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="stream2">Stream</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="text"
  //               id="stream2"
  //               {...register('stream2')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="leeway2">Leeway</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="text"
  //               id="leeway2"
  //               {...register('leeway2')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="variation2">Variation</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="text"
  //               id="variation2"
  //               {...register('variation2')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="magnetic2">Magnetic</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               disabled
  //               type="text"
  //               id="magnetic2"
  //               {...register('magnetic2')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="deviation2">Deviation</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               className="input"
  //               type="text"
  //               id="deviation2"
  //               {...register('deviation2')}
  //             />
  //           </div>
  //         </div>
  //         <div className="mb-6 flex items-center">
  //           <div className="w-1/4">
  //             <label htmlFor="compass2">Compass</label>
  //           </div>
  //           <div className="md:w-4/5">
  //             <input
  //               type="number"
  //               className="input"
  //               disabled
  //               id="compass2"
  //               {...register('compass2')}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
