import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Workbench from '@/components/workbench'
import Message from '@/components/message'
import Me from '@/components/me'
import ParamList from '@/components/param/list'
import Add from '@/components/device/add'
import Edit from '@/components/device/edit'
import Detail from '@/components/device/detail'
import Diagnose from '@/components/device/diagnose'
import Repair from '@/components/device/repair'
import Module from '@/components/device/module'
import Location from '@/components/device/location'
import PasswdSet from '@/components/device/passwdSet'
import Query from '@/components/device/query'
import StandardList from '@/components/standard/list'
import StandardAdd from '@/components/standard/add'
import StandardEdit from '@/components/standard/edit'
import FaultList from '@/components/fault/list'
import FaultQuery from '@/components/fault/query'
import FaultAdd from '@/components/fault/add'
import FaultEdit from '@/components/fault/edit'
import FaultPlan from '@/components/fault/plan'
import TimerSetup from '@/components/timer/setup'
import WarnList from '@/components/warn/list'
import WaitEvents from '@/components/me/waitEvents'
import PhoneChange from '@/components/me/phoneChange'
import Advice from '@/components/me/advice'
import Setup from '@/components/me/setup'
import Version from '@/components/me/version'
import UpgradeUpload from '@/components/me/upgradeUpload'
import OrderMe from '@/components/order/me'
import OrderSubmit from '@/components/order/submit'
import OrderVerify from '@/components/order/verify'
import OrderHandle from '@/components/order/handle'
import OrderCount from '@/components/order/count'
import ClientList from '@/components/client/list'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/workbench',
    name: 'Workbench',
    component: Workbench
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/param/list',
    name: 'ParamList',
    component: ParamList
  },
  {
    path: '/device/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/device/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/device/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/device/diagnose',
    name: 'Diagnose',
    component: Diagnose
  },
  {
    path: '/device/repair',
    name: 'Repair',
    component: Repair
  },
  {
    path: '/device/location',
    name: 'Location',
    component: Location
  },
  {
    path: '/device/passwdSet',
    name: 'PasswdSet',
    component: PasswdSet
  },
  {
    path: '/device/query',
    name: 'Query',
    component: Query
  },
  {
    path: '/device/module',
    name: 'Module',
    component: Module
  },
  {
    path: '/standard/list',
    name: 'StandardList',
    component: StandardList
  },
  {
    path: '/standard/add',
    name: 'StandardAdd',
    component: StandardAdd
  },
  {
    path: '/standard/edit',
    name: 'StandardEdit',
    component: StandardEdit
  },
  {
    path: '/fault/list',
    name: 'FaultList',
    component: FaultList
  },
  {
    path: '/fault/query',
    name: 'FaultQuery',
    component: FaultQuery
  },
  {
    path: '/fault/add',
    name: 'FaultAdd',
    component: FaultAdd
  },
  {
    path: '/fault/edit',
    name: 'FaultEdit',
    component: FaultEdit
  },
  {
    path: '/fault/plan',
    name: 'FaultPlan',
    component: FaultPlan
  },
  {
    path: '/timer/setup',
    name: 'TimerSetup',
    component: TimerSetup
  },
  {
    path: '/warn/list',
    name: 'WarnList',
    component: WarnList
  },
  {
    path: '/me/waitEvents',
    name: 'WaitEvents',
    component: WaitEvents
  },
  {
    path: '/me/phoneChange',
    name: 'PhoneChange',
    component: PhoneChange
  },
  {
    path: '/me/setup',
    name: 'Setup',
    component: Setup
  },
  {
    path: '/me/advice',
    name: 'Advice',
    component: Advice
  },
  {
    path: '/me/version',
    name: 'Version',
    component: Version
  },
  {
    path: '/me/upgradeUpload',
    name: 'UpgradeUpload',
    component: UpgradeUpload
  },
  {
    path: '/order/me',
    name: 'OrderMe',
    component: OrderMe
  },
  {
    path: '/order/submit',
    name: 'OrderSubmit',
    component: OrderSubmit
  },
  {
    path: '/order/verify',
    name: 'OrderVerify',
    component: OrderVerify
  },
  {
    path: '/order/handle',
    name: 'OrderHandle',
    component: OrderHandle
  },
  {
    path: '/order/count',
    name: 'OrderCount',
    component: OrderCount
  },
  {
    path: '/client/list',
    name: 'ClientList',
    component: ClientList
  }
]

export default routes
