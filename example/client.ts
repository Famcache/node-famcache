import Famcache from '../src';

const cache = new Famcache({
  host: 'localhost',
  port: 3577,
});

cache
  .connect()
  .then(() => {
    console.log('Connected!');

    cache.set('key', '10', 3000)
      .then(() => {
        return cache.get('key');
      })
      .then((data) => {
        console.log('Received', data);
      });
  })
  .catch((e) => {
    console.log('Failed to connect');
  });
