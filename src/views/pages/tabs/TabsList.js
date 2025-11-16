import React, { useEffect, useState } from 'react'
import AuthUser from '../../../auth/AuthUser'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import TabsAdd from './TabsAdd'
import { IMG_API_URL } from '../../../helper/url_helper'

export default function TabsList() {
  const { https } = AuthUser()
  const [modal, setModal] = useState(false)
  const [tabs, setTabs] = useState([])

  // Fetch Tabs List
  const getTabs = async () => {
    try {
      const res = await https.get('/navtabs/list')

      if (res.data?.status === 1) {
        setTabs(res.data.data || [])
      }
    } catch (err) {
      console.error('Error loading tabs:', err)
    }
  }

  useEffect(() => {
    getTabs()
  }, [])

 

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="m-0">Tabs List</h4>

        <button className="btn btn-success text-white" onClick={() => setModal(true)}>
          <CIcon icon={cilPlus} /> Add New Tab
        </button>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table text-center align-middle">
            <thead>
              <tr>
                <th>#</th> 
                <th>Tab Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tabs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-muted py-4">
                    No tabs found
                  </td>
                </tr>
              ) : (
                tabs.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1} 
                    </td> 
                    <td className="fw-bold">{item.navtabs_name}</td>
                    <td>
                      {item.navtabs_status == 1 ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-secondary">Inactive</span>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <TabsAdd visible={modal} setVisible={() => setModal(false)} reloadData={getTabs} />
      )}
    </div>
  )
}
