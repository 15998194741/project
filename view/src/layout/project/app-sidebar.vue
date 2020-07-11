<template>
  <div class="app-sidebar-container" style="width: 100%;">
    <div style="background-color:#091B2F ;height: 90%;">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
                
      </el-radio-group>-->

      <router-link to="/index">
        <div
          :class="{'app-sidebar-container-logo': true, 'header-flash': isCollapse}"
          style="width: 100%;"
        ></div>
      </router-link>
      <div class="arrow-right-container" @click="shrink">
        <i :class="{'el-icon-d-arrow-right': true, gotoLeft: isCollapse}"></i>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#091B2F"
        text-color="#34C3BB"
        active-text-color="white"
        unique-opened
        router
        @open="handleOpen"
        @close="handleClose"
      >
        <template v-for="(route, index) in routes">
          <el-submenu
            v-if="route.children && route.children.length"
            :key="index"
            :index="`${index}`"
          >
            <template #title>
              <i class="el-icon-location" />
              <span>{{route.name}}</span>
            </template>
            <el-menu-item
              v-for="({name, url}, _index) in route.children"
              :key="_index"
              :index="`${index}-${_index}`"
              :route="url"
            >{{name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key="index" :index="`${index}`" :route="route.url">
            <i class="el-icon-location"></i>
            <span slot="title">{{route.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>


<script>
// 路由规则集合
const routeRules = {
  // 区服管理
  '/zoneManagement/zoneSettings': {
    path: '/zoneManagement/zoneSettings',
    meta: { title: '区服设置' },
    
    component: () => import('@/views/zoneManagement/zoneSettings')
  },
  // 角色管理
  '/roleManagement/roleQuery': {
    path: '/roleManagement/roleQuery',
    meta: { title: '角色查询' },
    component: () => import('@/views/roleManagement/roleQuery')
  },
  '/roleManagement/chatQuery': {
    path: '/roleManagement/chatQuery',
    meta: { title: '聊天查询' },
    component: () => import('@/views/roleManagement/chatQuery')
  },
  '/roleManagement/rucksackQuery': {
    path: '/roleManagement/rucksackQuery',
    meta: { title: '背包查询' },
    component: () => import('@/views/roleManagement/rucksackQuery')
  },
  '/roleManagement/prosumingQuery': {
    path: '/roleManagement/prosumingQuery',
    meta: { title: '产消查询' },
    component: () => import('@/views/roleManagement/prosumingQuery')
  },
  // 充值管理
  '/rechargeManagement/rechargeDetails': {
    path: '/rechargeManagement/rechargeDetails',
    meta: { title: '充值明细' },
    component: () => import('@/views/rechargeManagement/rechargeDetails')
  },
  // 公告管理
  '/announcedManagement/index': {
    path: '/announcedManagement/index',
    meta: { title: '公告管理' },
    component: () => import('@/views/announcedManagement/index')
  },
  // 邮件管理
  '/mailManagement/index': {
    path: '/mailManagement/index',
    meta: { title: '邮件管理' },
    component: () => import('@/views/mailManagement/index')
  },
  // 活动管理
  '/activityManagement/index': {
    path: '/activityManagement/index',
    meta: { title: '活动管理' },
    component: () => import('@/views/activityManagement/index')
  },
  // CDK管理
  '/CDKManagement/index': {
    path: '/CDKManagement/index',
    meta: { title: 'CDK管理' },
    component: () => import('@/views/CDKManagement/index')
  },
  // 白名单管理
  '/whiteListManagement/index': {
    path: '/whiteListManagement/index',
    meta: { title: '白名单管理' },
    component: () => import('@/views/whiteListManagement/index')
  },
  '/whiteListManagement/whiteListMail': {
    path: '/whiteListManagement/whiteListMail',
    meta: { title: '白名单邮件' },
    component: () => import('@/views/whiteListManagement/whiteListMail')
  },
  // GM管理
  '/GMManagement': {
    path: '/GMManagement',
    component: () => import('@/views/GMManagement'),
    meta: { title: 'GM管理' }
  }
};

export default {
  name: 'AppSidebar',

  data() {
    return {
      isCollapse: false
      //   styleobj: {
      //     left: '180px'
      //   }
    };
  },
  computed: {
    a: function() {
      return 'superbad';
    },
    routes() {
      return this.$store.state.user.permissionInfo.routes;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    oneclick() {
      this.$router.push('/district/districtManagement');
    },
    shrink() {
      // 更新信号量
      this.isCollapse = !this.isCollapse;
      //   if (this.styleobj.left === '180px') {
      //     this.styleobj.left = 0;
      //   } else {
      //     this.styleobj.left = '180px';
      //   }

      // 触发自定义事件
      this.$emit('shrink', this.isCollapse);
    },
    logclink() {
      // console.log(1111);
    }
  },
  watch: {
    routes: {
      handler(routes) {
        // 声明变量存储集合
        let _routes = [];
        // 进行遍历
        for (let route of routes) {
          // 判断是否具有二级菜单
          if (route.children && route.children.length) {
            // 遍历二级菜单
            for (let { url, meta } of route.children) {
              // 获取 route
              let _route = routeRules[url];
              // 为空直接退出
              if (!_route) { continue; }
              // console.log(meta);
              // 添加至集合
              _routes.push({ ..._route, meta: { grade: meta }});
            }
          } else {
            // 获取 route
            let _route = routeRules[route.url];
            // 为空直接退出
            if (!_route) { continue; }
            // console.log(route.meta);
            // 添加至集合
            _routes.push({ ..._route, meta: { grade: route.meta }});
          }
        }
        // 动态添加路由
        this.$router.addRoutes([
          {
            path: '/',
            component: () => import('@/layout'),
            redirect: '/index',
            children: _routes
          }
        ]);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.app-sidebar-container-logo {
  height: 100px;
  margin-bottom: 10px;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  /* border: 1px solid #0000ff; */
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgb(42, 191, 189);
}

.app-sidebar-container-logo:before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: url(../../styles/images/gsm.png) no-repeat 50% 41%;
  z-index: 10;
  background-size: 80%;
}
.app-sidebar-container-logo.header-flash:before {
  animation: header-flash-before-animation 1s forwards;
}

@keyframes header-flash-before-animation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.app-sidebar-container-logo:after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 11;
  background: url(../../styles/images/yxj.png) no-repeat 90% 25%;
  background-size: 30%;
}
.app-sidebar-container-logo.header-flash:after {
  animation: header-flash-after-animation 1s;
  animation-fill-mode: forwards;
}

@keyframes header-flash-after-animation {
  0% {
    background-size: 30%;
  }
  10% {
    background-size: 70%;
  }
  50% {
    transform: rotate(-90deg);
    background-size: 100%;
  }
  100% {
    background-size: 100%;
    transform: rotate(-90deg);
    background-position: 25%;
    background-color: rgb(42, 191, 189);
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}

*,
*:before,
*:after {
  box-sizing: initial;
}
.el-menu-vertical-demo {
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}
.el-icon-d-arrow-right {
  transition: all 1s;
  color: white;
  transform: translateX(180px) rotate(180deg);
  font-size: 20px;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  /* animation: myfirst .5s; */
  /* animation-fill-mode: backwards; */
}
/* @keyframes myfirst { */
/* 0%   {left: 180px;} */
/* 100% {left: 0px;} */
/* } */
/* @keyframes mydemo {
    0%   {left: 0;}
    100% {left: 180px;}
} */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.el-icon-d-arrow-right {
  /* transition: left 0.5s cubic-bezier(0.075, 1.1, 0.165, 1); */
}
/* .el-icon-d-arrow-right:active{
    left: 0;
} */

#superbad {
  transition: left 0.5s cubic-bezier(0.075, 1.1, 0.165, 1);
}
/* #superbad:active{
    left: 0;
} */
#supergood {
  transition: left 0.5s cubic-bezier(0.075, 1.1, 0.165, 1);
}

/* #supergood:active{
    left: 180;
} */

.gotoLeft {
  transform: translateX(0);
}
.arrow-right-container {
  cursor: pointer;
  &:hover {
    background: rgba(7, 22, 38, 1);
  }
}
</style>

