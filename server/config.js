module.exports = {
    // token 密钥
    webSecret: 'dalaodaidaiwo-web',
    adminSecret: 'dalaodaidaiwo-admin',

    // mongodb 数据库配置
    dbInfo: {
        name: 'ddw_forum',
        get connectStr() { return `mongodb://localhost:27017/${this.name}` }
    },

    domain: 'localhost',
    port: 3009,
    // 完整域名
    get url() { return `http://${this.domain}:${this.port}` },
    get s_url() { return `https://${this.domain}:${this.port}` },
    // 默认头像
    get d_avatar() { return `${this.url}/d_avatar.png` },
    // 标签默认图标
    get d_tag() { return `${this.url}/d_tag.png` }
}