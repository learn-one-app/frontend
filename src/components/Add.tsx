import React from 'react'
import {
  Field,
  Button,
  Form,
  Input,
  NumberPicker,
} from '@alicloud/console-components'
import SlidePanel from '@alicloud/console-components-slide-panel'
import request from '../utils/request'

function Add() {
  const field = Field.useField()
  const { setValue, getValue, init, validate } = field

  const handleConfirm = () => {
    validate(async (errors, values) => {
      console.log(errors, values)
      setValue('isProcessing', true)
      try {
        await request({
          url: '/api/user',
          method: 'post',
          data: {
            name: getValue('name'),
            age: getValue('age'),
          },
        })
        setValue('isShowing', false)
        setValue('isProcessing', false)
      } catch (error) {
        setValue('isProcessing', false)
      }
    })
  }

  return (
    <div>
      <Button type="primary" onClick={() => setValue('isShowing', true)}>
        新建用户
      </Button>
      <SlidePanel
        title={'新建用户'}
        isShowing={getValue('isShowing')}
        width="medium"
        onClose={() => setValue('isShowing', false)}
        onCancel={() => setValue('isShowing', false)}
        onOk={handleConfirm}
        isProcessing={getValue('isProcessing')}
      >
        <Form field={field}>
          <Form.Item label="姓名" required>
            <Input
              {...init('name', {
                rules: {
                  required: true,
                  message: '请输入姓名',
                },
              })}
            />
          </Form.Item>
          <Form.Item label="年龄" required>
            <NumberPicker
              style={{ width: '100%' }}
              {...init('age', {
                rules: {
                  required: true,
                  message: '请输入年龄',
                },
              })}
            />
          </Form.Item>
        </Form>
      </SlidePanel>
    </div>
  )
}

export default Add
