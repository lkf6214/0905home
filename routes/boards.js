// @ts-check

const express = require('express');

const router = express.Router();

const BOARD = [
  {
    title: '제목',
    content: '내용',
  },
  {
    title: '111',
    content: '111',
  },
  {
    title: '222',
    content: '222',
  },
  {
    title: '333',
    content: '333',
  },
];

router.get('/', (req, res) => {
  const boardLen = BOARD.length;
  res.render('boards', { BOARD, boardCounts: boardLen, imgName: 'jpg' });
});

router.get('/:title', (req, res) => {
  const boardData = BOARD.find((board) => board.title === req.params.title);
  if (boardData) {
    res.send(boardData);
  } else {
    const err = new Error('ID not found.');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newBoard = {
        title: req.query.title,
        content: req.query.content,
      };
      BOARD.push(newBoard);
      res.send('글 등록 완료');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newBoard = {
        title: req.body.title,
        content: req.body.content,
      };
      BOARD.push(newBoard);
      res.redirect('/boards');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 글 수정!! 보통 post쓰지만 배우는중이니까 put 쓸 것
router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    // 타이틀이 있는지 컨텐츠가 있는지 여부에 따라 처리
    const boardData = BOARD.find((board) => board.title === req.params.title);
    if (boardData) {
      const arrIndex = BOARD.findIndex(
        (board) => board.title === req.params.title
      );
      const modifyBoard = {
        title: req.query.title,
        content: req.query.content,
      };
      BOARD[arrIndex] = modifyBoard;
      res.send('글 수정 완료');
    } else {
      const err = new Error('TITLE not found.');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('unexpected Qeury');
    err.statusCode = 404;
    throw err;
  }
});

// 글삭제!!
router.delete('/:title', (req, res) => {
  const arrIndex = BOARD.findIndex((board) => board.title === req.params.title);
  if (arrIndex !== -1) {
    BOARD.splice(arrIndex, arrIndex + 1);
    res.send('해당 title의 정보가 삭제되었습니다..');
  } else {
    const err = new Error('TITLE not found.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
