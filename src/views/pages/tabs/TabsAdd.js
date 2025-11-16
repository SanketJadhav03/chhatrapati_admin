import { CModal } from '@coreui/react'
import React from 'react'

function TabsAdd({
    visible,
    setVisible
}) {
  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>TabsAdd</CModal>
  )
}

export default TabsAdd