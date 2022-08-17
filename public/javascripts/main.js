$().ready(()=> {
    const index = {
        data() {
            return {
                'servername': 'Asia Server',
                'uid': '802981415'
            }
        },
        methods:{
            judgeServer(event) {
                console.log(this.uid);
                if (this.uid.charAt(0) === '1' || this.uid.charAt(0) === '2') {
                    this.servername = "天空岛";
                }
                else if (this.uid.charAt(0) === '5') {
                    this.servername = "世界树";
                }
                else if (this.uid.charAt(0) === '6') {
                    this.servername = "America Server";
                }
                else if (this.uid.charAt(0) === '7') {
                    this.servername = "Europe Server";
                }
                else if (this.uid.charAt(0) === '8') {
                    this.servername = "Asia Server";
                }
                else if (this.uid.charAt(0) === '9') {
                    this.servername = "HK, MC & TW Server";
                }
            }
        }
    }

    Vue.createApp(index).mount('#index');
})
