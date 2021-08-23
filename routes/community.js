var router = require("express").Router();
const {
  Community,
  CommunityReple,
  CommunityRereple,
} = require("../model/CoPost.js");
const { Counter } = require("../model/Counter.js");
const { User } = require("../model/User.js");
const { Alarm } = require("../model/Alarm.js");

const setUpload = require("../module/multer/upload.js");
const setDelete = require("../module/multer/delete.js");
const setRealTime = require("../module/multer/realTime.js");
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

////////////////////////////
//          POST          //
////////////////////////////

router.post("/", (req, res) => {
  //카테고리 정렬
  let category = req.body.GNB;
  if (category.category === "전체게시판") {
    delete category.category;
  }

  //최신순&&인기순 정렬
  let sort = {};
  if (req.body.sortPost === "new") {
    sort.createdAt = -1;
  } else {
    sort.likeNum = -1;
  }

  Community.find(category)
    .populate("auther")
    .sort(sort)
    .exec((err, postInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, postInfo });
    });
});

router.post("/postDetail", (req, res) => {
  let filter = {};
  filter.postNum = req.body.postNum;
  Community.findOneAndUpdate(filter, { $inc: { views: 1 } })
    .populate("auther")
    .exec((err, postInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, postInfo });
    });
});

router.post("/postDetail/reple", (req, res) => {
  let filter = {};
  filter.postNum = req.body.postNum;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 5;
  let sort = {};
  sort.createdAt = 1;
  CommunityReple.find(filter)
    .exec()
    .then((totalReple) => {
      CommunityReple.find(filter)
        .populate("auther")
        .populate("rerepleArray")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec()
        .then((repleInfo) => {
          return res.status(200).json({
            success: true,
            repleInfo,
            repleSize: repleInfo.length,
            totalSize: totalReple.length,
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
});

router.post("/image", setUpload("makeit/community"), (req, res, next) => {
  return res.json({
    success: true,
    key: res.req.file.key,
    filePath: res.req.file.location,
    fileName: res.req.file.originalname,
  });
});

router.post("/like", (req, res) => {
  let key = req.body.likeFlag;

  if(key) { // 좋아요를 이미 누른 상태
    Community.findOneAndUpdate(
      { postNum : req.body.postNum },
      { $inc: {likeNum: -1}, $pull: {likeArray: req.body.userId} },
    )
    .exec()
    .then((response) => {
      return res.status(200).send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, err });
    })
  }
  else {
    Community.findOneAndUpdate(
      { postNum : req.body.postNum },
      { $inc: {likeNum: 1}, $push: {likeArray: req.body.userId} },
    )
    .exec()
    .then((response) => {
      if(response.uid != req.body.userId) {
        let alarmTemp = {
          uid: response.uid,
          url: req.body.postNum,
          type: "likeToPost",
          category: "community/post",
        };
        const alarm = new Alarm(alarmTemp);
        alarm.save(() => {
          return res.status(200).send({ success: true });
        })
      }
      else {
        return res.status(200).send({ success: true });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, err });
    })
  }
})


//reple

router.post("/repleSubmit", (req, res) => {
  let reple = {
    uid: req.body.uid,
    postNum: req.body.postNum,
    content: req.body.content,
  }

  User.findOne({uid: req.body.uid}).exec()
  .then((userInfo) => {
    reple.auther = userInfo._id;
    reple.realTime = moment().format("YY-MM-DD[ ]HH:mm");
    const communityReple = new CommunityReple(reple);
    communityReple.save(() => {
      Community.findOneAndUpdate({postNum: req.body.postNum}, {$inc: {repleNum : 1}})
      .exec()
      .then((response) => {
        if(response.uid != reple.uid) {
          let alarmTemp = {
            uid: response.uid,
            url: reple.postNum,
            type: "repleToPost",
            category: "community/post",
          }

          const alarm = new Alarm(alarmTemp);
          alarm.save(() => {
            return res.status(200).send({ success: true });
          });
        }
        else {
          return res.status(200).send({ success: true });
        }
      })
    })
  })
  .catch((err) => {
    console.log(err);
    return res.status(400).json({ success: false, err });
  })
});

router.post("/repleLike", (req, res) => {
  let key = req.body.likeFlag;

  if(key) { // 좋아요를 이미 누른 상태
    CommunityReple.findOneAndUpdate(
      {_id: req.body.repleId},
      { $inc: {likeNum: -1}, $pull: {likeArray: req.body.userId} },
    )
    .exec()
    .then((response) => {
      return res.status(200).send({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, err });
    })
  }
  else {
    CommunityReple.findOneAndUpdate(
      {_id: req.body.repleId},
      { $inc: {likeNum: 1}, $push: {likeArray: req.body.userId} },
    )
    .exec()
    .then((response) => {
      if(response.uid != req.body.userId) {
        let alarmTemp = {
          uid: response.uid,
          url: response.postNum,
          type: "likeToReple",
          category: "community/post",
        };
        const alarm = new Alarm(alarmTemp);
        alarm.save(() => {
          return res.status(200).send({ success: true });
        })
      }
      else {
        return res.status(200).send({ success: true });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, err });
    })
  }
})

module.exports = router;
