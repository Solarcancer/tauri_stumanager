import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';

const totalview: AppRouteRecordRaw[] = [
  {
    path: '/infomanage',
    redirect: '/infomanage/totalview',
    name: 'RtInfoManage',
    meta: {
      title: t('route.pathName.infomanage'),
      icon: 'iEL-grid',
      alwaysShow: false,
      position: 6,
    },
    children: [
      {
        path: 'totalview',
        name: 'RtTotalView',
        component: () => import('@/views/infomanage/totalview/index.vue'),
        meta: { title: t('route.pathName.totalview') },
      },
      {
        path: 'addstu',
        name: 'RtAddStu',
        component: () => import('@/views/infomanage/addstu/index.vue'),
        meta: { title: t('route.pathName.addstu') },
      },
    ],
  },
];

export default totalview;
