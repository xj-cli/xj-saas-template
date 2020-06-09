import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('user');

export default {
  name: 'my-menu',

  data() {
    return {
      list: [],
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    getMenuList(authList) {
      // pid: -1
      // _id: "5edcc4d71f9b5a73e1f77293"
      // name: "我的文章"
      // auth: "myArticle"
      // id: 9
      // role: "5ec73bc0c514dc322467cd63"
      // path: "/manager/myArticle"
      let menu = [];
      let map = {}; // { 1: 用户权限，2：文章管理 }
      authList.sort((a,b) => a.id - b.id);
      authList.forEach(m => {
        m.children = [];
        map[m.id] = m;
        if (m.pid == -1) {
          menu.push(m);
        } else {
          map[m.pid] && map[m.pid].children.push(m);
        }
      });
      return menu;
    }
  },

  mounted() {
    this.list = this.getMenuList(this.userInfo.authList);
  },

  render() {
    let renderChildren = list => {
      return list.map(child => {
        return child.children.length ?
          <el-submenu index={ child._id }>
            <div slot='title'>{ child.name }</div>
            {/* 递归 */}
            { renderChildren(child.children) }
          </el-submenu> :
          <el-menu-item index={ child.path }>
            <router-link to={child.path} style={ { color: '#fff' } }>{ child.name }</router-link>
          </el-menu-item>
      })
    }
    return <el-menu
        background-color='#333'
        text-color='#fff'
        active-text-color='#ffd04b'
        class='menu'
    >
      { renderChildren(this.list) }
    </el-menu>
  },
}