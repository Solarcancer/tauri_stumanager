<script lang="ts" setup>
  import Form from '@/components/Form/index.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  //import { invoke } from '@tauri-apps/api/core';
  import Database from '@tauri-apps/plugin-sql';
  //import { ElDatePicker, ElInput, ElSelect } from 'element-plus';
  //import { tr } from 'element-plus/es/locale/index.mjs';
  import { reactive, ref } from 'vue';
  import type { FormProps } from '@/components/Form/types/from';
  defineOptions({
    name: 'StudentForm',
  });

  const { createErrorModal, createErrorMsg } = useMessage();

  interface StudentFormDataType {
    name: string;
    studentId: string;
    gender: string;
    birthDate?: string;
    class: string;
    qq: string;
    position: string;
    cet4Score: string;
    residence: string;
  }

  const form = ref<StudentFormDataType>({
    name: '',
    studentId: '',
    gender: '',
    birthDate: new Date().toISOString().split('T')[0],
    class: '',
    qq: '',
    position: '',
    cet4Score: '',
    residence: '',
  });

  const formOption = reactive<FormProps<StudentFormDataType>>({
    labelPosition: 'right',
    formItem: [
      {
        gutter: 30,
        itemList: [
          {
            component: 'ElInput',
            label: '学生姓名',
            prop: 'name',
            rules: [{ required: true, type: 'string' }],
          },
          {
            component: 'ElInput',
            label: '学生学号',
            prop: 'studentId',
            rules: [{ required: true, type: 'string' }],
          },
          {
            component: 'ElSelect',
            label: '学生性别',
            prop: 'gender',
            childrenComponent: {
              options: [
                { label: '男', value: '男' },
                { label: '女', value: '女' },
              ],
            },
          },
          {
            component: 'ElDatePicker',
            label: '学生出生日期',
            prop: 'birthDate',
            props: {
              type: 'date',
              placeholder: '选择日期',
            },
          },
        ],
      },
      {
        gutter: 30,
        itemList: [
          {
            component: 'ElInput',
            label: '学生班级',
            prop: 'class',
            rules: [{ required: true, type: 'string' }],
          },
          {
            component: 'ElInput',
            label: '学生QQ号码',
            prop: 'qq',
            rules: [{ required: true, type: 'string' }],
          },
          {
            component: 'ElInput',
            label: '学生职务',
            prop: 'position',
            rules: [{ required: false, type: 'string' }],
          },
          {
            component: 'ElInput',
            label: '四级考试成绩',
            prop: 'cet4Score',
            rules: [{ required: true, type: 'string' }],
            props: {
              type: 'number',
              'v-model': form.value.cet4Score,
            },
          },
          {
            component: 'ElInput',
            label: '学生户籍',
            prop: 'residence',
            rules: [{ required: true, type: 'string' }],
          },
        ],
      },
    ],
  });

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const submitForm = async (value: object) => {
    form.value = { ...value, ...form.value };
    //console.log(form.value);

    try {
      const db = await Database.load('mysql://root:swjtu2048@47.113.231.58:56888/DBCOURSE');
      await db.execute('INSERT INTO Stu Values(?,?,?,?,?,?,?,?,?)', [
        form.value.studentId,
        form.value.name,
        form.value.gender,
        formatDate(form.value.birthDate),
        form.value.class,
        form.value.qq,
        form.value.position,
        form.value.cet4Score,
        form.value.residence,
      ]);
      createErrorModal('添加成功');
    } catch (error) {
      createErrorMsg(error as string);
    }
  };
  /* const submitForm = async (value: object) => {
    form.value = { ...value, ...form.value };
    console.log(form.value);
    try {
      await invoke('plugin:sql|execute', {
        db: 'mysql://root:swjtu2048@47.113.231.58:56888/DBCOURSE',
        query:
          'INSERT INTO Stu VALUES(name, student_id, gender, birth_date, class, qq, position, cet4_score, residence) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        values: [
          form.value.name,
          form.value.studentId,
          form.value.gender,
          form.value.birthDate,
          form.value.class,
          form.value.qq,
          form.value.position,
          parseInt(form.value.cet4Score),
          form.value.residence,
        ],
      });
      createErrorModal('添加学生信息成功');
    } catch (error) {
      createErrorMsg(error as string);
    }
  }; */
</script>

<template>
  <div class="page-container">
    <Form ref="formRef" :form-data="form" :form-option="formOption" @submit-form="submitForm" />
  </div>
</template>

<style lang="scss" scoped>
  .config {
    margin-bottom: 20px;
  }
</style>
