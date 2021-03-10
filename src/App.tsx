import React, { useEffect } from 'react';
import { Table, Field, Button } from '@alicloud/console-components';
import styled from 'styled-components';
import { get } from 'lodash';
import Add from './components/Add';
import request from './utils/request';
import Actions, { LinkButton } from '@alicloud/console-components-actions';

function App() {
  const field = Field.useField();
  const { setValue, getValue } = field;

  const fetchData = async () => {
    const res = await request({ url: '/api/user' });
    setValue('data', get(res, 'data.data'));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderOpt = (value: any, index: any, record: any) => {
    const handleEdit = () => {
      setValue('isShowing', true);
      setValue('title', '编辑用户');
      setValue('type', 'edit');
      setValue('record', record);
    };

    const handleDelete = async () => {
      await request({
        url: '/api/user',
        method: 'DELETE',
        data: {
          id: record._id,
        },
      });
      fetchData();
    };
    return (
      <Actions>
        <LinkButton onClick={handleEdit}>编辑</LinkButton>
        <LinkButton onClick={handleDelete}>删除</LinkButton>
      </Actions>
    );
  };

  const handleAdd = () => {
    setValue('isShowing', true);
    setValue('title', '新建用户');
    setValue('type', 'add');
  };

  return (
    <SWrapper>
      <h1>一个简单的CRUD演示(react+axios+egg+mongodb)</h1>
      <Button type="primary" onClick={handleAdd}>
        新建用户
      </Button>
      <Table dataSource={getValue('data')} style={{ marginTop: 16 }}>
        <Table.Column title="姓名" dataIndex="name" width="40%" />
        <Table.Column title="年龄" dataIndex="age" width="40%" />
        <Table.Column title="操作" cell={renderOpt} width="20%" />
      </Table>
      <Add reload={fetchData} field={field} />
    </SWrapper>
  );
}

const SWrapper = styled.div`
  padding: 0 24px;
`;

export default App;
