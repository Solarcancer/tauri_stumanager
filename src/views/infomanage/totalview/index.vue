<script lang="tsx" setup>
  import Table from '@/components/Table/index.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import Database from '@tauri-apps/plugin-sql';
  import { h, onMounted, ref } from 'vue';
  import type { TableColumnProps } from '@/components/Table/types/table';

  const { createErrorModal, createErrorMsg } = useMessage();

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

  const fetchStudents = async (): Promise<Student[]> => {
    try {
      const db = await Database.load('yourSql&password');
      const result = await db.select('SELECT * FROM Stu');
      console.log('Fetched students:', result); // 添加日志
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

  const studentList = ref<Student[]>([]);

  onMounted(async () => {
    studentList.value = await fetchStudents();
    console.log('Student list:', studentList.value); // 添加日志
  });
</script>

<template>
  <div>
    <el-col>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>学生信息表</span>
          </div>
        </template>
        <Table :data="studentList" border row-key="studentId" :option="option" />
      </el-card>
    </el-col>
  </div>
</template>

<!-- <style lang="scss" scoped>
  .box-card {
    margin-bottom: 20px;

    .margin-top :deep(.el-descriptions__body) {
      margin: 20px;
      background-color: #{--main-bg-color} !important;
    }
  }
</style> -->
<style lang="scss" scoped>
  .box-card {
    margin-bottom: 20px;
  }

  .nesting {
    padding: 0 20px;
  }
</style>
