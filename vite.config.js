import vue from '@vitejs/plugin-vue'

export default ({ command }) => ({
    plugins: [
        vue()
    ],
    base: command === 'serve' ? '' : '/',
    publicDir: 'fake_dir_so_nothing_gets_copied',
    // build: {
    //     manifest: true,
    //     outDir: 'public/assets',
    //     rollupOptions: {
    //         input: 'resources/js/app.js',
    //     },
    // },
});