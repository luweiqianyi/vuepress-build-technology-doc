module.exports = {
    title: '且随疾风前行的技术小窝',
    description: 'Just playing around',
    themeConfig: {
        siderbar: 'auto',
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
                text: 'os',
                items: [
                    { text: 'Docker', link: '/docker/00-docker-image-build.html' },
                    { text: 'Linux', link: '/linux/00-linux-directory.html' },
                ]
            },
            {
                text: 'cryptography',
                items: [
                    { text: 'TLS', link: '/tls/00-make-cert.html' },
                ]
            },
            {
                text: 'distribute',
                items: [
                    { text: 'minio', link: '/distribute/minio/01-minIO.html' },
                    { text: 'seata', link: '/distribute/seata/01-distribute-transaction-mode.html' },
                    { text: 'metrics', link: '/distribute/metrics/01-prometheus-grafana.html' },
                    { text: 'redis', link: '/distribute/redis/01-pub-sub.html' },
                ]
            },
            { text: 'vuepress', link: '/vuepress-tutorial/00-website-init.html' },
            { text: 'algorithm', link: '/algorithm/00-intrduction.html' },
            { text: 'kubernetes', link: '/kubernetes/01-minikube.html' },
            {
                text: 'linux-cpp-tutorial',
                items: [
                    { text: 'dev-env', link: '/linux/cpp/01-dev-env-config.html' },
                    { text: 'cmake', link: '/linux/cmake/01-quick-start.html' },
                ]
            },
            {
                text: 'uni-app',
                items: [
                    { text: 'electron', link: '/electron/01-init.html' },
                ]
            },
        ]
    }
}