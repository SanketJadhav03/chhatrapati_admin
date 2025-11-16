import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilClock,
  cilContact,
  cilCursor,
  cilDescription,
  cilDrop,
  cilEnvelopeOpen,
  cilExternalLink,
  cilFilterFrames,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPowerStandby,
  cilPuzzle,
  cilSettings,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilUserPlus,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Customers',
  //   to: '/customers',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  // },

   

  {
    component: CNavGroup,
    name: 'Settings',
    to: '',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [ 
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/tabs',
      },
    ],
  },
   

  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilPowerStandby} customClassName="nav-icon" />,
  },
]

export default _nav
