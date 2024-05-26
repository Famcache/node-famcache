import Famcache from 'famcache';

const cache = new Famcache({
  host: 'localhost',
  port: 3577,
});

cache
  .connect()
  .then(() => {
    console.log('Connected!');
  })
  .catch((e) => {
    console.log('Failed to connect');
  });
