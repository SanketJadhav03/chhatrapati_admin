import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormSwitch,
  CImage,
} from '@coreui/react'
import { toast } from 'react-toastify'
import AuthUser from '../../../auth/AuthUser'

export default function TabsAdd({ visible, setVisible, reloadData }) {
  const [data, setData] = useState({
    navtabs_name: '',
    navtabs_description: '',
    navtabs_status: 1,
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const { https } = AuthUser()

  // -------------------------
  // IMAGE CHANGE
  // -------------------------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    setImageFile(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // -------------------------
  // FORM SUBMIT
  // -------------------------
  const handleSave = async () => {
    if (!data.navtabs_name.trim()) {
      toast.error('Navtabs name is required!')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('navtabs_name', data.navtabs_name)
      formData.append('navtabs_description', data.navtabs_description)
      formData.append('navtabs_status', data.navtabs_status)
      console.log(data.navtabs_status);
      
      if (imageFile) formData.append('navtabs_image', imageFile)
        
        const res = await https.post('/navtabs/store', formData)
        
        toast.success(res.data.message || 'Navtabs added successfully!')
 

      reloadData && reloadData()

      setVisible(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // RESET MODAL
  // -------------------------
  const resetModal = () => {
    setData({
      navtabs_name: '',
      navtabs_description: '',
      navtabs_status: 1,
    })
    setImagePreview(null)
    setImageFile(null)
    setLoading(false)
  }

  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      onClosed={resetModal}
      alignment="center"
      size="lg"
      backdrop="static"
      className="shadow-lg rounded-4"
    >
      <CModalHeader className="rounded-top-4">
        <CModalTitle className="fw-bold fs-4">Add New Navtabs</CModalTitle>
      </CModalHeader>

      <CModalBody className="p-4">
        <div className="d-flex gap-4 flex-wrap">
          {/* IMAGE BOX */}
          <div className="text-center">
            <CImage
              rounded
              className="shadow-sm border"
              src={imagePreview || 'https://via.placeholder.com/140x140.png?text=Upload+Image'}
              width={150}
              height={150}
            />
            <CFormInput
              type="file"
              accept="image/*"
              className="mt-3"
              onChange={handleImageChange}
            />
          </div>

          {/* FORM FIELDS */}
          <div className="flex-grow-1">
            <label className="fw-bold mb-1">Navtabs Name *</label>
            <CFormInput
              placeholder="e.g, Home, About..."
              value={data.navtabs_name}
              onChange={(e) => setData({ ...data, navtabs_name: e.target.value })}
              className="mb-3"
            />

            <label className="fw-bold mb-1">Navtabs Description</label>
            <CFormTextarea
              rows={4}
              placeholder="Describe your navtabs..."
              value={data.navtabs_description}
              onChange={(e) => setData({ ...data, navtabs_description: e.target.value })}
              className="mb-3"
            />

            <CFormSwitch
              label="Active Navtabs"
              checked={data.navtabs_status == 1}
              onChange={(e) => setData({ ...data, navtabs_status: data.navtabs_status == 1 ? 0 : 1 })}
            />
          </div>
        </div>
      </CModalBody>

      <CModalFooter className="px-4 pb-4">
        <CButton color="secondary" variant="outline" onClick={() => setVisible(false)}>
          Cancel
        </CButton>

        <CButton color="primary" className="px-4" disabled={loading} onClick={handleSave}>
          {loading ? 'Saving...' : 'Save Navtabs'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
