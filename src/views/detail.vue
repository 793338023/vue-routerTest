<template>
  <div class="detail">
    <el-row class="wrapperTitle">
      <el-col :span="20" :offset="4">
        <div class="title">
          <span class="t1">{{item.title}}</span>
          <span class="t2">({{item.year}})</span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-row type="flex" :gutter="15" class="content">
          <el-col :span="8">
            <img :src="item.images.medium" alt>
          </el-col>
          <el-col :span="16">
            <div class="tLeft">
              <span>导演</span>
              <span v-for="(dir, index) in item.directors" :key="index">
                <a :href="dir.alt" target="_blank">{{dir.name}}</a>
                {{(index === item.directors.length-1)?'':'/'}}
              </span>
            </div>
            <div class="tLeft">
              <span>主演</span>
              <span v-for="(cast, index) in item.casts" :key="index">
                <a :href="cast.alt" target="_blank">{{cast.name}}</a>
                {{(index === item.casts.length-1)?'':'/'}}
              </span>
            </div>
            <div class="tLeft">
              <span>类型</span>
              <span>{{ArrJoin(item.genres)}}</span>
            </div>
            <div class="tLeft">
              <span>制片国家/地区</span>
              <span>{{ArrJoin(item.countries)}}</span>
            </div>
            <div class="tLeft">
              <span>语言</span>
              <span>{{ArrJoin(item.countries)}}</span>
            </div>
            <div class="tLeft">
              <span>又名</span>
              <span>{{ArrJoin(item.aka)}}</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="ratingContent">
        <el-row type="flex">
          <el-col :span="24" class="ratingTitleWrapper">
            <span class="ratingTitle">豆瓣评分</span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8" class="ratingSocre">{{toFixed(item.rating.average)}}</el-col>
          <el-col :span="16">
            <el-rate :value="item.rating.stars / 10" disabled></el-rate>
            <p class="ratingCount">{{item.ratings_count}}个人评价</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="jianjie">
      <el-row>
        <el-col :span="16" :offset="4" class="jjTitle">{{item.title}}的剧情简介 · · · · · ·</el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4" class="jjContent">
          <p>{{item.summary}}</p>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "detail",
  data() {
    return {
      item: {
        images: {},
        rating: {}
      }
    };
  },
  mounted() {},
  methods: {
    ArrJoin(val) {
      if (!val) {
        return null;
      }
      return [...val].join("/");
    },
    toFixed(val) {
      if (typeof val !== "number") {
        return "0.0";
      } else {
        return val.toFixed(1);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    axios({
      url: "/api/v2/movie/subject/" + to.params.id,
      method: "get"
    }).then(rps => {
      let data = rps.data;
      next(vm => {
        vm.item = data;
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
  }
};
</script>

<style scoped>
.detail {
  margin: 0;
}
.wrapperTitle {
  padding: 0 0 15px 0;
}
.title {
  font-size: 20px;
  font-weight: bolder;
  text-align: left;
}
.title .t2 {
  color: #666;
}
.content {
  font-size: 14px;
}
img {
  width: 100%;
}
.tLeft {
  text-align: left;
  margin-bottom: 5px;
}
.ratingTitleWrapper {
  text-align: left;
  text-indent: 20px;
  color: #aaa;
  font-size: 12px;
  margin-bottom: 10px;
}
.ratingContent {
  border-left: 1px solid rgb(224, 223, 223);
}
.jianjie {
  text-align: left;
  margin-top: 20px;
}
.ratingSocre {
  align-self: center;
  font-size: 30px;
}
.el-rate__icon {
  font-size: 16px;
}
.ratingCount {
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #aaa;
}
.jjTitle {
  color: #0ea830;
}
.jjContent {
  font-size: 14px;
}
</style>
