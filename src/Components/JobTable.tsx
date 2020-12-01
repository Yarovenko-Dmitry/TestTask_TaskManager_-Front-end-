import {Button, Input, Space, Table} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../app/store';
import {removeProcessTC} from '../Redux/process-reducer';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {JobType} from '../Redux/jobs-reducer';

export const JobTable = (props: any) => {

  const filtredJobsList = useSelector<AppRootStateType, Array<JobType>>((state) =>
    state.jobs.filter(tl => tl.processId === props.currentRowId));

  const inputEl = useRef(null)

  useEffect(() => {
    props.setcurrentRowId(props.currentRowId)
  }, [])

  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any) => ({

    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
      <div style={{padding: 8}}>
        <Input
          ref={inputEl}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined/>}
            size="small"
            style={{width: 90}}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        // setTimeout(() => inputEl.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: any = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      sorter: (a: JobType, b: JobType) => {
        if (a._id.toLowerCase() < b._id.toLowerCase()) return -1;
        else if (a._id.toLowerCase() > b._id.toLowerCase()) return 1;
        return 0;
      },
      ellipsis: true,
    },
    {
      title: 'ProcessId',
      dataIndex: 'processId',
      key: 'processId',
      sorter: (a: JobType, b: JobType) => {
        if (a.processId.toLowerCase() < b.processId.toLowerCase()) return -1;
        else if (a.processId.toLowerCase() > b.processId.toLowerCase()) return 1;
        return 0;
      },
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: JobType, b: JobType) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      },
      ellipsis: true,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: JobType, b: JobType) => {
        if (a.status.toLowerCase() < b.status.toLowerCase()) return -1;
        else if (a.status.toLowerCase() > b.status.toLowerCase()) return 1;
        return 0;
      },
      ellipsis: true,
    },
    // {
    //   title: 'Remove job',
    //   dataIndex: 'removeJob',
    //   key: 'removeJob',
    //
    //   render: (text: any, record: any) => <button
    //     name={'removeJob'}
    //     onClick={() => {
    //       // debugger
    //       removeProcessTC(record._id)
    //       // console.log('recordKEY ', record.id)
    //     }}>Remove job</button>
    // }
  ];

  return (
    <div>
      <Table columns={columns}
             rowKey={record => record._id}
             dataSource={filtredJobsList}
             pagination={false}
      />
    </div>
  )
}
