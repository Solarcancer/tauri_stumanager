<script lang="ts" setup>
  import { useECharts } from '@/hooks/web/useECharts';
  import { useMessage } from '@/hooks/web/useMessage';
  import Database from '@tauri-apps/plugin-sql';
  import { registerMap } from 'echarts';
  import { onMounted, ref } from 'vue';
  import type { EChartsOption } from 'echarts';
  import type { Ref } from 'vue';

  const { createErrorMsg } = useMessage();
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  interface ProvinceData {
    name: string;
    value: number;
  }

  const provinceData = ref<ProvinceData[]>([]);

  const fetchProvinceData = async () => {
    try {
      const db = await Database.load('yourSql&Passowrd');
      const result = await db.select('SELECT Sjg FROM Stu');
      console.log('Fetched data:', result); // 添加日志

      // 使用正则表达式提取省份信息
      const provinceCount: { [key: string]: number } = {};
      const provinceRegex = /^(.*?)(省|市|自治区|特别行政区)/;

      result.forEach((item: any) => {
        const match = item.Sjg.match(provinceRegex);
        if (match) {
          const province = match[1]; // 只取省份名称，不包括后缀
          if (provinceCount[province]) {
            provinceCount[province]++;
          } else {
            provinceCount[province] = 1;
          }
        }
      });

      console.log('Province count:', provinceCount); // 添加日志

      provinceData.value = Object.keys(provinceCount).map(province => ({
        name: province,
        value: provinceCount[province],
      }));

      console.log('Province data:', provinceData.value); // 添加日志
    } catch (error) {
      createErrorMsg(error as string);
    }
  };

  onMounted(async () => {
    await fetchProvinceData();
    const chinaMap = (await import('@/views/echarts/map/china.json')).default;
    registerMap('china', chinaMap);

    const mapOption: EChartsOption = {
      tooltip: {
        trigger: 'item',
      },
      visualMap: {
        min: 0,
        max: Math.max(...provinceData.value.map(item => item.value)),
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
      },
      series: [
        {
          name: '学生数量',
          type: 'map',
          map: 'china',
          roam: true,
          label: {
            show: true,
          },
          data: provinceData.value,
        },
      ],
    };

    setOptions(mapOption);
  });
</script>

<template>
  <div class="page-container">
    <div ref="chartRef" class="chart-ref" />
  </div>
</template>

<style scoped>
  .chart-ref {
    width: 100%;
    height: 600px;
  }
</style>
