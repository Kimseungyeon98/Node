const {Client} = require('pg');
const client = new Client({
    user: "postgres",
    host: "127.0.0.1",
    database: "nodedb",
    password: "postgres",
    port: 5432,
});
client.connect();
/*client.query("SELECT NOW()", (err, res) => {
    console.log(err, res);
    client.end();
});*/
/*const query = {
    text: "INSERT INTO member VALUES ($1, $2)",
    values: [1, "홍길동"],
};*/
const query = {
    text: "SELECT * FROM member",
  };
/* const query = {
    text: "DELETE FROM member WHERE id = $1",
    values: [1],
}; */
client
    .query(query)
    .then((res) => {
        console.log(res.rows[0]);
        client.end();
    })
    .catch((e) => console.error(e.stack));