// @ts-check

const express = require('express');

const app = express();
const PORT = 4000;

const userRouter = require('./routes/users');

const postsRouter = express.Router();

// const USER = [
//   {
//     id: 'me',
//     name: '이지현',
//     email: 'lkf6214@naver.com',
//   },
//   {
//     id: 'dad',
//     name: '이용운',
//     email: 'test@naver.com',
//   },
//   {
//     id: 'mom',
//     name: '김인숙',
//     email: 'test@naver.com',
//   },
//   {
//     id: 'sister',
//     name: '이명희',
//     email: 'test@naver.com',
//   },
// ];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/users', userRouter);
// userRouter부를 땐 이 주소 /users로 가져오겠다
app.use('/posts', postsRouter);

app.use(express.static('public'));
// 프론트 파일

// 꼭 서버실행(listen) 바로 위에 잇어야함. =맨 밑에 있어야함
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message);
});
// err, req, res, next 순서 틀리면 안돼 매우 중요! 순서대로 처리해야하니까

// userRouter 모두 users.js로!!!!!!!!!!!!!!
// userRouter.get('/', (req, res) => {
//   const userLen = USER.length;
//   res.render('index', { USER, userCounts: userLen, imgName: 'potato.jpg' });
// });

// // userRouter.get('/', (req, res) => {
// //   res.write('<h1>hello, Dynamic Web page</h1>');
// //   for (let i = 0; i < USER.length; i++) {
// //     res.write(`<h2>USER id is ${USER[i].id}`);
// //     res.write(`<h2>USER name is ${USER[i].name}`);
// //   }
// //   // res.send(USER);
// // });

// userRouter.get('/:id', (req, res) => {
//   const userData = USER.find((user) => user.id === req.params.id);
//   if (userData) {
//     res.send(userData);
//   } else {
//     res.end('ID not found');
//     // userdata못 찾으면 'ID not found'내보내라
//   }
// });

// userRouter.post('/', (req, res) => {
//   if (req.query.id && req.query.name && req.query.email) {
//     // 필드가 id나 name이 아니거나, 값이 없으면 undifine이 false
//     const newUser = {
//       id: req.query.id,
//       name: req.query.name,
//       email: req.query.email,
//     };
//     USER.push(newUser);
//     // 배열이니까 push 하면 됨;
//     res.send('회원 등록 완료!!');
//   } else {
//     res.end('잘못된 쿼리입니다. Unexpected query');
//   }
// });

// //회원 정보 수정!!미들웨어 완성 put거의안쓰고 post쓰긴하지만 배우는중이니까 put 쓸 것
// userRouter.put('/:id', (req, res) => {
//   if (req.query.id && req.query.name && req.query.email) {
//     // 아이디어가 있는지 네임이 있는지 여부에 따라 처리
//     const userData = USER.find((user) => user.id === req.params.id);
//     if (userData) {
//       const arrIndex = USER.findIndex((user) => user.id === req.params.id);
//       const modifyUser = {
//         id: req.query.id,
//         name: req.query.name,
//         email: req.query.email,
//       };
//       USER[arrIndex] = modifyUser;
//       res.send('회원 수정 완료');
//     } else {
//       res.end('해당 id를 가진 회원이 없습니다.');
//     }
//   } else {
//     res.end('부적절한 쿼리입니다.');
//   }
// });

// //회원정보삭제!!
// userRouter.delete('/:id', (req, res) => {
//   const arrIndex = USER.findIndex((user) => user.id === req.params.id);
//   if (arrIndex !== -1) {
//     USER.splice(arrIndex, arrIndex + 1);
//     res.send('해당id의 정보가 삭제되었습니다..');
//   } else {
//     res.end('존재하지 않는 id입니다.');
//   }
// });

//--
// userRouter.post('/:name', (req, res) => {
//   res.send(`이름이 ${req.params.name}인 유저가 등록되었습니다.`);
// });

// postsRouter.post('/:title', (req, res) => {
//   res.end(`제목이 ${req.params.title}인 글이 등록되었습니다.`);
// });
// postsRouter.get('/', (req, res) => {
//   res.send('블로그 글 목록');
// });

// //--
// app.get('/', (req, res) => {
//   res.send('GET request');
// });
// app.post('/', (req, res) => {
//   res.send('POST request');
// });
// app.put('/', (req, res) => {
//   res.send('PUT request');
// });
// app.delete('/', (req, res) => {
//   res.send('DELETE request');
// });

// //실습
// // • Parameter 방식과 Query 방식으로 email, password, name, gender
// // 정보를 받아와서 출력하는 백엔드 코드 작성하기!

// app.get(
//   '/email/:email/password/:password/name/:name/gender/:gender',
//   (req, res) => {
//     console.log(req.params);
//     res.send(req.params);
//   }
// );

// app.get('/', (req, res) => {
//   const q = req.query;
//   if (q.email && q.password && q.name && q.gender) {
//     res.send(req.query);
//     console.log(req.query);
//   }
// });

//--
// app.get('/id/:id/name/:name/gender/:gender', (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

// app.get('/', (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });

// let time;

// app.use('/', async (req, res, next) => {
//   console.log('미들웨어 1번');

//   req.reqTime = new Date();
//   req.fileContent = await fs.promises.readFile('package.json', 'utf-8');
//   next();
// });

// app.use((req, res, next) => {
//   console.log(req.reqTime);
//   console.log(req.fileContent);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('미들웨어 3번');
//   res.send('통신종료');
// });

app.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
