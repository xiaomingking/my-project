import Vue from 'vue'
import Router from 'vue-router'
import Console from '@/components/Console'
import Homedoc from '@/components/homedoctor/Homedoc'
import Medical from '@/components/homedoctor/Medical'
import Service from '@/components/homedoctor/Service'
import User from '@/components/homedoctor/User'
import Team from '@/components/homedoctor/Team'
import Meal from '@/components/homedoctor/Meal'
import Online from '@/components/online/Online'
import Admiss from '@/components/online/Admiss'
import Library from '@/components/online/Library'
import Groups from '@/components/online/Groups'
import Assess from '@/components/online/Assess'
import Dynamics from '@/components/online/Dynamics'
import Information from '@/components/information/Information'
import Hospital from '@/components/information/Hospital'
import Doctor from '@/components/information/Doctor'
import Record from '@/components/information/Record'
import Trade from '@/components/trade/Trade'
import Order from '@/components/trade/Order'
import Refunds from '@/components/trade/Refunds'
import Count from '@/components/count/Count'
import Case from '@/components/count/Case'
import Status from '@/components/count/Status'
import System from '@/components/system/System'
import Usergroup from '@/components/system/Usergroup'
import Admin from '@/components/system/Admin'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/console',
      component: Console
    },
    {
      path: '/homedoc',
      component: Homedoc,
      children: [
        {
          path: '',
          component: Medical
        },
        {
          path: '/homedoc/medical',
          component: Medical
        },
        {
          path: '/homedoc/service',
          component: Service
        },
        {
          path: '/homedoc/user',
          component: User
        },
        {
          path: '/homedoc/team',
          component: Team
        },
        {
          path: '/homedoc/meal',
          component: Meal
        }
      ]
    },
    {
      path: '/online',
      component: Online,
      children: [
        {
          path: '',
          component: Admiss
        },
        {
          path: '/online/admiss',
          component: Admiss
        },
        {
          path: '/online/library',
          component: Library
        },
        {
          path: '/online/groups',
          component: Groups
        },
        {
          path: '/online/assess',
          component: Assess
        },
        {
          path: '/online/dynamics',
          component: Dynamics
        }
      ]
    },
    {
      path: '/information',
      component: Information,
      children: [
        {
          path: '',
          component: Hospital
        },
        {
          path: '/information/hospital',
          component: Hospital
        },
        {
          path: '/information/doctor',
          component: Doctor
        },
        {
          path: '/information/record',
          component: Record
        }
      ]
    },
    {
      path: '/trade',
      component: Trade,
      children: [
        {
          path: '',
          component: Order
        },
        {
          path: '/trade/order',
          component: Order
        },
        {
          path: '/trade/refunds',
          component: Refunds
        }
      ]
    },
    {
      path: '/count',
      component: Count,
      children: [
        {
          path: '',
          component: Case
        },
        {
          path: '/count/case',
          component: Case
        },
        {
          path: '/count/status',
          component: Status
        }
      ]
    },
    {
      path: '/system',
      component: System,
      children: [
        {
          path: '',
          component: Usergroup
        },
        {
          path: '/system/usergroup',
          component: Usergroup
        },
        {
          path: '/system/admin',
          component: Admin
        }
      ]
    }
  ]
})
