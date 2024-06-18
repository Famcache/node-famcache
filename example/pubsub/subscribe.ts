import Famcache from '../../src';

const client = new Famcache({
    host: 'localhost',
    port: 3577,
});

client
    .connect()
    .then(() => {
        client.messaging.subscribe('topic1', (data) => {
            console.log('Received', data);
        });
    })
    .catch((e) => {
        console.log('Failed to connect');
    });

