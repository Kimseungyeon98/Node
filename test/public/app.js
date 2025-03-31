const http = require("http"),
fs = require("fs");
ejs = require("ejs");

const { Client } = require("pg");

const server = http.createServer();

const template = fs.readFileSync(`${__dirname}/index.ejs`, "utf-8");

// postgresql에 연결하기 위한 설명을 작성한다.
const client = new Client({
user: "postgres",
host: "127.0.0.1",
database: "nodedb",
password: "postgres",
port: 5432,
});

client.connect();

// 다음에는 SELECT 쿼리를 사용하여 데이터베이스에서 데이터를 검색하도록 한다.
// 또한 조회할 데이터를 넣는 posts배열도 준비해두자.
let posts = [];

client.query("SELECT * FROM member", (err, res) => {
posts = res.rows;
client.end();
});

// 마지막으로 서버 접속 후, ejs의 render을 실행해, ejs에 건네주는 데이터에 방금 전의 posts배열을 건네주면 된다.
server.on("request", function (req, res) {
const data = ejs.render(template, {
  posts: posts,
});
res.writeHead(200, { "Content-Type": "text/html" });
res.write(data);
res.end();
});

server.listen(8080, "127.0.0.1");
console.log("server listening...");