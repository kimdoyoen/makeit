var router = require("express").Router();
const { Community, CommunityReple } = require("../model/CoPost.js");
const { Counter } = require("../model/Counter.js");
const setUpload = require("../model/multer/upload.js");
const setDelete = require("../model/multer/delete.js");

router.post("/length", (req, res) => {
  let filter = {};
  filter.category = req.body.category;
  Community.find(filter).exec((err, postInfo) => {
    let idx = postInfo.length;
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, idx });
  });
});

router.post("/", (req, res) => {
  let filter = {};
  filter.category = req.body.category;
  let tempSkip = req.body.pageSkip ? parseInt(req.body.pageSkip) : 0;
  let limit = 10;
  let skip = tempSkip === 0 ? 0 : tempSkip * 10;
  let sort = {}; //{정렬기준이 되는 필드 이름: 1 or -1} 1이면 오름차순, -1이면 내림차순
  if (req.body.sortPost === "최신순") {
    sort.createdAt = -1;
  } else {
    sort.likeNum = -1;
  }
  Community.find(filter)
    .populate("auther")  //조인이랑 비슷함 (다른 테이블의 아이디가 같은 객체를 불러옴) 근데 조인처럼 db에서 합치는게 아니라 자바스크립트 단에서 합쳐줌
    .sort(sort)
    .skip(skip) //출력을 시작할 부분 skip만큼 건너뛰고 skip+1부터 출력
    .limit(limit) //출력할 오브젝트의 개수 제한
    .exec((err, postInfo) => { //쿼리를 promise로 만들기 위해,,
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
  sort.createdAt = -1;
  CommunityReple.find(filter).exec((err, totalReple) => {
    if (err) return res.status(400).json({ success: false, err });
    CommunityReple.find(filter)
      .populate("auther")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec((err, repleInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          repleInfo,
          repleSize: repleInfo.length,
          totalSize: totalReple.length,
        });
      });
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

router.post("/image/delete", (req, res) => {
  setDelete("makeit/community", req.body.key);

  return res.json({
    success: true,
  });
});

router.post("/postSubmit", (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: "counter" }, (err, counter) => {
    if (err) return res.status(400).json({ success: false, err });
    temp.postNum = counter.coPosts;
    const communityPost = new Community(temp);

    communityPost.save((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      counter.updateOne({ $inc: { coPosts: 1 } }, (err) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true,
        });
      });
    });
  });
});

router.post("/repleSubmit", (req, res) => {
  let temp = req.body;
  Community.findOneAndUpdate(
    { postNum: temp.postNum },
    { $inc: { repleNum: 1 } }
  ).exec((err, post) => {
    if (err) return res.status(400).json({ success: false, err });
    const communityReple = new CommunityReple(temp);
    communityReple.save((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).send({ success: true });
    });
  });
});

module.exports = router;
