import {AddJobActionType, getJobListTC} from './jobs-reducer';
import {mainRequestProcesses} from '../api/api';

export type ProcessType = {
  _id: string
  name: string
  startTime: number
  jobsCount: number
}

const initialState: Array<ProcessType> = [];

export const processReducer = (state: Array<ProcessType> = initialState, action: ActionsType): Array<ProcessType> => {
  switch (action.type) {

    case 'PROCESS/SET-PROCESS': {
      return action.data;
    }
    case 'PROCESS/ADD-PROCESS': {
      return [action.newProcess, ...state];
    }
    default: {
      return state
    }
  }
}

export const setProcessListAC = (data: Array<ProcessType>) => ({type: 'PROCESS/SET-PROCESS', data} as const);
export const addProcessAC = (newProcess: ProcessType) => ({type: 'PROCESS/ADD-PROCESS', newProcess} as const);

export const getProcessTC = () => {
  return async (dispatch: any) => {
    const res = await mainRequestProcesses.getProcesses();
    dispatch(setProcessListAC(res.data.processList.reverse()));
    dispatch(getJobListTC());
  }
}

export const addProcessTC = () => {
  return async (dispatch: any) => {
    const res = await mainRequestProcesses.addProcess();
    if (res.status === 201) {
      dispatch(getProcessTC());
    }
  }
}

export const removeProcessTC = (id: string) => {
  return async (dispatch: any) => {
    const res = await mainRequestProcesses.removeProcess(id);
    if (res.status === 201) {
      dispatch(getProcessTC());
    }
  }
}

export type SetProcessActionType = ReturnType<typeof setProcessListAC>;
export type AddProcessActionType = ReturnType<typeof addProcessAC>;

type ActionsType =
  | SetProcessActionType
  | AddProcessActionType
  | AddJobActionType


