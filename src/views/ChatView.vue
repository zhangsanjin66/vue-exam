<template>
  <div class="main">
    <div class="aside">
      <div class="calendar">
        <el-calendar v-model="value"> </el-calendar>
      </div>
      <div class="task">
        <div class="flex-between">
          <div>
            <span> Today Task </span>
            <span>(</span>
            <span>3</span>
            <span>)</span>
          </div>
          <div>
            <span @click="drawer" class="el-icon-plus"></span>
          </div>
        </div>
        <div class="work">
          <div class="item flex-between">
            <div>
              <el-checkbox></el-checkbox>
              <span class="task"> Working on Asla project</span>
            </div>

            <span class="time">08:00-10:00 AM</span>
          </div>
          <div class="item flex-between">
            <div>
              <el-checkbox> </el-checkbox>
              <span class="task"> Team Meeting</span>
            </div>
            <span class="time">11:00-12:00 AM</span>
          </div>
          <div class="item flex-between">
            <div>
              <el-checkbox> </el-checkbox>
              <span class="task"> Doing Research</span>
            </div>
            <span class="time">13:00-16:00 PM</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="notify">
        <div class="flex-between">
          <h1>Notification</h1>
          <h1>View all</h1>
        </div>

        <div class="assign">
          <div>
            <img class="icon-modify" src="../assets/icon-modify.png" alt="" />
          </div>
          <div class="nav">
            <div>Emily just sent you task to assign</div>
            <div>
              <div class="date">18 Aug 2020 - 10.00 AM</div>
              <div>
                <el-button class="btn" type="warning" size="medium"
                  >Assign Now</el-button
                >
              </div>
            </div>
          </div>
          <div class="big-circle">
            <div class="small-circle"></div>
          </div>
        </div>
      </div>
      <div class="chat">
        <div class="head-portrait flex-between">
          <div class="flex-between">
            <div class="team-chat">Team Chat</div>
            <div class="frequency flex-between">
              <img class="icon-head" src="../assets/icon_avatar.png" alt="" />
              <img class="icon-head" src="../assets/icon_avatar.png" alt="" />
              <img class="icon-head" src="../assets/icon_avatar.png" alt="" />
              <div class="">+17</div>
            </div>
          </div>
          <div class="add-friends flex-between">
            <img
              class="icon-add mr-5"
              src="../assets/icon-addfriends.png"
              alt=""
            />
            <span>Invlte people</span>
          </div>
        </div>
        <div class="container" ref="scoll">
          <div v-for="(item, index) in textArr" :key="index">
            <div
              class="flex-center timer"
              v-if="(new Date() - new Date(item.date)) / 1000 <= 60"
            >
              刚刚
            </div>
            <div
              class="flex-center timer"
              v-else-if="
                1 <= (new Date() - new Date(item.date)) / 1000 / 60 < 10
              "
            >
              {{
                Math.round((new Date() - new Date(item.date)) / 1000 / 60)
              }}分钟之前
            </div>
            <div
              class="flex-center timer"
              v-else-if="
                10 <= (new Date() - new Date(item.date)) / 1000 / 60 < 60
              "
            >
              {{
                Math.ceil(
                  Math.round((new Date() - new Date(item.date)) / 1000 / 60) /
                    10
                )
              }}0分钟之前
            </div>
            <div
              class="flex-center timer"
              v-else-if="
                1 <= (new Date() - new Date(item.date)) / 1000 / 60 / 60 < 24
              "
            >
              {{
                Math.round((new Date() - new Date(item.date)) / 1000 / 60 / 60)
              }}小时之前
            </div>
            <div v-if="item.avatarName != '玄策'" class="my-char">
              <span class="name flex-center">
                {{ item.avatarName | name }}</span
              >
              <div class="first-chat" v-if="item.msg">{{ item.msg }}</div>
            </div>
            <div v-else class="selfarr">
              <div class="first-chat" v-if="item.msg">{{ item.msg }}</div>
              <span class="myname flex-center">
                {{ item.avatarName | name }}</span
              >
            </div>
          </div>
        </div>
        <div class="send-but">
          <el-input
            class="send"
            v-model="obj.msg"
            placeholder="请输入内容"
            prefix-icon="el-icon-microphone"
          >
            <template slot="append">
              <span @click="sendSocketMsg">
                <i class="el-icon-s-promotion">发送</i>
              </span>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/api/api";
export default {
  data() {
    return {
      direction: "rtl",
      value: new Date(),
      obj: {
        name: "玄策",
        msg: "",
        id: "",
      },
      textArr: [],
    };
  },
  updated() {
    let msg = this.$refs.scoll;
    msg.scrollTop = msg.scrollHeight;
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      //   console.log("socket connected...");
      this.$socket.emit("addUser", {
        userId: this.obj.id,
        avatarName: this.obj.name,
      });
    },
    userCount(message) {
      console.log(message);
    },
    receiveMsg: function (message) {
      console.log("服务的返回的信息", message);
      if (message.msg == null) {
        return;
      } else {
        this.textArr.push(message);
      }
    },
    disconnect: function () {
      //断开
      console.log("disconnect!");
      this.$socket.emit("removeUser", {
        userId: this.obj.id,
        avatarName: this.obj.name,
      });
    },
  },
  created() {
    this.keyupSubmit();
    this.getuserinfo();
  },
  filters: {
    name(val) {
      return val.substring(0, 1);
    },
  },
  methods: {
    async getuserinfo() {
      let res = await getUserInfoApi();
      console.log(res);
      this.obj.id = res.data.data.id;
    },
    keyupSubmit() {
      document.onkeydown = () => {
        let _key = window.event.keyCode;
        //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.sendSocketMsg();
        }
      };
    },
    sendSocketMsg() {
      //向服务端发送消息
      this.$socket.emit("sendMsg", {
        userId: this.obj.id,
        type: 1,
        avatarName: this.obj.name,
        msg: this.obj.msg,
      });
      //接收服务端相对应的webdata数据
      this.obj.msg = null;
    },
    drawer() {
      this.$router.push({
        name: "createdtask",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
body,
h1 {
  margin: 0;
}

body {
  height: 100vh;
}

.main {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.main .aside {
  min-width: 350px;
  display: grid;
  grid-template-rows: 1.5fr 1fr;
  height: 100%;
  margin: 0 20px;
  & .calendar {
    ::v-deep .el-calendar-table td {
      border: none;
    }
    ::v-deep .el-calendar-day {
      text-align: center;
      height: 40px;
    }
    ::v-deep .el-calendar__header {
      padding: 40px 20px 15px 20px;
    }
  }
}

.main > .container {
  display: grid;
  grid-template-rows: 220px auto;
  padding-bottom: 20px;
  & .assign {
    display: grid;
    grid-template-columns: 70px auto 105px;
    background-color: #58419c;
    border-radius: 20px;
    margin: 20px 0;
    & .icon-modify {
      padding: 10px;
      background-color: #7d66b4;
      margin: 20px;
    }
    & .btn {
      border-radius: 10px;
    }
    & .nav {
      min-width: 300px;
      padding: 20px;
      color: #fafafc;
      & .date {
        padding: 20px 0;
        font-size: 12px;
        color: #a899d4;
      }
    }
    & .big-circle {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      border: 1px solid #b2a4dc;
      margin: 50px 20px 0px 0px;
      & .small-circle {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        border: 1px solid #b2a4dc;
        margin: 28px 20px 0px 10px;
      }
    }
  }
}

.main .footer {
  height: 40px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
}

.chat {
  height: 100%;
  overflow: hidden;
  position: relative;
  & .head-portrait {
    padding: 4px 0;
    & .team-chat {
      padding: 0 10px;
      font-weight: bold;
    }
    & .add-friends {
      background-color: #58419c;
      padding: 10px;
      color: #ffffff;
    }
  }
  & .send-but {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}

.chat .container {
  background-color: #fafafc;
  position: absolute;
  left: 0;
  bottom: 0;
  height: calc(100% - 40px - 42px - 40px);
  overflow-y: scroll;
  width: 100%;
  padding-bottom: 40px;
  & .timer {
    color: #ccc;
  }
  & .my-char {
    display: flex;
    align-items: center;
  }
  & .selfarr {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 5px 0;
  }
  & .first-chat {
    max-width: 250px;
    word-wrap: break-word;
    white-space: pre-wrap;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
  }
  & .name {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #7c68b0;
    color: #ffffff;
    margin-left: 10px;
  }
  & .myname {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #7c68b0;
    color: #ffffff;
    margin-right: 10px;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.task {
  min-width: 300px;
  & .work {
    padding: 20px;
    & .item {
      padding: 10px 0;
      & .time {
        font-size: 10px;
        color: #4f6bfa;
      }
    }
  }
}
</style>