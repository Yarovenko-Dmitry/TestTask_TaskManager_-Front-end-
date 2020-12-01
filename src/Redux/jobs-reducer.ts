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
    case 'SET-JOB': {

      return action.jobList;
    }
    case 'REMOVE-JOB': {
      return action.jobList;
    }
    default: {
      return state;
    }
  }
}
export const setJobAC = (jobList: Array<JobType>) => ({type: 'SET-JOB', jobList} as const)
export const removeJobAC = (jobList: Array<JobType>) => ({type: 'REMOVE-JOB',  jobList} as const)

export const getJobListTC = () => {
  return async (dispatch: ThunkDispatch) => {
    const res = await mainRequestJobs.getJobs();
      dispatch(setJobAC(res.data.jobList.reverse()));
  }
}

// export const removeJobTC = (processId: string) => {
//   return async (dispatch: ThunkDispatch) => {
//     const res = await mainRequestJobs.removeJobs(processId)
//     console.log('removeJobTC res', res)
//     // dispatch(removeJobAC(jobList))
//   }
// }

export type AddJobActionType = ReturnType<typeof setJobAC>;
export type RemoveJobActionType = ReturnType<typeof removeJobAC>;

type ActionsType =
  | AddJobActionType
  | RemoveJobActionType

type ThunkDispatch = Dispatch<ActionsType>