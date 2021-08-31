export const _DB_URI = process.env.NODE_ENV === 'production' ?
  `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.tvjci.mongodb.net/KuczynskyDB?retryWrites=true&w=majority`
  : 'mongodb://localhost:27017/KuczynskyDB'

