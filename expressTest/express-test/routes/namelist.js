const {Router} = require("express");
const express = require("express");
const router = express.Router();

const pool = require("../db/pool");

//데이터 전체 출력 API
router.get("/", function(req, res, next){
    pool.query("SELECT * FROM namelist", function(error, result){
        if(error){
            throw error;
        }
        res.status(200).json({
            data: result.rows,
        });
    });
});

//데이터 id 검색 api
router.get("/:id", function(req,res,next){
    const id = req.params.id;
    pool.query("SELECT * FROM namelist WHERE id = $1", [id], function(
        error, result
    ){
        if(error){
            throw error;
        }
        res.status(200).json({
            data: result.rows
        });
    });
});

//데이터 등록 api
router.post("/", function(req, res, next){
    const LENGTH = 10;
    const SOURCE = "abcdefghijklmnopqrstuvwxz0123456789";
    let result = "";
    for(let i=0; i<LENGTH; i++){
        result += SOURCE[Math.floor(Math.random()*SOURCE.length)];
    }
    const {name, intro} = req.body.namelist_data;
    pool.query(
        "INSERT INTO namelist VALUES ($1, $2, $3)",
        [result, name, intro],
        function(error, results){
            if(error){
                res.status(500).json({
                    status: "500 Internal Server Error",
                    error: error,
                });
            }
            res.status(201).json({
                status: "success",
            });
        }
    );
});

//데이터 업데이트 api
router.put("/:id", function(req, res, next){
    const id = req.params.id;
    const {name, intro} = req.body.namelist_data;
    pool.query(
        "UPDATE namelist SET name = $1, intro = $2 WHERE id = $3",
        [name, intro, id],
        function(error, results) {
            if(error){
                res.status(500).json({
                    status: "500 Internal Server Error",
                    error: error,
                });
            }
            if(results.rowCount === 0){
                res.status(400).json({
                    status: "400 Bad Request",
                    message: "데이터가 존재하지 않습니다."
                });
            } else {
                res.status(200).json({
                    status: "success",
                });
            }
        }
    );
});

// 데이터 삭제 API
router.delete("/:id", function (req, res, next) {
    const id = req.params.id;
    pool.query("DELETE FROM namelist WHERE id = $1", [id], function (error, results) {
      if (error) {
        res.status(500),
          json({
            status: "500 Internal Server Error",
            error: "error",
          });
        }
        if (results.rowCount === 0) {
          res.status(400), json({
            status: "400 Bad Request",
            message: "데이터가 존재하지 않습니다."
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "데이터가 삭제되었습니다.",
          });
        }
      });
  });
  
module.exports = router;