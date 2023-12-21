import { Category, Description, Home, MonetizationOn, Receipt } from '@mui/icons-material';
import { IRoute } from '../component/interfaces/interfaces';
import cost from '../pages/cost';
import dashboard from '../pages/dashboard';
import site from '../pages/site';
import BuyingPlan from './../pages/buyingPlan';
import RefinePlan from './../pages/refinePlan';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: dashboard,
    icon: Home,
    exact: true,
    permission: [
      "Trader",
    ],
  },
  {
    path: '/buyingplan',
    name: 'Buying Plan',
    icon: Category,
    exact: true,
    component: BuyingPlan,
    permission: [
      "Trader",
    ],
    children: [
      {
        path: '/buyingplan',
        name: 'Buying Plan',
        component: BuyingPlan,
        exact: true,
      },
      {
        path: '/refinePlan',
        name: 'Refine Plan',
        component: RefinePlan,
        exact: true,
      },
    ]
  },
  {
    path: '/cost',
    name: 'TIF',
    component: cost,
    icon: MonetizationOn,
    exact: true,
    permission: [
      "Trader",
    ],
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: Receipt,
    exact: true,
    component: site,
    permission: [
      "Trader",
    ],
  },
  {
    path: '/contracts',
    name: 'Contract',
    icon: Description,
    exact: true,
    component: site,
    permission: [
      "Trader",
    ],
  },
  //Orginators 
  {
    path: '/',
    name: 'Home',
    component: dashboard,
    icon: Home,
    exact: true,
    permission: [
      "Originator",
    ],
  },
  {
    path: '/buyingplan',
    name: 'Buying Plan',
    icon: Category,
    exact: true,
    component: BuyingPlan,
    permission: [
      "Originator",
    ],
  },
  {
    path: '/cost',
    name: 'TIF',
    component: cost,
    icon: MonetizationOn,
    exact: true,
    permission: [
      "Originator",
    ],
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: Category,
    exact: true,
    component: site,
    permission: [
      "Originator",
    ],
  },
  {
    path: '/contracts',
    name: 'Contract',
    icon: Category,
    exact: true,
    component: site,
    permission: [
      "Originator",
    ],
  },
]

export default routes;