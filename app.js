new Vue({
    el: '#app',
    data(){
        return{
            dateStep: 0,
            curentDateStr: new Date(Date.now()).toISOString().substring(0,10),
            curentDate: new Date(Date.now()),
            lockDate: new Date(Date.now()),
            dateDivs:{
                collection: [
                    { 
                        text: new Date(Date.now() - 86400000).toISOString().substring(0,10),
                        style:{
                            //color: 'white',
                            cursor: 'pointer',
                        }
                    },
                    { 
                        text: new Date(Date.now()).toISOString().substring(0,10),
                        style:{
                            //color: '#7e7cff',
                            //textDecoration: 'underline',
                            //cursor: 'pointer',
                        }
                    },
                    { 
                        text: new Date(Date.now() + 86400000).toISOString().substring(0,10),
                        style:{
                            //color: 'white',
                            cursor: 'pointer',
                        } 
                    },
                ],
                change: false,
            },
            roverName: 'curiosity',
            posX: 0,
            roverImage: {
                backgroundImage: "url(source/rovers/curiosity.jpg)",
            },
        }
    },
    updated: function () {
        console.log(this.curentDateStr);
        if(new Date(this.curentDate).toISOString().substring(0,10) != this.curentDateStr){
            this.curentDate = new Date(this.curentDateStr);
            if(this.roverName == "opportunity")
                this.lockDate = new Date("2018-06-10");
            else if(this.roverName == "spirit")
                this.lockDate = new Date("2010-03-22");
            else
                this.lockDate = new Date(new Date(Date.now()).toISOString().substring(0,10));
            this.dateStep = Math.ceil((this.lockDate - this.curentDate)/86400000);
            console.log("Update");
            console.log(new Date(this.curentDate));
            if(new Date(this.curentDateStr) > this.lockDate)
                this.curentDateStr = new Date(this.lockDate).toISOString().substring(0,10);
            for(let i=0;i<3;i++){
                this.dateDivs.collection[i].text = new Date(this.lockDate - 86400000 * (this.dateStep+(2-i-1))).toISOString().substring(0,10);
            }
        }
        
    },
    watch: {
        posX: function(newValue) {
            for(let i=0; i<3; i++){
                TweenLite.to(cir_shape[i].graphics.command, 0.6, { x: newValue+(clientWidth/6* (i*2+1)), onComplete: function() { 
                    cir_shape[i].graphics.command.x = (clientWidth/6* (i*2+1)); 
                    cir_shape[0].lock = false; 
                } ,onUpdate : function () {
                    if(cir_shape[i].graphics.command.x < 0){
                        cir_shape[i].graphics.command.x += clientWidth;
                    }else if(cir_shape[i].graphics.command.x > clientWidth){
                        cir_shape[i].graphics.command.x -= clientWidth;
                    }
                }});
            }
            console.log("DWIJJ : " + this.posX);
            if(this.posX == 0){
                this.posX = clientWidth/3;
            }else if(this.posX == -1){
                this.posX = -clientWidth/3;
            }
        },
    },
    methods: {
        animCanvas(index){
            if(!cir_shape[0].lock && !(index == 2 && this.dateStep == 0)){
                cir_shape[index].anim = true; 
            }
            else
                cir_shape[index].anim = false;
            
        },
        animCanvasOff(index){
            cir_shape[index].anim = false;
        },
        nextDate(index){
            if(!cir_shape[0].lock){
                cir_shape[index].anim = false;
                if(index == 0){
                    this.dateDivs.change = true;
                    cir_shape[0].lock = true;
                    this.dateStep += 1;
                    this.dateDivs.change = true;
                    cir_shape[0].lock = true; 
                    if(this.posX != 0){
                        this.posX = 0;
                    }else{
                        this.posX += clientWidth/3;
                    }
                }else if(index == 2 && this.dateStep > 0){
                    this.dateDivs.change = true;
                    cir_shape[0].lock = true;
                    this.dateStep -= 1;
                    this.dateDivs.change = true;
                    cir_shape[0].lock = true; 
                    if(this.posX != -1){
                        this.posX = -1;
                    }else{
                        this.posX += clientWidth/3;
                    }
                }
                for(let i=0;i<3;i++){
                    this.dateDivs.collection[i].text = new Date(this.lockDate - 86400000 * (this.dateStep+(2-i-1))).toISOString().substring(0,10);
                }
                if(index == 0){
                    
                }else if(index == 2){
                    
                }
                
            } 
        },
        chooseRover(name){
            this.roverName = name;
        },
        viewRover(name){
            this.roverImage.backgroundImage = 'url(source/rovers/' + name + '.jpg)'
        }
    }
});