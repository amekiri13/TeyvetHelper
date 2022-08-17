$().ready(()=> {
    const index = {
        data() {
            return {
                'uid': '802981415'
            }
        },
        methods:{
            judgeServer(event) {
                console.log(this.uid);
                if (this.uid.charAt(0) === '1' || this.uid.charAt(0) === '2') {
                    $("#server").text("天空岛");
                }
                else if (this.uid.charAt(0) === '5') {
                    $("#server").text("世界树");
                }
                else if (this.uid.charAt(0) === '6') {
                    $("#server").text("America Server");
                }
                else if (this.uid.charAt(0) === '7') {
                    $("#server").text("Europe Server");
                }
                else if (this.uid.charAt(0) === '8') {
                    $("#server").text("Asia Server");
                }
                else if (this.uid.charAt(0) === '9') {
                    $("#server").text("HK, MC & TW Server");
                }
            }
        }
    }

    Vue.createApp(index).mount('#index');
})
