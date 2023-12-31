module.exports = {
    title: '且随疾风前行的技术小窝',
    description: 'Just playing around',
    themeConfig: {
        siderbar: 'auto',
        // lastUpdated: 'Last Update',
        smoothScroll: true, // 页面跳转时，页面平滑滑动  
        nav: [
            { text: '主页', link: '/' },
            {
                text: 'go',
                items: [
                    { text: 'go', link: '/go/01-go-GMP.html' },
                    { text: 'go-zero', link: '/go-zero/01-quick-start.html' },
                ]
            },
            {
                text: 'cloud-tech',
                items: [
                    { text: 'Docker', link: '/docker/00-docker-image-build.html' },
                    { text: 'kubernetes', link: '/kubernetes/01-minikube.html' },
                ]
            },
            {
                text: 'distribute',
                items: [
                    { text: 'minio', link: '/distribute/minio/01-minIO.html' },
                    { text: 'seata', link: '/distribute/seata/00-seata-start.html' },
                    { text: 'metrics', link: '/distribute/metrics/01-prometheus-grafana.html' },
                    { text: 'redis', link: '/distribute/redis/01-pub-sub.html' },
                ]
            },
            {
                text: 'middleware',
                items: [
                    { text: 'mongodb', link: '/middleware/mongodb/00-mongodb-survey.html' },
                ]
            },
            { text: 'audio-video', link: '/audio-video/01-program-linux-nginx-add-rtmp.html' },
            {
                text: 'linux&cpp',
                items: [
                    { text: 'base', link: '/linux/00-linux-directory.html' },
                    { text: 'dev-env', link: '/linux/cpp/01-dev-env-config.html' },
                    { text: 'cmake', link: '/linux/cmake/01-quick-start.html' },
                    { text: 'muduo', link: '/linux/muduo/01-quick-start.html' },
                    { text: 'git', link: '/linux/git/00-git-operators.html' },
                ]
            },
            {
                text: 'uni-app',
                items: [
                    { text: 'electron', link: '/electron/01-init.html' },
                    { text: 'vue', link: '/vue/01-vue-quick-start.html' },
                    { text: 'vuepress', link: '/vuepress-tutorial/00-website-init.html' },
                    { text: 'web3', link: '/web3/00-web3-survey.html' },
                ]
            },
            {
                text: 'cryptography',
                items: [
                    { text: 'TLS', link: '/tls/00-make-cert.html' },
                ]
            },
            { text: 'algorithm', link: '/algorithm/00-intrduction.html' },
            { text: 'posts', link: '/posts/index.html' },
        ]
    }
}