import {Space, Table} from 'antd';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../app/store';
import {JobTable} from './JobTable';
import {ProcessType, removeProcessTC} from '../Redux/process-reducer';
import {JobType} from '../Redux/jobs-reducer';


export const ProcessTable = () => {
  const dispatch = useDispatch()
  const processList = useSelector<AppRootStateType, Array<ProcessType>>((state) => state.process);
  const jobs = useSelector<AppRootStateType, Array<JobType>>((state) => state.jobs);
  const [currentRowId, setcurrentRowId] = useState<string>('');

  const columns: any = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      sorter: (a: ProcessType, b: ProcessType) => {
        if (a._id.toLowerCase() < b._id.toLowerCase()) return -1;
        else if (a._id.toLowerCase() > b._id.toLowerCase()) return 1;
        return 0;
      },
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: ProcessType, b: ProcessType) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      },
      ellipsis: true,
    },
    {
      title: 'Start time',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a: ProcessType, b: ProcessType) => a.startTime - b.startTime,
      ellipsis: true,
    },
    {
      title: 'Jobs count',
      dataIndex: 'jobsCount',
      key: 'jobsCount',
      sorter: (a: ProcessType, b: ProcessType) => a.jobsCount - b.jobsCount,
      ellipsis: true,
    },
    {
      title: 'Remove process',
      dataIndex: 'removeProcess',
      key: 'removeProcess',

      render: (text: any, record: any) => <button
        name={'removeProcess'}
        onClick={() => {
          dispatch(removeProcessTC(record._id));
        }}>Remove process</button>
    },
  ];
  const onChange = (sorter: any) => {
    // console.log('params', sorter);
  }

  const paintRow = (record: ProcessType, index: any): string => {
    let runningCount: number = 0;

    for (let i = 0; i < jobs.length; i++) {
      let j = jobs[i];
      if (j.processId === record._id) {
        if (j.status === 'failed') {
          return 'FAILD_CLASS'
        }
        if (j.status === 'running') {
          runningCount += 1
        }
      }
    }
    if (runningCount) {
      return 'RUNNING_CLASS'
    }
    return 'SUCCESSED_CLASS'
  }

  return (
    <div>
      <Space style={{marginBottom: 16}}>
      </Space>
      <Table dataSource={processList}
             columns={columns}
             onChange={onChange}
             rowKey={record => record._id}
             expandable={{
               expandedRowRender: record => <JobTable setcurrentRowId={setcurrentRowId}
                                                      currentRowId={record._id}
                                                      processId={record._id}
                                                      jobsCountNumber={+record.jobsCount}/>,
               rowExpandable: record => record.name !== 'Not Expandable',
               expandRowByClick: false
             }}
             pagination={false}
             rowClassName={paintRow}
      />
    </div>
  )
}
