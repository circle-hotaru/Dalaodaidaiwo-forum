const mongoose = require('./models/db')

// 标签模型定义
const TagSchema = mongoose.Schema({
    // 标签名字
    name: { type: String, trim: true },
    // 图标
    icon: { type: String, default: d_tag },
})

// 通过connection和schema创建model

let TagModel = mongoose.model('Tag', TagSchema);



let tagDoc = new TagModel({
    name: 'vue',
})


// 将文档插入到数据库，save方法返回一个Promise对象。
secureDoc.save().then((doc) => {
    console.log(doc)
})

adminDoc.save().then((doc) => {
    console.log(doc);
})