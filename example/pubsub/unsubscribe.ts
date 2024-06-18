import Famcache from '../../src';

const client = new Famcache({
    host: 'localhost',
    port: 3577,
});

client
    .connect()
    .then(() => {
        client.messaging.unsubscribe('topic1');
    })
    .catch((e) => {
        console.log('Failed to connect');
    });

