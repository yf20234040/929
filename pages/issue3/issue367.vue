<template>
  <scroll-view class="gantt-container" scroll-x="true" scroll-y="true">
    <view class="gantt-content" :style="{ transform: `scale(${zoomScale})`, transformOrigin: 'top left' }">
      <!-- 项目基本信息 -->
      <view class="project-info">
        <view class="info-item">
          <text class="label">项目主管</text>
          <text class="value">{{ projectManager }}</text>
        </view>
        <view class="info-item">
          <text class="label">项目开始日期</text>
          <text class="value">{{ projectStartDate }}</text>
        </view>
        <view class="info-item">
          <text class="label">显示周数</text>
          <text class="value">{{ displayWeeks }}</text>
        </view>
      </view>
      <!-- 日期表头 -->
      <view class="date-header">
        <view class="week-header-row">
          <view class="empty-cell"></view>
          <view v-for="(week, index) in weeks" :key="index" class="week-header-cell">
            {{ week.name }}
          </view>
        </view>
        <view class="day-header-row">
          <view class="empty-cell"></view>
          <view v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <view class="week-day-container">
              <view v-for="(day, dayIndex) in week.days" :key="dayIndex" class="day-header-cell">
                {{ day.date }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 项目日程表 -->
      <view class="project-schedule">
        <!-- 日程表标题行 -->
        <view class="schedule-header-row">
          <view class="header-cell">任务</view>
          <view class="header-cell">内容</view>
          <view class="header-cell">进度</view>
          <view class="header-cell">开始日期</view>
          <view class="header-cell">结束日期</view>
          <view class="header-cell">证明材料</view>
          <view class="header-cell">志愿者时长</view>
          <view class="header-cell">天数</view>
          <view v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <view class="week-day-container">
              <view v-for="(day, dayIndex) in week.days" :key="dayIndex" class="header-cell">
              </view>
            </view>
          </view>
        </view>
        <!-- 阶段和任务行 -->
        <view v-for="(stage, stageIndex) in stages" :key="stageIndex">
          <!-- 阶段行 -->
          <view class="stage-row">
            <view class="stage-cell">{{ stage.title }}</view>
            <view class="stage-cell">{{ stage.description }}</view>
            <view class="stage-cell">{{ stage.progress }}</view>
            <view class="stage-cell">{{ stage.startDate }}</view>
            <view class="stage-cell">{{ stage.endDate }}</view>
            <view class="stage-cell"></view>
            <view class="stage-cell"></view>
            <view class="stage-cell"></view>
            <view v-for="(week, weekIndex) in weeks" :key="weekIndex">
              <view class="week-day-container">
                <view v-for="(day, dayIndex) in week.days" :key="dayIndex" class="stage-cell">
                  
                  <view v-if="isInStageTimeRange(stage, day.date)" class="stage-time-block"></view>
                </view>
              </view>
            </view>
          </view>
          <!-- 任务行 -->
          <view v-for="(task, taskIndex) in stage.tasks" :key="taskIndex" class="task-row">
            <view class="task-cell">{{ task.name }}</view>
            <view class="task-cell">{{ task.content }}</view>
            <view class="task-cell">{{ task.progress }}</view>
            <view class="task-cell">{{ task.startDate }}</view>
            <view class="task-cell">{{ task.endDate }}</view>
            <view class="task-cell">{{ task.proofMaterial }}</view>
            <view class="task-cell">{{ task.volunteerHours }}</view>
            <view class="task-cell">{{ task.days }}</view>
            <view v-for="(week, weekIndex) in weeks" :key="weekIndex">
              <view class="week-day-container">
                <view v-for="(day, dayIndex) in week.days" :key="dayIndex" class="task-cell" v-bind:style="{ minWidth: cellMinWidth }">
                  
                  <view v-if="isInTaskTimeRange(task, day.date)" class="task-time-block"></view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      projectManager: '示例主管',
      projectStartDate: '2025-04-01',
      displayWeeks: 1,
      weeks: [],
      stages: [
        {
          title: '阶段 1 标题',
          description: '前期准备',
          progress: '',
          startDate: '',
          endDate: '',
          tasks: [
            { name: '任务 1', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 2', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 3', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 4', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 5', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 }
          ]
        },
        {
          title: '阶段 2 标题',
          description: '项目执行落地',
          progress: '',
          startDate: '',
          endDate: '',
          tasks: [
            { name: '任务 1', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 2', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 3', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 4', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 5', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 }
          ]
        },
        {
          title: '阶段 3 标题',
          description: '成果展示',
          progress: '',
          startDate: '',
          endDate: '',
          tasks: [
            { name: '任务 1', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 2', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 3', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 4', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 5', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 6', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 7', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 8', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 },
            { name: '任务 9', content: '', progress: '', startDate: '', endDate: '', proofMaterial: '', volunteerHours: 0, days: 0 }
          ]
        },
        {
          title: '阶段 4 标题',
          description: '汇报课',
          progress: '',
          startDate: '',
          endDate: '',
          tasks: []
        },
        {
          title: '阶段 5 标题',
          description: '教研交流',
          progress: '',
          startDate: '',
          endDate: '',
          tasks: []
        }
      ],
      zoomScale: 1,
      startDistance: 0,
      initialScale: 1,
      cellMinWidth: '50px' // 每个日期单元格的最小宽度
    };
  },
  onLoad() {
    this.initWeeks();
  },
  methods: {
    initWeeks() {
      const weeks = [];
      for (let i = 0; i < 8; i++) {
        const week = {
          name: `第${i + 1}周`,
          days: []
        };
        for (let j = 0; j < 7; j++) {
          const date = new Date();
          date.setDate(date.getDate() + i * 7 + j);
          week.days.push({
            date: this.formatDate(date)
          });
        }
        weeks.push(week);
      }
      this.weeks = weeks;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    isInStageTimeRange(stage, date) {
      return date >= stage.startDate && date <= stage.endDate;
    },
    isInTaskTimeRange(task, date) {
      return date >= task.startDate && date <= task.endDate;
    },
    touchstart(event) {
      if (event.touches.length === 2) {
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        this.startDistance = Math.sqrt(dx * dx + dy * dy);
        this.initialScale = this.zoomScale;
      }
    },
    touchmove(event) {
      if (event.touches.length === 2) {
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        const scaleFactor = currentDistance / this.startDistance;
        this.zoomScale = this.initialScale * scaleFactor;
      }
    }
  },
  onTouchStart: function (event) {
    this.touchstart(event);
  },
  onTouchMove: function (event) {
    this.touchmove(event);
  }
};
</script>

<style scoped>
.gantt-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
}

.gantt-content {
  display: inline-block;
  min-width: 100%;
  min-height: 100%;
  padding: 10px;
}

.project-info {
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  margin-bottom: 8px;
}

.label {
  flex: 2;
  font-weight: bold;
}

.value {
  flex: 1;
}

.date-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.week-header-row,
.day-header-row {
  display: flex;
}

.empty-cell {
  width: 120px; 
}

.week-header-cell {
  flex: 1;
  text-align: center;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: #e0e0e0;
}

.week-day-container {
  display: flex;
}

.day-header-cell {
  width: calc(100% / 7);
  text-align: center;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: #f0f0f0;
}

.project-schedule {
  border-collapse: collapse;
}

.schedule-header-row,
.stage-row,
.task-row {
  display: flex;
}

.header-cell,
.stage-cell,
.task-cell {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}

.header-cell {
  font-weight: bold;
  background-color: #e0e0e0;
}

.stage-cell {
  background-color: #f0f0f0;
}

.task-cell {
  background-color: #fff;
}

.stage-time-block {
  background-color: rgba(0, 128, 0, 0.3); /* 阶段时间块颜色 */
  height: 100%;
}

.task-time-block {
  background-color: rgba(0, 0, 255, 0.3); /* 任务时间块颜色 */
  height: 100%;
}
</style>