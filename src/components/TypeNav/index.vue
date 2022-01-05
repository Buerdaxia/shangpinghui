<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派，子元素h3移入，冒泡到父元素div上
           父元素div来设置移出效果
       -->
      <div @mouseleave="leaveShow"
        @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过度动画 要加上transition标签 -->
        <transition name="sort">
          <div class="sort"
            v-show="show">
            <!-- 利用事件委派+编程式导航 -->
            <div class="all-sort-list2"
              @click="goSearch">
              <!-- 一级分类 -->
              <div class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{cur: currentIndex == index}">
                <!-- 上面，动态添加类名 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>

                <!-- 二，三级分类 -->
                <!-- 通过动态添加样式控制二三级分类显示 -->
                <div class="item-list clearfix"
                  :style="{display: currentIndex == index ? 'block' : 'none'}">
                  <div class="subitem"
                    v-for="(c2) in c1.categoryChild"
                    :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild"
                          :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 这个是按需引入
import { throttle } from 'lodash';
// 全局引入 将数组的全部功能全部引入
// import _ from 'loadsh';
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 记录输入移入索引
      currentIndex: -1,

      // 全部商品分类的显示与隐藏
      show: true
    }
  },
  methods: {
    // 鼠标移入事件
    // changeIndex(index) {
    //   // 获取到鼠标移入哪一个元素
    //   this.currentIndex = index;
    // },
    // 通过lodash中的节流函数对
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 点击三级联动进行跳转
    goSearch(event) {
      /* 利用时间的委派存在的问题
        1.怎样判断点击的一定是a标签？
        2.怎样获取相应的数据？
      */
      // 首先这个event.target可以获得当前点击事件的节点
      let element = event.target;
      // 通过结构赋值方式，得到这个几个属性值
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      // 节点中有一个属性叫dataset，可以获取节点的自定义属性与属性值
      // console.log(element.dataset);
      // 然后判断是否拥有:data-categoryName="c1.categoryName"属性
      if (categoryname) {
        // 整理路由跳转的参数
        // 要跳转的路由
        let location = { name: 'search' };
        // 要携带的参数
        let query = { categoryName: categoryname };

        // 如果有category1id属性则为1级分类
        if (category1id) {
          // 动态添加属性1级分类id
          query.category1Id = category1id;
          // 如果有category2id则为2级分类
        } else if (category2id) {
          // 动态添加属性2级分类id
          query.category2Id = category2id;
        } else {
          // 否则为3级分类
          // 动态添加属性3级分类id
          query.category3Id = category3id;
        }

        /*
          将数据进行合并
          跳转需要对象格式{name: 'xxx', query: {xxx: xxx...}}
        */
        //  判断跳转时是否拥有params参数，如果有也添加到location上
        if (this.$route.params) {
          // 修改location对象，在里面添加一个query属性，就变成上面需要的格式了
          location.query = query;
          // 进行路由跳转，location为传递参数
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入的时候，让商品分类进行展示
    enterShow() {
      this.show = true;
    },
    // 当鼠标移出时,将展示关闭
    leaveShow() {
      this.currentIndex = -1;
      // 判断一下页面位置，home页面不需要移除显示
      if (this.$route.path != '/home') {
        this.show = false;
      }
    },
  },
  // 当组件挂载完毕就可以向服务器发送请求
  mounted() {

    // 当组件挂在完毕将show改为false
    // 如果不是Home路由组件，将TypeNav进行隐藏
    if (this.$route.path != '/home') {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              display: block;
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画样式
    // 过度动画进入的样式(开始)
    .sort-enter {
      height: 0;
      opacity: 0;
    }
    // 过度动画进入状态(结束)
    .sort-enter-to {
      height: 461px;
      opacity: 1;
    }
    .sort-enter-active {
      transition: all 0.5s;
    }
    // 过渡动画离开状态(开始)
    .sort-leave {
      height: 461px;
      opacity: 1;
    }
    // 过渡动画离开状态(结束)
    .sort-leave-to {
      height: 0;
      opacity: 0;
    }
    // 过度动画离开进行中
    .sort-leave-active {
      transition: all 0.5s;
    }
  }
}
</style>