import dayjs from 'dayjs'

const banner = [
  '/**',
  ` * build: ${process.env.BUILD_TIME}`,
  ` * version: ${process.env.BUILD_VERSION}`,
  ` * author: ${process.env.AUTHOR}`,
  ' */'
].join('\n')

console.log(banner)

console.debug = process.env.BUILD_ENV !== 'production' ? function() {
  console.log.apply(null, [`[${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}]`].concat(Array.from(arguments)))
} : function() {}
