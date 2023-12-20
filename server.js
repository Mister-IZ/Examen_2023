import express from 'express';
import voca from './models/voca.js';


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", async function (req, res) {
  const voclist = await voca.loadMany();
  const listid = [];
  for(let voci of voclist){
    listid.push(voci.id)
  }
  res.render('Test.ejs', { voclist });
});

app.post("/add", async function (req, res) {
  const newligne = new voca();
  newligne.word = req.body.word
  newligne.translation = req.body.translation
  await newligne.save();
  res.redirect('/vocabulary');
});

app.get("/delete/:id", async function (req, res) {
  await voca.delete({ idvoc: req.params.id });
  res.redirect('/vocabulary');
});


app.get("/vocabulary", async function (req, res) {
  const voclist = await voca.loadMany();
  res.render('Vocabulary.ejs', {voclist});
});

app.post("/answer", async function (req, res) {
  const voclist = await voca.loadMany();
  res.render('Vocabulary.ejs', {voclist});
});


app.listen(80);
