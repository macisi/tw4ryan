import mount from 'koa-mount';
import Grant from 'grant-koa';
import config from '../../config';

const grant = new Grant(config);

export default mount(grant);