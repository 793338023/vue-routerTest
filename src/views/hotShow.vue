<template>
  <div class="hotShow">
    <el-row :gutter='20' v-for='(items, index) in listData' :key='index'>
        <el-col :span='4' v-for='(item, ix) in items' :key='ix'>
            <el-card>
                <img :src='item.images.large' alt="item.id" @click='detailFn(item.id)'>
                <div>
                    <span>{{item.title}}</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ item.year }}</time>
                    <el-rate
                        v-model="item.rating.stars"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'hotShow',
  data () {
    return {
        moviesData: {},
        listData: [],
        fullscreenLoading: false
    }
  },
  created(){
    this.$ajax({
        method: 'get',
        url: '/api/v2/movie/in_theaters?city=广州&start=0&count=20'
    }).then((rps)=>{
        if(rps.status === 200){
            let data = rps.data;
            let listData = [], tempList = [];
            data.subjects.forEach((it, index) => {
                it.rating.stars = it.rating.stars / 10;
                tempList.push(it);
                if((index+1) % 6 == 0){
                    listData.push(tempList);
                    tempList = [];
                }
            });
            if(tempList.length>0){
                listData.push(tempList);
            }
            this.moviesData = data;
            this.listData = listData;
        }else{
            this.$message.error('状态码为非200');
        }
    });
  },
  mounted(){
    
  },
  methods: {
    detailFn(id){
        this.$router.push({ path: 'product/'+id, query: { id: id }});
        
    }
  }
}
</script>

<style scoped>
.time {
    font-size: 13px;
    color: #999;
  }
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
  
.clearfix:after {
    clear: both
}  
img{
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.el-row{
    margin-top: 20px; 
}
</style>
