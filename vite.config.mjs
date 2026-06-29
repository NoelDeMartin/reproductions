import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: { entry: 'src/index.js' },
    rolldownOptions: {
      output: [
        {
          format: 'cjs',
          preserveModules: true,
          entryFileNames: '[name].js',
        },
      ],
    },
  },
})
