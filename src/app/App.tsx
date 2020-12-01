import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from 'react-redux';
import {addProcessTC, getProcessTC} from '../Redux/process-reducer';
import {ProcessTable} from '../Components/ProcessTable';

// + просмотр списка процессов
// + просмотр списка джоб каждого из процессов
// + создание нового процесса
// + сортировка процессов по всем полям
// + поиск джобы по имени
// + удаление процесса, включая все его джобы
// + обозначение статуса Process
// + сохранение и загрузка данных с сервака или localStorage
// - обновление данных каждый интервал (10 мин)

const App = () => {
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState<number>(0)

  const [isShowingProcessList, setIsShowingProcessList] = useState<boolean>(false);
  const showProcessList = () => {
    setIsShowingProcessList(!isShowingProcessList)
  };

  useEffect(() => {
    dispatch(getProcessTC());
    clearInterval(intervalId)
    const id = setInterval(() => {
      dispatch(getProcessTC());
    }, 600 * 1000)
    setIntervalId(+id)
    return () => {
      clearInterval(intervalId)
    }
  }, [dispatch])

  const OnClickAddProcess = () => {
    dispatch(addProcessTC())
  };

  return (
    <div className="App">
      <input type={'button'}
             name={'showProcessList'}
             value={'Show process list'}
             onClick={showProcessList}/>
      {isShowingProcessList &&
      <div>
        <input type={'button'}
               name={'addProcess'}
               value={'Add process'}
               onClick={OnClickAddProcess}
        />
        <ProcessTable/>
      </div>
      }
    </div>
  );
}

export default App;
