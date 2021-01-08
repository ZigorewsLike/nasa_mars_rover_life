new Vue({
    el: '#app',
    data(){
        return{
            dateStep: 0,
            curentDate: new Date(Date.now()).toISOString().substring(0,10), //+ "." + new Date().now().getMonth()+1 + "." + new Date().now().getFullYear(),
            dateDivs:{
                collection: [
                    { 
                        text: new Date(Date.now() - 86400000).toISOString().substring(0,10),
                        style:{
                            color: 'white',
                            cursor: 'pointer',
                        }
                    },
                    { 
                        text: new Date(Date.now()).toISOString().substring(0,10),
                        style:{
                            color: '#7e7cff',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }
                    },
                    { 
                        text: new Date(Date.now() + 86400000).toISOString().substring(0,10),
                        style:{
                            color: 'white',
                            cursor: 'pointer',
                        } 
                    },
                ],
            },
            roverName: 'curiosity',
        }
    },methods: {
        animCanvas(index){
            cir_shape[index].anim = true;
        },
        animCanvasOff(index){
            cir_shape[index].anim = false;
        },
        nextDate(index){
            if(index == 0){
                this.dateStep -= 1;
            }else{
                this.dateStep += 1;
            }
            for(let i=0;i<3;i++){
                this.dateDivs.collection[i].text = new Date(Date.now() + 86400000 * (this.dateStep+(i-1))).toISOString().substring(0,10);
            }
        }
    }
});