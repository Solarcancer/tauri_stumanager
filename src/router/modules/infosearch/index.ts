import { t } from '@/hooks/web/useI18n';
import type { AppRouteRecordRaw } from '@/router/type';
const infosearch: AppRouteRecordRaw[] = [
  {
    path: '/infosearch',
    redirect: '/infosearch/limitationsearch',
    name: 'RtInfoSearch',
    meta: {
      title: t('route.pathName.infosearch'),
      icon: 'components',
      position: 7,
    },
    children: [
      {
        path: 'limitationsearch',
        name: 'RtLimitationSearch',
        component: () => import('@/views/infosearch/limitationsearch/index.vue'),
        meta: { title: t('route.pathName.limitationsearch') },
      },
      {
        path: 'graphshow',
        name: 'RtGraphShow',
        component: () => import('@/views/infosearch/graphshow/index.vue'),
        meta: { title: t('route.pathName.graphshow') },
      },
      {
        path: 'cet4graph',
        name: 'RtCet4Graph',
        component: () => import('@/views/infosearch/cet4graph/index.vue'),
        meta: { title: t('route.pathName.cet4graph') },
      },
    ],
  },
];
export default infosearch;
