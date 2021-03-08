import React, { useEffect } from 'react'
import { Table, Field } from '@alicloud/console-components'
import axios from 'axios'
import styled from 'styled-components'
import { get } from 'lodash'

function App() {
  const field = Field.useField()
  const { setValue, getValue } = field

  const fetchData = async () => {
    const res = await axios.get('/api/user')
    setValue('data', get(res, 'data.data'))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SWrapper>
      <Table dataSource={getValue('data')}>
        <Table.Column title="姓名" dataIndex="name" />
        <Table.Column title="年龄" dataIndex="age" />
      </Table>
    </SWrapper>
  )
}

const SWrapper = styled.div`
  padding: 32px;
`

export default App
