import Famcache from '../src';

const client = new Famcache({
  host: 'localhost',
  port: 3577,
});

client
  .connect()
  .then(() => {
    console.log('Connected!');

    client.subscribe('topic1', (data) => {
      console.log('topic1 received data: ', data);
    });

    client.set('key', '10', 3000)
      .then(() => {
        return client.get('key');
      })
      .then((data) => {
        console.log('Received', data);
      });
  })
  .catch((e) => {
    console.log('Failed to connect');
  });

