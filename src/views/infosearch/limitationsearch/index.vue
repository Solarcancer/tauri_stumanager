<script lang="ts" setup>
  import Form from '@/components/Form/index.vue';
  import Table from '@/components/Table/index.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import Database from '@tauri-apps/plugin-sql';
  import { onMounted, reactive, ref } from 'vue';
  import type { FormProps } from '@/components/Form/types/from';
  import type { TableColumnProps } from '@/components/Table/types/table';

  const { createErrorMsg } = useMessage();

  interface Student {
    studentId: string;
    name: string;
    gender: string;
    birthDate: string;
    class: string;
    qq: string;
    position: string;
    cet4Score: string;
    residence: string;
  }

  const form = ref({
    name: '',
    residence: '',
    cet4ScoreMin: '',
    cet4ScoreMax: '',
    gender: '',
    birthDateRange: [],
    class: '',
  });

  const formOption = reactive<FormProps<typeof form.value>>({
    labelPosition: 'top',
    formItem: [
      {
        gutter: 30,
        itemList: [
          {
            component: 'ElInput',
            label: '姓名',
            prop: 'name',
            rules: [{ required: false, type: 'string' }],
          },
          {
            component: 'ElInput',
            label: '户籍',
            prop: 'residence',
            rules: [{ required: false, type: 'string' }],
          },
          {
            component: 'ElInput',
            label: '四级成绩最小值',
            prop: 'cet4ScoreMin',
            rules: [{ required: false, type: 'string' }],
          },
          {
            component: 'ElInput',
            label: '四级成绩最大值',
            prop: 'cet4ScoreMax',
            rules: [{ required: false, type: 'string' }],
          },
          {
            component: 'ElSelect',
            label: '性别',
            prop: 'gender',
            childrenComponent: {
              options: [
                { label: '男', value: '男' },
                { label: '女', value: '女' },
              ],
            },
            rules: [{ required: false, type: 'string' }],
          },
          {
            component: 'ElDatePicker',
            label: '出生日期范围',
            prop: 'birthDateRange',
            props: {
              type: 'daterange',
              rangeSeparator: '至',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期',
            },
            rules: [{ required: false, type: 'array' }],
          },
          {
            component: 'ElInput',
            label: '班级',
            prop: 'class',
            rules: [{ required: false, type: 'string' }],
          },
        ],
      },
    ],
  });

  const option: TableColumnProps<Student>[] = [
    { label: '学号', prop: 'studentId', sortable: true },
    { label: '姓名', prop: 'name', sortable: true },
    { label: '性别', prop: 'gender' },
    { label: '出生日期', prop: 'birthDate' },
    { label: '班级', prop: 'class' },
    { label: 'QQ', prop: 'qq' },
    { label: '职务', prop: 'position' },
    { label: '四级成绩', prop: 'cet4Score' },
    { label: '户籍', prop: 'residence' },
  ];

  const studentList = ref<Student[]>([]);

  const fetchStudents = async (
    query: Partial<Student> & { cet4ScoreMin?: string; cet4ScoreMax?: string; birthDateRange?: [string, string] },
  ): Promise<Student[]> => {
    try {
      const db = await Database.load('yourSql@Password');
      const conditions = [];
      const values = [];

      if (query.name) {
        conditions.push('Sname LIKE ?');
        values.push(`%${query.name}%`);
      }
      if (query.residence) {
        conditions.push('Sjg LIKE ?');
        values.push(`%${query.residence}%`);
      }
      if (query.cet4ScoreMin) {
        conditions.push('Ssc >= ?');
        values.push(query.cet4ScoreMin);
      }
      if (query.cet4ScoreMax) {
        conditions.push('Ssc <= ?');
        values.push(query.cet4ScoreMax);
      }
      if (query.gender) {
        conditions.push('Ssex = ?');
        values.push(query.gender);
      }
      if (query.birthDateRange && query.birthDateRange.length === 2) {
        conditions.push('Sbirth BETWEEN ? AND ?');
        values.push(query.birthDateRange[0], query.birthDateRange[1]);
      }
      if (query.class) {
        conditions.push('Sep LIKE ?');
        values.push(`%${query.class}%`);
      }

      const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
      const result = await db.select(`SELECT * FROM Stu ${whereClause}`, values);

      return result.map((item: any) => ({
        studentId: item.Sno,
        name: item.Sname,
        gender: item.Ssex,
        birthDate: item.Sbirth,
        class: item.Sep,
        qq: item.Sqq,
        position: item.Szw,
        cet4Score: item.Ssc,
        residence: item.Sjg,
      })) as Student[];
    } catch (error) {
      createErrorMsg(error as string);
      return [];
    }
  };

  const handlerForm = async (val: string) => {
    if (val === 'vertical') {
      formOption.formItem.map(res => {
        res.md = 24;
        res.lg = 24;
        res.xl = 24;
        return res;
      });
    } else if (val === 'horizontal') {
      formOption.formItem.map(res => {
        delete res.md;
        delete res.lg;
        delete res.xl;
        return res;
      });
    }
  };
  handlerForm('vertical');

  const submitForm = async (value: typeof form.value) => {
    studentList.value = await fetchStudents(value);
  };

  onMounted(async () => {
    studentList.value = await fetchStudents({});
  });
</script>

<template>
  <div class="page-container">
    <Form ref="formRef" :form-data="form" :form-option="formOption" @submit-form="submitForm" />
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>学生信息表</span>
        </div>
      </template>
      <Table :data="studentList" border row-key="studentId" :option="option" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
  .box-card {
    margin-bottom: 20px;
  }
</style>
