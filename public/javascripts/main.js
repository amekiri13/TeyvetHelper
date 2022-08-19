
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
            },
            getCharacterData(event) {
                let server = this.servername;
                if (server === "天空岛")
                    server = 'cn_gf01';
                else if (server === "世界树")
                    server = 'cn_qd01';
                else if (server === 'America Server')
                    server = 'os_usa';
                else if (server === 'Europe Server')
                    server = 'os_euro';
                else if (server === 'Asia Server')
                    server = 'os_asia';
                else if (server === 'HK, MC & TW Server')
                    server = 'os_cht';
                axios.get(`/api/BasicInfo?uid=${this.uid}&server=${server}`)
                    .then(res => {
                        let data = res.data;
                        $("#dataSummary").empty();
                        $("#playerInfo").empty();
                        $("#character").empty();
                        if (data.message != 'OK') {
                            alert(data.message);
                            return;
                        }
                        $("#playerInfo").append(`
                        <div style="margin: 10px 0">
                            <h3 style="margin: 10px 20px 10px 0">${data.data.role.nickname}
                            <small class="text-muted">${this.servername} ${data.data.role.level}级</small>
                            </h3>
                        </div>
                        `);
                        let allChests = data.data.stats.luxurious_chest_number +
                            data.data.stats.precious_chest_number +
                            data.data.stats.exquisite_chest_number +
                            data.data.stats.common_chest_number +
                            data.data.stats.magic_chest_number;
                        $("#dataSummary").append(`
                        <h1 style="margin: 10px 0">数据总览</h1>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td><span>成就数<br/>${data.data.stats.achievement_number}</span></td>
                                    <td><span>活跃天数<br/>${data.data.stats.active_day_number}</span></td>
                                    <td><span>角色数<br/>${data.data.stats.avatar_number}</span></td>
                                    <td><span>解锁传送点<br/>${data.data.stats.way_point_number}</span></td>
                                    <td><span>风神瞳<br/>${data.data.stats.anemoculus_number}</span></td>
                                </tr>
                                <tr>
                                    <td><span>岩神瞳<br/>${data.data.stats.geoculus_number}</span></td>
                                    <td><span>雷神瞳<br/>${data.data.stats.electroculus_number}</span></td>
                                    <td><span>解锁秘境<br/>${data.data.stats.domain_number}</span></td>
                                    <td><span>深境螺旋<br/>${data.data.stats.spiral_abyss}</span></td>
                                    <td><span>华丽宝箱数<br/>${data.data.stats.luxurious_chest_number}</span></td>
                                </tr>
                                <tr>
                                    <td><span>珍贵宝箱数<br/>${data.data.stats.precious_chest_number}</span></td>
                                    <td><span>精致宝箱数<br/>${data.data.stats.exquisite_chest_number}</span></td>
                                    <td><span>普通宝箱数<br/>${data.data.stats.common_chest_number}</span></td>
                                    <td><span>奇馈宝箱数<br/>${data.data.stats.magic_chest_number}</span></td>
                                    <td><span>所有宝箱数<br/>${allChests}</span></td>
                                </tr>
                            </tbody>
                        </table>
                        `);
                        $("#character").append(`
                        <h1 style="margin: 10px 0">角色信息</h1>
                        <div class="container" id="characters"></div>
                        `);
                        let avatarNumber = data.data.avatars.length;
                        console.log(avatarNumber);
                        console.log(data);
                        let tempValue = 0;
                        for (let i=0;i<avatarNumber / 4;i++) {
                            $("#characters").append(`<div id="line${i}" class="row"></div>`);
                            for (let j=0;j < 4;j++) {
                                if (tempValue < avatarNumber.length) {
                                    $("#line" + i).prepend(`<div class="col">
                                        <img src="${data.data.avatars[tempValue].image}" style="margin: 0 auto">
                                        <p style="margin: 5px auto;">${data.data.avatars[tempValue].name}&nbsp;${data.data.avatars[tempValue].level}级&nbsp;${data.data.avatars[tempValue].actived_constellation_num}命座&nbsp;好感度${data.data.avatars[tempValue].fetter}</p>
                                    </div>`);
                                    tempValue++;
                                }
                            }
                        }
                        $("#worldExploration").prepend(`
                            <h1>世界探索度</h1>
                            <div id="data_worldExp"></div>
                        `);
                        let worldData = data.data.world_explorations;
                        for (let i=0;i<worldData.length;i++) {
                            $("#data_worldExp").append(`
                                <h2>${worldData[i].name}</h2>
                                <p>探索度：${worldData[i].exploration_percentage / 100.0}%</p>
                            `);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }

    Vue.createApp(index).mount('#index');
})
