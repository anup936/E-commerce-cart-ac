import { app } from './api/app';

const port = 3000;

app.listen(port, function () {
    console.log(`server listening on port ${port}!`);
});
