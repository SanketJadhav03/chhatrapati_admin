import React, { useEffect, useState } from 'react'
import AuthUser from '../../../auth/AuthUser'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import TabsAdd from './TabsAdd'

function TabsList() {
  const { http } = AuthUser()
  const [modal, setModal] = useState(false)
  const [tabs, setTabs] = useState([])
  useEffect(() => {
    http.get('/tabs/list').then((res) => {
      if (res.data.length > 0) {
        setTabs(res.data)
      }
    })
  }, [])
  return (
    <div className="card">
      <div className="card-header">
        <div className="h3 float-start">Customer</div>
        <div className="float-end">
          <div className="btn btn-success text-white">
            <CIcon icon={cilPlus} />
            Add Customer
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Tab Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      {
        <TabsAdd
          visible={modal}
          setVisible={() => {
            setModal(!visible)
          }}
        ></TabsAdd>
      }
    </div>
  )
}

export default TabsList
