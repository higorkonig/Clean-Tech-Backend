import mysql from 'mysql';

module.exports = (
  mysql.createConnection({
      host: '192.95.29.226',
      user: 'shumpxyz_cleantech',
      password: 'cleantech2020',
      port: 3306,
      database: 'shumpxyz_cleantech'
  })
)