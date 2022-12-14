
$().ready(()=> {
    const index = {
        data() {
            return {
                'servername': isUidExist ? judgeServerFromUid(t_uid) : 'Asia Server',
                'uid': isUidExist ? t_uid : '802981415'
            }
        },
        methods:{
            judgeServer(event) {
                // console.log(this.uid);
                this.servername = judgeServerFromUid(this.uid);
            },
            getCharacterData(event) {
                getAndShowCharacterInfo(this.servername,this.uid);
            }
        }
    }

    // if (isUidExist) {
    //     console.log(transformServerName($("#servername").text()));
        // getAndShowCharacterInfo(transformServerName($("#servername").text()),t_uid);
    // }

    window.onpopstate = function (event) {
        let state = event.state;
        // console.log('location: ' + document.location);
        // console.log('state: ' + JSON.stringify(state));

        if (state == null) {
            $("#characterdata").empty();
        }
        else {
            $("#characterdata").html(state.pageData);
        }
    };

    if (isUidExist) {
        let servername = judgeServerFromUid(t_uid);
        getAndShowCharacterInfo(servername,t_uid);
    }

    Vue.createApp(index).mount('#index');
});

function judgeServerFromUid(uid) {
    if (uid.charAt(0) === '1' || uid.charAt(0) === '2') {
        return "天空岛";
    }
    else if (uid.charAt(0) === '5') {
        return "世界树";
    }
    else if (uid.charAt(0) === '6') {
        return "America Server";
    }
    else if (uid.charAt(0) === '7') {
        return "Europe Server";
    }
    else if (uid.charAt(0) === '8') {
        return "Asia Server";
    }
    else if (uid.charAt(0) === '9') {
        return "HK, MC & TW Server";
    }
    else {
        return "unknown";
    }
}

function transformServerName(server) {
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
    return server;
}

function getAndShowCharacterInfo(server,uid) {
    let servername = server;
    server = transformServerName(server);

    axios.get(`/api/BasicInfo?uid=${uid}&server=${server}`)
        .then(res => {
            let data = res.data;
            $("#dataSummary").empty();
            $("#playerInfo").empty();
            $("#character").empty();
            $("#worldExploration").empty();
            if (data.message != 'OK') {
                alert(data.message);
                return;
            }
            $("#playerInfo").append(`
                        <div style="margin: 10px 0">
                            <h3 style="margin: 10px 20px 10px 0">${data.data.role.nickname}
                            <small class="text-muted">${servername} ${data.data.role.level}级</small>
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
            $("#characters").append(`<div class="row" id="c_info"></div>`);
            for (let i=0;i<avatarNumber;i++) {
                $("#c_info").append(`<div class="col">
                                            <img src="${data.data.avatars[i].image}" style="margin: 0 auto">
                                            <p style="margin: 5px auto;">${data.data.avatars[i].name}&nbsp;${data.data.avatars[i].level}级&nbsp;${data.data.avatars[i].actived_constellation_num}命座&nbsp;好感度${data.data.avatars[i].fetter}</p>
                                        </div>`);
            }
            $("#worldExploration").prepend(`
                            <h1 style="margin: 10px 0">世界探索度</h1>
                            <div id="data_worldExp"></div>
                        `);
            let worldData = data.data.world_explorations;
            for (let i=0;i<worldData.length;i++) {
                $("#data_worldExp").append(`
                                <div class="card">
                                    <div class="card-header">${worldData[i].name}</div>
                                    <div class="card-body">
                                        <p>探索度：${worldData[i].exploration_percentage / 10.0}%</p>
                                    </div>
                                </div>
                            `);
            }

            let temp_url = window.location.href;
            let is_inclined = temp_url.charAt(temp_url.length - 1);
            console.log(is_inclined);
            if (is_inclined === '/') {
                history.pushState({uid : uid,pageData: $("characterdata").html()}, "", uid);
            }
            else {
                history.pushState({uid : uid,pageData: $("characterdata").html()}, "", "/" + uid);
            }
        })
        .catch(err => {
            console.log(err);
        })
    axios.get(`/api/DetailInfo?uid=${uid}&server=${server}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    axios.get(`/api/AbyssInfo?uid=${uid}&server=${server}&type=1`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));
}