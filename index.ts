import {app} from './app'

const port = 34587;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});