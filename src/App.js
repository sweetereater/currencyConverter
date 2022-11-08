import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Converter } from './components/Converter/Converter';
import { Preloader } from './components/Preloader/Preloader';

import { getData, selectLoadingStatus } from './features/converter/converterSlice';

import './App.css';

function App() {

  const isLoading = useSelector(selectLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData())
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading ? <Preloader /> : <Converter />}
    </div>
  );
}

export default App;
