var express = require('express');
var router = express.Router();

var db = require('../pgConnect.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





router.get('/member', async (req, res) => {
  let getSQL = 'select id, name from "member"';
  try {
      client = await db.getConnection();
      let result = await client.query(getSQL);
      console.log(result);
      /* test */
      res.render('member', {members: result.rows})
      /* test */
      /* return res.status(200).json({ result: 'ok', members: result.rows }); */
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database operation failed' });
  } finally {
      if (client) db.closeConnection(client); // 클라이언트를 한 번만 반환
  }
});

module.exports = router;
