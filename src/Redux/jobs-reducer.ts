import {Dispatch} from 'react';
import {mainRequestJobs} from '../api/api';

export type JobType = {
  _id: string
  processId: string
  name: string
  status: StatusType
}
export type StatusType = 'running' | 'successed' | 'failed'

const initialState: Array<JobType> = [];

export const jobsReducer = (state: Array<JobType> = initialState, action: ActionsType): Array<JobType> => {
  switch (action.type) {
    case 'JOB/SET-JOB': {

      return action.jobList;
    }
    default: {
      return state;
    }
  }
}
export const setJobAC = (jobList: Array<JobType>) => ({type: 'JOB/SET-JOB', jobList} as const)

export const getJobListTC = () => {
  return async (dispatch: ThunkDispatch) => {
    const res = await mainRequestJobs.getJobs();
      dispatch(setJobAC(res.data.jobList.reverse()));
  }
}

export type AddJobActionType = ReturnType<typeof setJobAC>;


type ActionsType =
  | AddJobActionType


type ThunkDispatch = Dispatch<ActionsType>