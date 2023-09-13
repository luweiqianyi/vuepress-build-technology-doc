module.exports = {
    title: '且与疾风随行的技术小窝',
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
                    { text: 'seta', link: '/distribute/seta/01-distribute-transaction-mode.html' },
                    { text: 'redis', link: '/redis/01-pub-sub.html' },
                ]
            },
            { text: 'vuepress', link: '/vuepress-tutorial/00-website-init.html' },
        ]
    }
}