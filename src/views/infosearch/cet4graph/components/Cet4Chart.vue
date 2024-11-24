<script lang="ts" setup>
  import { useECharts } from '@/hooks/web/useECharts';
  import Database from '@tauri-apps/plugin-sql';
  import { onMounted, ref, watch } from 'vue';
  import type { createEChartsOption } from '@/hooks/web/useECharts';
  import type { Ref } from 'vue';

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const data = ref<number[]>([]);
  const categories = ref<string[]>(['0-300', '300-425', '425-550', '550-710']);

  const fetchCet4Scores = async () => {
    try {
      const db = await Database.load('mysql://root:swjtu2048@47.113.231.58:56888/DBCOURSE');
      const result = await db.select('SELECT Ssc FROM Stu');
      const scores = result.map((item: any) => item.Ssc);
      const scoreDistribution = Array(4).fill(0); // 分成4个区间

      scores.forEach((score: number) => {
        if (score <= 300) {
          scoreDistribution[0]++;
        } else if (score <= 425) {
          scoreDistribution[1]++;
        } else if (score <= 550) {
          scoreDistribution[2]++;
        } else if (score <= 710) {
          scoreDistribution[3]++;
        }
      });

      data.value = scoreDistribution;
    } catch (error) {
      console.error('Failed to fetch CET4 scores:', error);
    }
  };

  const options = ref<createEChartsOption>({
    xAxis: {
      type: 'category',
      data: categories.value,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: data.value,
        label: {
          show: true,
          position: 'top',
        },
        itemStyle: {
          color: '#409eff',
        },
      },
    ],
    grid: {
      left: '1%',
      right: '10%',
      top: '5%',
      bottom: 0,
      containLabel: true,
    },
  });

  onMounted(async () => {
    await fetchCet4Scores();
    setOptions(options.value);
  });

  watch(data, newData => {
    options.value.series[0].data = newData;
    setOptions(options.value);
  });
</script>

<template>
  <div>
    <h3>CET4 成绩分布</h3>
    <div ref="chartRef" class="chart-ref" />
  </div>
</template>

<style scoped lang="scss">
  .chart-ref {
    width: 100%;
    height: 380px;
  }
</style>
