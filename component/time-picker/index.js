Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pickerdata:{
      type:Object,
      value:{
      multiIndex:[0,0,0,0,0],
      multiArray:
        [[2018,2019],[1,2,3,4,5,6,7,8,9,10,11,12],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],[0,10,20,30,40,50]]//年，月，日，时，分
      }
    },
    datestart:{
      type:Array,
      value:[2018,0,0,0,0]//年，月，日，时，分
    },
    daystart: {
      type:Number,
      value:0
      },
    hourstart: {
      type: Number,
      value: 0
    },
    minutestart: {
      type: Number,
      value: 0
    },
    monthstart: {
      type: Number,
      value: 0
    },
    year: {
      type: Number,
      value: 2018
    },
    now:{
      type:String,
      value:'2018/2/3 11:11'
    }//需要处理0
  },
  //需要传入当前的时间
  /**
   * 组件的初始数据
   */
  data: {
    completeData: [[2018], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,      23, 24, 25, 26, 27, 28, 29, 30, 31],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],[0,10,20,30,40,50]], 
  
  },
  //组件初始化完成后,这样不可以，会报错
  ready:function(){
    console.log('daystart:' + this.data.datestart);
   // console.log('picker传:' + this.data.pickerdata.multiArray);
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
   bindMultiPickerChange:function(e){
     this.setData({
       multiIndex: e.detail.value
     })
     this.triggerEvent('confirmDate', { newDate: this.data.pickerdata.multiArray[0][this.data.pickerdata.multiIndex[0]] + '-' + this.data.pickerdata.multiArray[1][this.data.pickerdata.multiIndex[1]] + '-' + this.data.pickerdata.multiArray[2][this.data.pickerdata.multiIndex[2]] + ' ' + this.data.pickerdata.multiArray[3][this.data.pickerdata.multiIndex[3]] + ':' + this.data.pickerdata.multiArray[4][this.data.pickerdata.multiIndex[4]],target:e.detail.target});
   },
   //返回结尾的天数
   _getDayEnd:function(month){
     let largeM = [1,3,5,7,8,10,12];//31天
     if( month == 2){
       if(this.data.year%4 == 0){
         return 29;//闰年
       }
       return 28;
     }
     else if(largeM.indexOf(month)!= -1){
       return 31;
     }
     else{
      return 30;
     } 

   },
   bindMultiPickerColumnChange:function(e){
     console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
     let data = {
       multiArray: this.data.pickerdata.multiArray,
       multiIndex: this.data.pickerdata.multiIndex
     };
     //console.log('daystart:' + this.data.datestart);
     data.multiIndex[e.detail.column] = e.detail.value;
    
     switch (e.detail.column) {
       case 0://年值改变
         break;
       case 1://月值改变
        switch (data.multiIndex[1]){//月的值选择第一个月的下标[1,2]
          case 0:
            let dayend = this._getDayEnd(this.data.datestart[1]);
            data.multiArray[2] = this.data.completeData[2].slice(this.data.datestart[2]-1,dayend);//天
            console.log('daystart:' + data.multiArray[2]);
            break;
          case 1:
            let daystart = this.data.datestart[2];
            data.multiArray[2] = this.data.completeData[2].slice(0, daystart);//天
            break;
        }

        console.log('data的muitiarr:' + data.multiArray[2]);
        data.multiIndex[2] = 0;
        data.multiIndex[3] = 0;
        data.multiIndex[4] = 0;
       case 2://日值改变
         if (data.multiIndex[2] == 0 && data.multiIndex[1] == 0){//当天
           data.multiArray[3] = this.data.completeData[3].slice(this.data.datestart[3]);//小时数
           let begin_minute = Math.ceil(this.data.datestart[4] / 10)
           if(begin_minute == 6){
             data.multiArray[4] = this.data.completeData[4];
           }
           else
            data.multiArray[4] = this.data.completeData[4].slice(Math.ceil(this.data.datestart[4] / 10));
        }
        else{
           data.multiArray[3] = this.data.completeData[3]; 
           data.multiArray[4] = this.data.completeData[4];
        }
        
        console.log('小时:' + data.multiArray[3]);
        data.multiIndex[3] = 0;
        data.multiIndex[4] = 0;
        break;
       case 3://小时值改变
         let starth = this.data.datestart[3];
         console.log('3:'+ data.multiIndex[3] +'\\'+  this.data.completeData[3].indexOf(starth))
         if (data.multiIndex[2] == 0 && data.multiIndex[1] == 0 && data.multiIndex[3] == 0){//当天当时
           let beginminute = Math.ceil(this.data.datestart[4]/10)
           console.log(beginminute)
           if (beginminute == 6) {
             data.multiArray[4] = this.data.completeData[4];
           }
           else
            data.multiArray[4] = this.data.completeData[4].slice(beginminute);
         }
         else{
           data.multiArray[4] = this.data.completeData[4];
         }
         data.multiIndex[4] = 0;
         break;
     };
     this.setData({
       pickerdata: data
     });
   }
  }
 
})