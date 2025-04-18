var express = require('express');
var router = express.Router();

var db = require('../pgConnect.js');

/* 게시글 목록 페이지 */
router.get('/main', function(req,res,next){
    const boardList = [
        { id: 1, title: '제목이야', regDate: '2025-04-14' },
        { id: 2, title: '안녕 바다야', regDate: '2025-04-16' },
        { id: 3, title: '봄날의 햇살', regDate: '2025-04-17' },
    ];
    
    const currPage = parseInt(req.query.page) || 1;

    const viewModel = {
        boards: boardList,
        isPrevPage: true,
        isNextPage: true,
        pageList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        currPage: currPage,
    };

    res.render('./board/main', viewModel);
});

/* 게시글 등록 페이지 (get) */
router.get('/post', function(req,res,next){
    
    res.render('./board/post');
});

/* 게시글 등록 페이지 (post) */
router.post('/post', async function(req,res,next){
    const {title, content} = req.body;

    const insertQuery = 'INSERT INTO BOARD (title, content) VALUES ($1, $2)';
    try{
        await db.query(insertQuery, [title, content]);
        res.redirect('/board/main'); // 저장 후 목록 페이지로 리다이렉트
    } catch (err) {
        console.error('게시글 저장 중 오류:', err);
        res.status(500).send('서버 오류');
    }
});

module.exports = router;